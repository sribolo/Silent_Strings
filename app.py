import os
import base64
import requests
import pyotp
import qrcode
import io
from flask import (
    Flask, g, json,
    render_template, request, jsonify, session,
    redirect, url_for, send_from_directory, flash
)
from flask_dance.contrib.google import make_google_blueprint, google
from flask_session import Session
from flask_wtf import CSRFProtect
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv
from flask_sqlalchemy import SQLAlchemy
from forms import SignupForm, LoginForm, ForgotPasswordForm, ResetPasswordForm, ResetProgressForm, MFAVerificationForm, MFASetupForm, MFARecoveryForm
from flask_migrate import Migrate
from itsdangerous import URLSafeTimedSerializer
from flask_mail import Mail, Message
from functools import wraps
from sqlalchemy.dialects.postgresql import JSON
from flask_login import LoginManager, UserMixin, current_user, login_required, login_user, logout_user
try:
    from sqlalchemy import PickleType
except ImportError:
    PickleType = None
import json
import secrets


# === Load Environment Variables ===
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('FLASK_SECRET_KEY') or "dev-secret-key"
s = URLSafeTimedSerializer(app.secret_key)
# === Session Configuration ===
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['WTF_CSRF_SSL_STRICT'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.getenv('MAIL_USERNAME')  
app.config['MAIL_PASSWORD'] = os.getenv('MAIL_PASSWORD')  
db = SQLAlchemy(app)
migrate = Migrate(app, db)
mail = Mail(app)
Session(app)


class User(db.Model, UserMixin):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    pwd_hash = db.Column(db.String(256), nullable=False)
    avatar_character = db.Column(db.String(120), nullable=True)
    avatar_hair = db.Column(db.JSON, nullable=True)  # Store full hair data
    avatar_clothes = db.Column(db.JSON, nullable=True)  # Store full clothes data
    avatar_acc = db.Column(db.JSON, nullable=True)  # Store full accessories data
    avatar_face = db.Column(db.JSON, nullable=True)  # Store full face data
    achievements = db.Column(JSON if JSON else PickleType, default=list)
    unlocks = db.Column(JSON if JSON else PickleType, default=list)
    is_admin = db.Column(db.Boolean, default=False)
    # MFA and Privacy fields
    otp_secret = db.Column(db.String(64), nullable=True)
    mfa_enabled = db.Column(db.Boolean, default=False)
    recovery_codes = db.Column(JSON, nullable=True)
    profile_public = db.Column(db.Boolean, default=True)

# === CSRF Protection ===
csrf = CSRFProtect(app)

# === Rate Limiter ===
limiter = Limiter( app=app, key_func=get_remote_address, storage_uri=os.getenv("RATELIMIT_STORAGE_URL"))

# === Login Manager Setup ===
login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

# === Generate a CSP Nonce Per Request ===
@app.before_request
def generate_csp_nonce():
    g.csp_nonce = base64.b64encode(os.urandom(16)).decode('ascii')

# === Make the nonce available to Jinja templates ===
@app.context_processor
def inject_csp_nonce():
    return dict(csp_nonce=g.get('csp_nonce'))

# === Add Security Headers (including CSP) ===
@app.after_request
def add_security_headers(response):
    nonce = g.get('csp_nonce')
    csp = (
        "default-src 'self'; "
        f"script-src 'self' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/ 'nonce-{nonce}'; "
        f"style-src  'self' 'nonce-{nonce}' 'unsafe-inline' https://fonts.googleapis.com; "
        "font-src   'self' https://fonts.gstatic.com; "
        "img-src    'self' data: https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/; "
        "frame-src  https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/; "
        "connect-src 'self' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/; "
    )
    response.headers['Content-Security-Policy'] = csp
    response.headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains'
    response.headers['X-Frame-Options'] = 'DENY'
    response.headers['X-Content-Type-Options'] = 'nosniff'
    response.headers['Referrer-Policy'] = 'no-referrer'
    response.headers['Permissions-Policy'] = 'geolocation=(self), microphone=()'
    return response

# === Force HTTPS on Render ===
@app.before_request
def enforce_https():
    if not request.is_secure and os.getenv("FLASK_ENV") != "development":
        return redirect(request.url.replace("http://", "https://", 1))
    

# === CONFIGURATION ===
SPRITE_PATH = "static/images/avatar_parts"

# === OAuth Configuration ===
google_bp = make_google_blueprint(
    client_id=os.getenv('GOOGLE_CLIENT_ID'),
    client_secret=os.getenv('GOOGLE_CLIENT_SECRET'),
    scope=[
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        "openid"
    ],
    redirect_to="customise"
)
app.register_blueprint(google_bp, url_prefix="/login/google")

#=== reCAPTCHA helper ===
def verify_recaptcha(token):
    secret = os.getenv("RECAPTCHA_SECRET_KEY")
    if not token or not secret:
        return False
    resp = requests.post(
        "https://www.google.com/recaptcha/api/siteverify",
        data={ "secret": secret, "response": token }
    )
    return resp.json().get("success", False)

# === ROUTES ===
@app.route('/', methods=['GET','HEAD'])
def home():
    if request.method == 'HEAD':
        return '', 200
    return render_template('index.html')

@app.route('/start')
def start():
    return render_template('start.html')

# Sign-Up POST
from forms import SignupForm, LoginForm

@app.route("/signup", methods=["GET", "POST"])
def signup():
    form = SignupForm()
    if form.validate_on_submit():
        token = request.form.get("g-recaptcha-response")
        if not verify_recaptcha(token):
            flash("Please complete the CAPTCHA", "error")
            return render_template("signup.html", form=form, recaptcha_site_key=os.getenv("RECAPTCHA_SITE_KEY"))
        username = form.username.data
        email    = form.email.data
        pwd      = form.password.data

        if User.query.filter_by(username=username).first():
            flash("That username is already taken. Please choose another.", "error")
            return render_template("signup.html", form=form, recaptcha_site_key=os.getenv("RECAPTCHA_SITE_KEY"))
        
        if User.query.filter_by(email=email).first():
            flash("That email is already registered. Please log in.", "error")
            return render_template("signup.html", form=form, recaptcha_site_key=os.getenv("RECAPTCHA_SITE_KEY"))

        pwd_hash = generate_password_hash(pwd)
        user = User(username=username, email=email, pwd_hash=pwd_hash)
        db.session.add(user)
        db.session.commit()
        login_user(user)
        flash("Account created!", "success")
        return redirect(url_for("customise"))

    return render_template("signup.html", form=form, recaptcha_site_key=os.getenv("RECAPTCHA_SITE_KEY"))
 

@app.route("/login", methods=["GET", "POST"])
@limiter.limit("5 per minute")
def login():
    form = LoginForm()
    if form.validate_on_submit():
        # reCAPTCHA check
        token = request.form.get("g-recaptcha-response")
        if not verify_recaptcha(token):
            flash("Please complete the CAPTCHA", "error")
            return render_template("login.html", form=form, recaptcha_site_key=os.getenv("RECAPTCHA_SITE_KEY"))
        email = form.email.data
        pwd   = form.password.data
        user  = User.query.filter_by(email=email).first()

        if user and check_password_hash(user.pwd_hash, pwd):
            # Check if MFA is enabled
            if user.mfa_enabled:
                # Store user info temporarily and redirect to MFA verification
                session['pending_mfa_user'] = {"username": user.username, "email": email}
                return redirect(url_for("verify_mfa_login"))
            else:
                # No MFA, proceed with normal login
                login_user(user)
                return redirect(url_for("customise"))
        flash("Invalid email or password", "error")
    return render_template("login.html", form=form, recaptcha_site_key=os.getenv("RECAPTCHA_SITE_KEY"))

@app.route("/verify-mfa-login", methods=["GET", "POST"])
def verify_mfa_login():
    if 'pending_mfa_user' not in session:
        return redirect(url_for("login"))
    
    form = MFAVerificationForm()
    if form.validate_on_submit():
        otp_code = form.otp_code.data
        email = session['pending_mfa_user']['email']
        user = User.query.filter_by(email=email).first()
        
        if user and user.mfa_enabled:
            # Verify the OTP code
            totp = pyotp.TOTP(user.otp_secret)
            if totp.verify(otp_code):
                # MFA verified, complete login
                user_data = session.pop('pending_mfa_user', None)
                user = User.query.filter_by(email=user_data['email']).first()
                if user:
                    login_user(user)
                    session['mfa_verified'] = True
                    return redirect(url_for("customise"))
                else:
                    flash("Could not complete login.", "error")
                    return redirect(url_for("login"))
            else:
                flash("Invalid OTP code", "error")
        else:
            flash("MFA verification failed", "error")
            session.pop('pending_mfa_user', None)
            return redirect(url_for("login"))
    
    return render_template("verify_mfa_login.html", form=form)

@app.route('/guest_login', methods=['POST'])
def guest_login():
    session.clear()
    session['guest'] = True
    session['agent_name'] = "Guest Agent"
    return redirect(url_for('customise'))

# Log-Out
@app.route("/logout")
def logout():
    """Logs out the user"""
    logout_user()
    session.clear()
    flash("You have been logged out.", "success")
    return redirect(url_for("home"))

# Avatar Customisation
@app.route('/customise')
def customise():
    if google.authorized:
        resp = google.get("/oauth2/v2/userinfo")
        info = resp.json()
        email = info["email"]
        user = User.query.filter_by(email=email).first()
        if not user:
            user = User(username=info.get("name"), email=email, pwd_hash="")
            db.session.add(user)
            db.session.commit()
        login_user(user)
        name = info.get("name")

    if current_user.is_authenticated:
        name = current_user.username
    elif "agent_name" in session:
        name = session["agent_name"]
    else:
        return redirect(url_for("login"))
    return render_template("customise.html", name=name)



@app.route('/dialogue/<location>')
def dialogue(location):
    if "user" not in session and "agent_name" not in session:
        return redirect(url_for("login"))
    
    name = session["user"]["username"] if "user" in session else session.get("agent_name", "Agent")
    
    # Map locations to their display names and contexts
    location_info = {
        'bank': {'name': 'Quantum Bank', 'context': 'financial_system'},
        'school': {'name': 'Riverside Academy', 'context': 'education_network'},  
        'cafe': {'name': 'BitBean Coffee Shop', 'context': 'cafe_network'},
        'transport': {'name': 'Metro Authority', 'context': 'transit_system'},
        'company': {'name': 'TechCorp Industries', 'context': 'corporate_network'},
        'hospital': {'name': 'Central Medical', 'context': 'healthcare_system'},
        'hq': {'name': 'SECTOR-9 HQ', 'context': 'headquarters'},
        'government': {'name': 'City Hall', 'context': 'government_network'},
        'news': {'name': 'Daily Herald', 'context': 'media_network'},
        'global': {'name': 'Global Network', 'context': 'worldwide_system'}
    }
    
    current_location = location_info.get(location, {'name': location.title(), 'context': 'unknown'})
    
    return render_template('dialogue.html', 
                         name=name, 
                         location=location,
                         location_name=current_location['name'],
                         location_context=current_location['context'])

@app.route('/investigation/<location>')
def investigation(location):
    if "user" not in session and "agent_name" not in session:
        return redirect(url_for("login"))
    name = session["user"]["username"] if "user" in session else session.get("agent_name", "Agent")
    location_info = {
        'bank': {'name': 'Quantum Bank', 'context': 'financial_system'},
        'school': {'name': 'Riverside Academy', 'context': 'education_network'},  
        'cafe': {'name': 'BitBean Coffee Shop', 'context': 'cafe_network'},
        'transport': {'name': 'Metro Authority', 'context': 'transit_system'},
        'company': {'name': 'TechCorp Industries', 'context': 'corporate_network'},
        'hospital': {'name': 'Central Medical', 'context': 'healthcare_system'},
        'hq': {'name': 'SECTOR-9 HQ', 'context': 'headquarters'},
        'government': {'name': 'City Hall', 'context': 'government_network'},
        'news': {'name': 'Daily Herald', 'context': 'media_network'},
        'global': {'name': 'Global Network', 'context': 'worldwide_system'}
    }
    current_location = location_info.get(location, {'name': location.title(), 'context': 'unknown'})
    dialogue_map = {
        'hq': 'level1',
        'news': 'level2',
        'bank': 'level3',
        'company': 'level4',
        'government': 'level5',
        'school': 'level6',
        'cafe': 'level7',
        'hospital': 'level8',
        'transport': 'level9',
        'global': 'level10'
    }
    dialogue_key = dialogue_map.get(location, 'level1')
    # Load meta info from level_data.json
    with open('levels/level_data.json') as f:
        level_data = json.load(f)
    meta = level_data['levels'].get(dialogue_key, {})
    objectives = meta.get('objectives', [])
    tools = meta.get('tools_available', [])
    return render_template('investigation.html', 
                         name=name, 
                         location=location,
                         location_name=current_location['name'],
                         location_context=current_location['context'],
                         dialogue_key=dialogue_key,
                         objectives=objectives,
                         tools=tools,
                         meta=meta
    )

@app.route('/get_sprites')
def get_sprites():
    base_path = os.path.join(app.root_path, 'static', 'images', 'avatar_parts')
    data = {}
    categories = ['characters', 'clothes', 'hair', 'face', 'acc']

    def get_default_parts():
        defaults = {}
        for category in categories:
            category_path = os.path.join(base_path, category)
            if not os.path.isdir(category_path):
                continue
                
            if category == 'characters':
                # Get first character as default
                for root, dirs, files in os.walk(category_path):
                    for fn in files:
                        if fn.lower().endswith('.png'):
                            defaults[category] = os.path.splitext(fn)[0]
                            break
                    break
            else:
                # For other categories, get first subcategory and its first item
                for root, dirs, files in os.walk(category_path):
                    rel_root = os.path.relpath(root, category_path)
                    subcat_name = 'default' if rel_root == '.' else rel_root.replace(os.sep, '_')
                    for fn in files:
                        if fn.lower().endswith('.png'):
                            defaults[category] = {
                                'subcategory': subcat_name,
                                'name': os.path.splitext(fn)[0]
                            }
                            break
                    break
        return defaults

    # Store defaults in app context for reuse
    if not hasattr(app, 'default_avatar_parts'):
        app.default_avatar_parts = get_default_parts()

    for category in categories:
        category_path = os.path.join(base_path, category)
        if not os.path.isdir(category_path):
            data[category] = {}
            continue
        # Characters: flat list
        if category == 'characters':
            data[category] = []
            for root, dirs, files in os.walk(category_path):
                for fn in files:
                    if fn.lower().endswith('.png'):
                        rel_path = os.path.relpath(os.path.join(root, fn), base_path)
                        img_path = f"/static/images/avatar_parts/{rel_path.replace(os.sep, '/')}"
                        data[category].append({
                            "name": os.path.splitext(fn)[0],
                            "img": img_path
                        })
            continue
        # Other categories: group by subfolder
        subcategories = {}
        for root, dirs, files in os.walk(category_path):
            rel_root = os.path.relpath(root, category_path)

            if rel_root == '.':
                subcat_name = 'default'
            else:
                subcat_name = rel_root.replace(os.sep, '_')
            for fn in files:
                if fn.lower().endswith('.png'):
                    rel_path = os.path.relpath(os.path.join(root, fn), base_path)
                    img_path = f"/static/images/avatar_parts/{rel_path.replace(os.sep, '/')}"
                    if subcat_name not in subcategories:
                        subcategories[subcat_name] = []
                    subcategories[subcat_name].append({
                        "name": os.path.splitext(fn)[0],
                        "img": img_path
                    })
        data[category] = subcategories
    return jsonify(data)

@app.route('/save-avatar', methods=['POST'])
@csrf.exempt
def save_avatar():
    try:
        data = request.get_json(force=True)
        name = data.get('name')
        selections = data.get('selections')
        
        # Validate required selections
        required_parts = ['characters', 'clothes', 'hair', 'face', 'acc']
        missing_parts = [part for part in required_parts if not selections.get(part)]
        
        if missing_parts:
            return jsonify({
                "error": "Please select all avatar parts before continuing",
                "missing_parts": missing_parts
            }), 400

        if not name:
            return jsonify({"error": "Please enter a name"}), 400

        session['agent_name'] = name
        session['avatar_parts'] = selections

        if current_user.is_authenticated:
            user = User.query.filter_by(email=current_user.email).first()
            if user:
                char = selections.get('characters')
                user.avatar_character = char.get('name') if isinstance(char, dict) else char
                user.avatar_hair = selections.get('hair', {})
                clothes = selections.get('clothes', {})
                if isinstance(clothes, dict):
                    user.avatar_clothes = clothes
                else:
                    user.avatar_clothes = {}
                user.avatar_acc = selections.get('acc', {})
                user.avatar_face = selections.get('face', {})
                db.session.commit()

        return jsonify(status="ok")
    except Exception as e:
        print("Exception in /save-avatar:", e)
        return jsonify({"error": str(e)}), 500

@app.route('/get-avatar')
def get_avatar():
    avatar = session.get("avatar_parts")
    if not avatar:
        return jsonify(error="No avatar data found"), 404

    if current_user.is_authenticated:
        name = current_user.username
    elif "agent_name" in session:
        name = session.get("agent_name", "Agent")
    else:
        name = "Agent"
    return jsonify(name=name, selections=avatar)


@app.route('/set_avatar', methods=['POST'])
def set_avatar():
    avatar = request.form.get('avatar_filename')
    avatars_dir = os.path.join(app.static_folder, 'avatars')
    # Validate avatar is in avatars folder for security
    if avatar and avatar in os.listdir(avatars_dir):
        session['current_avatar'] = avatar
    return redirect(url_for('profile'))


@app.route('/avatars/<path:filename>')
def avatar_files(filename):
    return send_from_directory('static/images/avatar_parts', filename)

@app.route('/forgot-password', methods=['GET', 'POST'])
def forgot_password():
    form = ForgotPasswordForm()
    if request.method == 'POST':
        email = request.form['email']
        user = User.query.filter_by(email=email).first()
        if user:
            token = s.dumps(email, salt='reset-password')
            reset_url = url_for('reset_password', token=token, _external=True)
            msg = Message(
                subject="Silent Strings Password Reset",
                recipients=[email],
                body=f"Hi! Click the link to reset your password:\n{reset_url}\n\nIf you didn't request this, ignore this email.",
                sender=app.config['MAIL_USERNAME']
            )
            mail.send(msg)
            flash("Check your email for a password reset link.", "info")
        else:
            flash("No account with that email.", "error")
        return redirect(url_for('forgot_password'))
    return render_template('forgot_password.html', form=form)

@app.route('/reset-password/<token>', methods=['GET', 'POST'])
def reset_password(token):
    form = ResetPasswordForm() 
    try:
        email = s.loads(token, salt='reset-password', max_age=3600)
    except Exception:
        flash("Invalid or expired link.", "error")
        return redirect(url_for('login'))
    if form.validate_on_submit():
        user = User.query.filter_by(email=email).first()
        if user:
            user.pwd_hash = generate_password_hash(form.password.data)
            db.session.commit()
            flash("Password updated!", "success")
            return redirect(url_for('login'))
    return render_template('reset_password.html', form=form, token=token)


def flatten_avatar_parts(avatar_parts):
    """
    Only flatten character (to string), keep dicts for clothes, hair, face, acc.
    """
    fixed = {}
    for category, value in avatar_parts.items():
        if category == 'characters':
            # For character, extract 'name' if it's a dict, else just the value
            if isinstance(value, dict):
                fixed[category] = value.get('name', value)
            else:
                fixed[category] = value
        else:
            # For clothes/hair/face/acc, keep full dict
            fixed[category] = value
    return fixed

@app.route('/profile')
def profile():
    username = None
    email = None
    avatar_parts = {}
    is_guest = False
    user = None

    if current_user.is_authenticated:
        user = current_user
        username = user.username
        email = user.email
        is_guest = False

        if user:
            clothes = user.avatar_clothes if isinstance(user.avatar_clothes, dict) else {}
            avatar_parts = {
                'characters': user.avatar_character,
                'hair': user.avatar_hair,
                'clothes': clothes,
                'acc': user.avatar_acc,
                'face': user.avatar_face
            }
    elif session.get("guest"):
        username = session.get("agent_name", "Guest Agent")
        email = None
        is_guest = True
        avatar_parts = session.get("avatar_parts", {})
    else:
        return redirect(url_for('login'))

    # Flatten avatar_parts so all keys are directly accessible by the template
    avatar_parts = flatten_avatar_parts(avatar_parts)

    # Check if avatar is complete
    required_parts = ['characters', 'clothes', 'hair', 'face', 'acc']
    if not all(part in avatar_parts and avatar_parts[part] for part in required_parts):
        flash("Please complete your avatar customization first", "warning")
        return redirect(url_for('customise'))

    print("DEBUG avatar_parts for profile:", avatar_parts)

    # Check if user is admin
    is_admin = False
    if current_user.is_authenticated:
        is_admin = current_user.is_admin

    return render_template(
        "profile.html",
        username=username,
        email=email,
        is_guest=is_guest,
        avatar_parts=avatar_parts,
        is_logged_in=current_user.is_authenticated,
        is_admin=is_admin,
        user=user
    )

@app.route('/profile/<username>')
def view_profile(username):
    """View another user's profile (respecting privacy settings)"""
    if not current_user.is_authenticated and not session.get("guest"):
        return redirect(url_for('login'))
    
    # Find the user by username
    user = User.query.filter_by(username=username).first()
    if not user:
        flash("User not found", "error")
        return redirect(url_for('game'))
    
    # Check privacy settings
    if not user.profile_public:
        flash("This profile is private", "error")
        return redirect(url_for('game'))
    
    # Check if viewing own profile
    is_own_profile = current_user.is_authenticated and current_user.email == user.email
    
    # Prepare avatar parts
    clothes = user.avatar_clothes if isinstance(user.avatar_clothes, dict) else {}
    avatar_parts = {
        'characters': user.avatar_character,
        'hair': user.avatar_hair,
        'clothes': clothes,
        'acc': user.avatar_acc,
        'face': user.avatar_face
    }
    avatar_parts = flatten_avatar_parts(avatar_parts)
    
    return render_template(
        "profile.html",
        username=user.username,
        email=user.email if is_own_profile else None,
        is_guest=False,
        avatar_parts=avatar_parts,
        is_logged_in=current_user.is_authenticated,
        is_admin=user.is_admin,
        user=user,
        is_own_profile=is_own_profile,
        viewing_other_profile=not is_own_profile
    )

@app.route('/settings', methods=['GET', 'POST'])
def settings():
    if not current_user.is_authenticated:
        return redirect(url_for("login"))
    
    email = current_user.email
    user = User.query.filter_by(email=email).first()
    
    if not user:
        return redirect(url_for("login"))
    
    sfx_enabled = session.get('sfx_enabled', True)
    music_enabled = session.get('music_enabled', True)
    
    # Generate QR code for MFA setup if not already enabled
    qr_code_data = None
    if not user.mfa_enabled:
        # Generate a new secret for setup
        secret = pyotp.random_base32()
        totp = pyotp.TOTP(secret)
        provisioning_uri = totp.provisioning_uri(
            name=user.email,
            issuer_name="Silent Strings"
        )
        
        # Generate QR code
        qr = qrcode.QRCode(version=1, box_size=10, border=5)
        qr.add_data(provisioning_uri)
        qr.make(fit=True)
        img = qr.make_image(fill_color="black", back_color="white")
        
        # Convert to base64
        buffer = io.BytesIO()
        img.save(buffer, format='PNG')
        qr_code_data = base64.b64encode(buffer.getvalue()).decode()
        
        # Store secret temporarily in session
        session['temp_otp_secret'] = secret
    
    return render_template('settings.html', 
                         sfx_enabled=sfx_enabled, 
                         music_enabled=music_enabled,
                         user=user,
                         qr_code_data=qr_code_data)

@app.route('/save-settings', methods=['POST'])
@csrf.exempt
def save_settings():
    if not current_user.is_authenticated:
        return jsonify({"error": "Not authenticated"}), 401
    
    data = request.get_json()
    session['sfx_enabled'] = data.get('sfx_enabled', True)
    session['music_enabled'] = data.get('music_enabled', True)
    
    # Update privacy settings
    email = current_user.email
    user = User.query.filter_by(email=email).first()
    if user:
        user.profile_public = data.get('profile_public', True)
        db.session.commit()
    
    return jsonify(status="ok")

@app.route('/setup-mfa', methods=['POST'])
@csrf.exempt
def setup_mfa():
    if not current_user.is_authenticated:
        return jsonify({"error": "Not authenticated"}), 401
    
    data = request.get_json()
    otp_code = data.get('otp_code')
    
    if not otp_code or len(otp_code) != 6:
        return jsonify({"error": "Invalid OTP code"}), 400
    
    # Get the temporary secret from session
    temp_secret = session.get('temp_otp_secret')
    if not temp_secret:
        return jsonify({"error": "No MFA setup in progress"}), 400
    
    # Verify the OTP code
    totp = pyotp.TOTP(temp_secret)
    if not totp.verify(otp_code):
        return jsonify({"error": "Invalid OTP code"}), 400
    
    # Save the secret and enable MFA
    email = current_user.email
    user = User.query.filter_by(email=email).first()
    if user:
        user.otp_secret = temp_secret
        user.mfa_enabled = True
        
        # Generate and store hashed recovery codes
        recovery_codes_plain = [secrets.token_hex(8) for _ in range(10)]
        user.recovery_codes = [generate_password_hash(code) for code in recovery_codes_plain]
        
        db.session.commit()
        
        # Clear temporary secret
        session.pop('temp_otp_secret', None)
        
        return jsonify({
            "success": "MFA enabled successfully",
            "recovery_codes": recovery_codes_plain
        })
    
    return jsonify({"error": "User not found"}), 404

@app.route("/verify-mfa-recovery", methods=["GET", "POST"])
def verify_mfa_recovery():
    if 'pending_mfa_user' not in session:
        return redirect(url_for("login"))

    form = MFARecoveryForm()
    if form.validate_on_submit():
        email = session['pending_mfa_user']['email']
        user = User.query.filter_by(email=email).first()
        recovery_code = form.recovery_code.data

        if user and user.mfa_enabled and user.recovery_codes:
            for i, hashed_code in enumerate(user.recovery_codes):
                if check_password_hash(hashed_code, recovery_code):
                    # Valid code, log user in and disable MFA
                    login_user(user)
                    user.mfa_enabled = False
                    
                    # Remove the used code
                    user.recovery_codes.pop(i)
                    
                    db.session.commit()
                    
                    session.pop('pending_mfa_user', None)
                    flash("Account recovered and MFA disabled. Please re-enable it for security.", "success")
                    return redirect(url_for("customise"))

            flash("Invalid recovery code", "error")
        else:
            flash("Recovery failed. Please contact support.", "error")
            return redirect(url_for("login"))

    return render_template("verify_mfa_recovery.html", form=form)

@app.route('/disable-mfa', methods=['POST'])
@csrf.exempt
def disable_mfa():
    if not current_user.is_authenticated:
        return jsonify({"error": "Not authenticated"}), 401
    
    data = request.get_json()
    otp_code = data.get('otp_code')
    
    if not otp_code or len(otp_code) != 6:
        return jsonify({"error": "Invalid OTP code"}), 400
    
    email = current_user.email
    user = User.query.filter_by(email=email).first()
    
    if not user or not user.mfa_enabled:
        return jsonify({"error": "MFA not enabled"}), 400
    
    # Verify the OTP code
    totp = pyotp.TOTP(user.otp_secret)
    if not totp.verify(otp_code):
        return jsonify({"error": "Invalid OTP code"}), 400
    
    # Disable MFA
    user.mfa_enabled = False
    user.otp_secret = None
    db.session.commit()
    
    return jsonify({"success": "MFA disabled successfully"})

@app.route('/verify-mfa', methods=['POST'])
@csrf.exempt
def verify_mfa():
    if not current_user.is_authenticated:
        return jsonify({"error": "Not authenticated"}), 401
    
    data = request.get_json()
    otp_code = data.get('otp_code')
    
    if not otp_code or len(otp_code) != 6:
        return jsonify({"error": "Invalid OTP code"}), 400
    
    email = current_user.email
    user = User.query.filter_by(email=email).first()
    
    if not user or not user.mfa_enabled:
        return jsonify({"error": "MFA not enabled"}), 400
    
    # Verify the OTP code
    totp = pyotp.TOTP(user.otp_secret)
    if not totp.verify(otp_code):
        return jsonify({"error": "Invalid OTP code"}), 400
    
    # Mark MFA as verified for this session
    session['mfa_verified'] = True
    
    return jsonify({"success": "MFA verified successfully"})

@app.route('/level/<level_name>')
def load_level(level_name):
    level_path = os.path.join('levels', f'{level_name}.json')
    if not os.path.exists(level_path):
        return jsonify({"error": "Level not found"}), 404
    with open(level_path, 'r') as f:
        data = json.load(f)
    return jsonify(data)

@app.route('/game')
def game():
    username = None
    avatar_parts = {}
    is_guest = False

    if current_user.is_authenticated:
        username = current_user.username
        email = current_user.email
        is_guest = False
        user = User.query.filter_by(email=email).first()
        if user:
            avatar_parts = {
                'characters': user.avatar_character,
                'hair': user.avatar_hair,
                'clothes': user.avatar_clothes,
                'acc': user.avatar_acc,
                'face': user.avatar_face
            }
    elif session.get("guest"):
        username = session.get("agent_name", "Guest Agent")
        is_guest = True
        avatar_parts = session.get("avatar_parts", {})
    else:
        return redirect(url_for('login'))

    avatar_parts = flatten_avatar_parts(avatar_parts)

    # Check if avatar is complete
    required_parts = ['characters', 'clothes', 'hair', 'face', 'acc']
    if not all(part in avatar_parts and avatar_parts[part] for part in required_parts):
        flash("Please complete your avatar customization first", "warning")
        return redirect(url_for('customise'))
    
    # Special check for clothes - must have at least one subcategory
    if not isinstance(avatar_parts.get('clothes'), dict) or not any(avatar_parts.get('clothes', {}).values()):
        flash("Please select at least one clothing item", "warning")
        return redirect(url_for('customise'))

    print("DEBUG avatar_parts for game:", avatar_parts)
    print("DEBUG avatar_parts for game (flattened):", avatar_parts)

    # Get completed missions for progression tracking
    completed_missions = session.get('completed_missions', [])
    required_locations = ['hq', 'news', 'bank', 'cafe', 'transport', 'school', 'government', 'hospital', 'company']
    global_unlocked = all(loc in completed_missions for loc in required_locations)

    return render_template('game.html', 
                         avatar_parts=avatar_parts, 
                         is_guest=is_guest, 
                         username=username,
                         completed_missions=completed_missions,
                         global_unlocked=global_unlocked)

# Example mission data (expand as needed)
MISSIONS = {
    "hq": {
        "title": "Breach at Base",
        "target": "SECTOR-9 HQ",
        "objectives": [
            "Identify the initial breach point",
            "Analyze suspicious login attempts", 
            "Trace the attacker's IP address",
            "Recover deleted system logs",
            "Secure the compromised accounts"
        ],
        "npc_dialogue_key": "level1",
        "tools_available": [
            "Network Scanner",
            "Log Analyzer", 
            "Password Cracker",
            "File Recovery Tool"
        ],
        "evidence_locations": [
            "Server Room",
            "Security Office",
            "Network Hub", 
            "Admin Workstation"
        ],
        "clues": {
            "required": [
                "Suspicious login timestamp",
                "Deleted log file",
                "Compromised admin account"
            ],
            "optional": [
                "USB drive in trash",
                "Sticky note with password",
                "Security camera footage"
            ]
        },
        "success_criteria": {
            "time_bonus": 300,
            "evidence_threshold": 3,
            "required_objectives": 4
        },
        "timeLimit": 1800
    },
    "news": {
        "title": "Operation Deadlink",
        "target": "Daily Herald",
        "objectives": [
            "Identify website defacement source",
            "Analyze injected JavaScript",
            "Trace phishing campaign",
            "Patch exploited vulnerability"
        ],
        "npc_dialogue_key": "level2",
        "tools_available": [
            "JS Analyzer",
            "Email Scanner"
        ],
        "evidence_locations": [
            "Web Server",
            "Editorial Desk",
            "Intern's Computer"
        ],
        "clues": {
            "required": [
                "XSS payload in ticker",
                "Phishing email",
                "Extension log"
            ],
            "optional": [
                "Unused login credentials",
                "Defaced homepage backup"
            ]
        },
        "success_criteria": {
            "evidence_threshold": 3,
            "required_objectives": 3
        },
        "timeLimit": 1800
    },
    "bank": {
        "title": "PhishNet",
        "target": "Quantum Bank",
        "objectives": [
            "Identify Patient Zero",
            "Find the ransomware note and sample",
            "Collect evidence of intrusion",
            "Trace the attack's origin",
            "Restore banking services"
        ],
        "npc_dialogue_key": "level3",
        "tools_available": [
            "Email Analyzer",
            "Log Analyzer",
            "File Recovery"
        ],
        "evidence_locations": [
            "Staff Workstation",
            "IT Office",
            "Shared Drive"
        ],
        "clues": {
            "required": [
                "Ransomware sample",
                "Phishing email",
                "Network log"
            ],
            "optional": [
                "Sticky note: HR password",
                "Staff email forwards"
            ]
        },
        "success_criteria": {
            "evidence_threshold": 3,
            "required_objectives": 4
        },
        "timeLimit": 1800
    },
    "cafe": {
        "title": "Crypto Café Heist", 
        "target": "BitBean Coffee Shop",
        "objectives": [
            "Investigate stolen cryptocurrency wallets",
            "Check compromised point-of-sale system",
            "Trace the crypto mining malware",
            "Recover customer payment data"
        ],
        "npc_dialogue_key": "level4",
        "tools_available": [
            "Blockchain Analyzer",
            "Malware Scanner", 
            "Payment Forensics"
        ],
        "evidence_locations": [
            "Register Terminal",
            "Customer WiFi Router",
            "Manager's Office",
            "Back Office Server"
        ],
        "clues": {
            "required": [
                "Crypto wallet private keys",
                "Skimmer device",
                "Mining software logs"
            ],
            "optional": [
                "Customer complaint forms",
                "Security camera footage"
            ]
        },
        "success_criteria": {
            "evidence_threshold": 3,
            "required_objectives": 4
        },
        "timeLimit": 1800
    },
    "transport": {
        "title": "Silent Rails: Transit Hijack",
        "target": "Metro Authority",
        "objectives": [
            "Restore hijacked train control systems",
            "Investigate passenger payment fraud", 
            "Secure the scheduling database",
            "Trace signal system tampering"
        ],
        "npc_dialogue_key": "level5",
        "tools_available": [
            "SCADA Analyzer",
            "Payment Fraud Detector",
            "Signal Tracker"
        ],
        "evidence_locations": [
            "Central Control Room",
            "Ticket Office", 
            "Signal Box",
            "Maintenance Depot"
        ],
        "clues": {
            "required": [
                "Manipulated train schedules",
                "Cloned payment cards",
                "Signal override codes"
            ],
            "optional": [
                "CCTV footage gaps",
                "Maintenance log alterations"
            ]
        },
        "success_criteria": {
            "evidence_threshold": 3,
            "required_objectives": 4
        },
        "timeLimit": 1800
    },
    "school": {
        "title": "School Network Breach",
        "target": "Riverside Academy", 
        "objectives": [
            "Secure compromised student portal",
            "Investigate grade tampering",
            "Trace unauthorized admin access",
            "Restore network integrity"
        ],
        "npc_dialogue_key": "level6",
        "tools_available": [
            "Portal Scanner",
            "Grade Audit Tool",
            "Access Logger"
        ],
        "evidence_locations": [
            "Computer Lab",
            "Principal's Office",
            "IT Closet"
        ],
        "clues": {
            "required": [
                "Modified grade records",
                "Unauthorized login attempts", 
                "Suspicious network traffic"
            ],
            "optional": [
                "Student USB device",
                "Temp admin password"
            ]
        },
        "success_criteria": {
            "evidence_threshold": 3,
            "required_objectives": 4
        },
        "timeLimit": 1800
    },
    "government": {
        "title": "Trojan Trap",
        "target": "City Hall",
        "objectives": [
            "Find persistent malware",
            "Analyze unauthorized scheduled tasks",
            "Recover deleted database records",
            "Trace admin privilege escalation"
        ],
        "npc_dialogue_key": "level7",
        "tools_available": [
            "Malware Sandbox",
            "File Recovery",
            "Log Analyzer"
        ],
        "evidence_locations": [
            "System Scheduler",
            "Database",
            "Admin PC"
        ],
        "clues": {
            "required": [
                "Backdoor binary",
                "Task scheduler log",
                "Database restore point"
            ],
            "optional": [
                "Old Flash Player popup",
                "Unusual firewall rule"
            ]
        },
        "success_criteria": {
            "evidence_threshold": 3,
            "required_objectives": 3
        },
        "timeLimit": 1800
    },
    "hospital": {
        "title": "Code Blue: Hospital Ransomware",
        "target": "Central Medical",
        "objectives": [
            "Restore patient database access",
            "Identify ransomware entry point",
            "Secure medical equipment network",
            "Decrypt critical patient files"
        ],
        "npc_dialogue_key": "level8",
        "tools_available": [
            "Ransomware Decryptor",
            "Network Isolator",
            "Medical Device Scanner"
        ],
        "evidence_locations": [
            "Patient Database Server",
            "Nursing Station",
            "Medical Equipment Network"
        ],
        "clues": {
            "required": [
                "Ransomware signature",
                "Phishing email to staff",
                "Encrypted patient files"
            ],
            "optional": [
                "Backup system logs",
                "USB device at reception"
            ]
        },
        "success_criteria": {
            "evidence_threshold": 3,
            "required_objectives": 4
        },
        "timeLimit": 1800
    },
    "company": {
        "title": "Shadow Repo",
        "target": "TechCorp Industries",
        "objectives": [
            "Detect code injection in repo",
            "Audit CI/CD pipeline",
            "Identify compromised developer account",
            "Revert malicious commits"
        ],
        "npc_dialogue_key": "level9",
        "tools_available": [
            "Code Diff Tool",
            "Pipeline Monitor"
        ],
        "evidence_locations": [
            "Code Repository",
            "Build Server",
            "Dev's Laptop"
        ],
        "clues": {
            "required": [
                "Compromised repo commit",
                "Pipeline warning logs",
                "Credential reuse"
            ],
            "optional": [
                "Unapproved SSH key",
                "Suspicious merge history"
            ]
        },
        "success_criteria": {
            "evidence_threshold": 3,
            "required_objectives": 3
        },
        "timeLimit": 1800
    },
    "global": {
        "title": "Final String",
        "target": "Global Network",
        "objectives": [
            "Disarm Silent Strings protocol",
            "Trace global worm propagation",
            "Restore critical systems",
            "Identify Ghostline's last move"
        ],
        "npc_dialogue_key": "level10",
        "tools_available": [
            "Worm Deactivator",
            "Code Tracer"
        ],
        "evidence_locations": [
            "World Network Map",
            "Director's Office"
        ],
        "clues": {
            "required": [
                "Worm payload",
                "Ghostline's message",
                "Attack map"
            ],
            "optional": [
                "Encrypted kill switch code"
            ]
        },
        "success_criteria": {
            "evidence_threshold": 3,
            "required_objectives": 3
        },
        "timeLimit": 1800
    }
}


from flask import request, jsonify

@app.route('/mission/<location>', methods=['GET', 'POST'])
def mission(location):
    mission_data = MISSIONS.get(location)
    if not mission_data:
        return render_template('mission.html', error="Mission not found.", location=location)
    
    # Check if global mission is locked
    if location == 'global':
        required_locations = ['hq', 'news', 'bank', 'cafe', 'transport', 'school', 'government', 'hospital', 'company']
        completed_missions = session.get('completed_missions', [])
        
        if not all(loc in completed_missions for loc in required_locations):
            return render_template('mission.html', 
                                 error="Access Denied: Complete all previous missions to unlock the Final String.", 
                                 location=location)
    
    progress_key = f'progress_{location}'
    if request.method == 'POST':
        completed = request.json.get('completed', [])
        session[progress_key] = completed
        session.modified = True
        
        # Check if mission is completed 
        total_objectives = len(mission_data.get('objectives', []))
        if len(completed) == total_objectives:
            completed_missions = session.get('completed_missions', [])
            if location not in completed_missions:
                completed_missions.append(location)
                session['completed_missions'] = completed_missions
                session.modified = True
        
        return jsonify({"status": "ok"})
    
    completed_objectives = session.get(progress_key, [])
    return render_template(
        'mission.html',
        mission=mission_data,
        location=location,
        completed_objectives=completed_objectives
    )

def login_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.is_authenticated:
            return redirect(url_for("login"))
        return f(*args, **kwargs)
    return decorated_function

@app.route('/tools')
@login_required
def tools():
    return render_template('tools.html')

@app.route('/api/achievements', methods=['GET', 'POST'])
@login_required
def api_achievements():
    # It's possible that a user is in session but not in the database
    # or that current_user is not correctly populated.
    if not current_user.is_authenticated:
        return jsonify({"error": "Not authenticated or user data missing"}), 401
        
    user = User.query.filter_by(email=current_user.email).first()

    if not user:
        return jsonify({"error": "User not found"}), 404

    if request.method == 'GET':
        return jsonify({
            "achievements": user.achievements or [],
            "unlocks": user.unlocks or []
        })
    elif request.method == 'POST':
        data = request.get_json()
        user.achievements = data.get('achievements', [])
        user.unlocks = data.get('unlocks', [])
        db.session.commit()
        return jsonify({"status": "ok"})

def admin_required(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        if not current_user.is_authenticated:
            flash("Please log in to access this page.", "error")
            return redirect(url_for('login'))
        
        if not current_user.is_admin:
            flash("Admin access required.", "error")
            return redirect(url_for('home'))
        return f(*args, **kwargs)
    return decorated_function

@app.route('/admin')
@admin_required
def admin_dashboard():
    # Get statistics
    total_users = User.query.count()
    total_admins = User.query.filter_by(is_admin=True).count()
    guest_sessions = len([s for s in session.keys() if 'guest' in str(s)])
    
    # Recent users (last 10)
    recent_users = User.query.order_by(User.id.desc()).limit(10).all()
    form = ResetProgressForm()
    return render_template('admin/dashboard.html', 
                         total_users=total_users,
                         total_admins=total_admins,
                         guest_sessions=guest_sessions,
                         recent_users=recent_users,
                         form=form)

@app.route('/admin/users')
@admin_required
def admin_users():
    page = request.args.get('page', 1, type=int)
    users = User.query.paginate(page=page, per_page=20, error_out=False)
    return render_template('admin/users.html', users=users)

@app.route('/admin/users/<int:user_id>')
@admin_required
def admin_user_detail(user_id):
    user = User.query.get_or_404(user_id)
    return render_template('admin/user_detail.html', user=user)

@app.route('/admin/users/<int:user_id>/toggle_admin', methods=['POST'])
@admin_required
def admin_toggle_user_admin(user_id):
    user = User.query.get_or_404(user_id)
    user.is_admin = not user.is_admin
    db.session.commit()
    flash(f"{'Granted' if user.is_admin else 'Revoked'} admin access for {user.username}", "success")
    return redirect(url_for('admin_user_detail', user_id=user_id))

@app.route('/admin/users/<int:user_id>/delete', methods=['POST'])
@admin_required
def admin_delete_user(user_id):
    user = User.query.get_or_404(user_id)
    if user.is_admin:
        flash("Cannot delete admin users", "error")
        return redirect(url_for('admin_user_detail', user_id=user_id))
    
    username = user.username
    db.session.delete(user)
    db.session.commit()
    flash(f"Deleted user {username}", "success")
    return redirect(url_for('admin_users'))

@app.route('/admin/api/stats')
@admin_required
def admin_api_stats():
    """API endpoint for admin dashboard statistics"""
    total_users = User.query.count()
    total_admins = User.query.filter_by(is_admin=True).count()
    
    # Calculate achievement statistics
    users_with_achievements = User.query.filter(User.achievements.isnot(None)).all()
    total_achievements = sum(len(user.achievements or []) for user in users_with_achievements)
    avg_achievements = total_achievements / total_users if total_users > 0 else 0
    
    return jsonify({
        'total_users': total_users,
        'total_admins': total_admins,
        'total_achievements': total_achievements,
        'avg_achievements': round(avg_achievements, 2),
        'guest_sessions': len([s for s in session.keys() if 'guest' in str(s)])
    })

@app.route('/admin/reset_progress', methods=['POST'])
@admin_required
def admin_reset_progress():
    """Reset mission progress for testing"""
    session.pop('completed_missions', None)
    for key in list(session.keys()):
        if key.startswith('progress_'):
            session.pop(key, None)
    session.modified = True
    flash("Mission progress reset successfully", "success")
    return redirect(url_for('game'))

# === RUN SERVER ===
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)