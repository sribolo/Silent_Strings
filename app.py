import os
import base64
import requests
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
from forms import SignupForm, LoginForm, ForgotPasswordForm, ResetPasswordForm
from flask_migrate import Migrate
from itsdangerous import URLSafeTimedSerializer
from flask_mail import Mail, Message


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


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    pwd_hash = db.Column(db.String(256), nullable=False)
    avatar_character = db.Column(db.String(120), nullable=True)
    avatar_hair = db.Column(db.String(120), nullable=True)
    avatar_clothes = db.Column(db.String(120), nullable=True)
    avatar_acc = db.Column(db.String(120), nullable=True)
    avatar_eyes = db.Column(db.String(120), nullable=True)

# === CSRF Protection ===
csrf = CSRFProtect(app)

# === Rate Limiter ===
limiter = Limiter( app=app, key_func=get_remote_address, storage_uri=os.getenv("RATELIMIT_STORAGE_URL"))

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
        f"style-src  'self' 'nonce-{nonce}' 'unsafe-inline'; "
        "font-src   'self'; "
        "img-src    'self' https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/; "
        "frame-src  https://www.google.com/recaptcha/ https://www.gstatic.com/recaptcha/; "
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
    ]
    #redirect_to="google.authorized" 
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
        session["user"] = {"username": username, "email": email}
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
            session["user"] = {"username": user.username, "email": email}
            return redirect(url_for("customise"))
        flash("Invalid email or password", "error")
    return render_template("login.html", form=form, recaptcha_site_key=os.getenv("RECAPTCHA_SITE_KEY"))



@app.route('/guest_login', methods=['POST'])
def guest_login():
    session.clear()
    session['guest'] = True
    session['agent_name'] = "Guest Agent"
    return redirect(url_for('customise'))

# Log-Out
@app.route("/logout")
def logout():
    session.pop("user", None)
    session.pop("guest", None)
    session.pop("agent_name", None)
    return redirect(url_for("index.html"))

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
        session["user"] = {"username": info.get("name"), "email": email}
        name = info.get("name")

    if "user" in session:
        name = session["user"]["username"]
    elif "agent_name" in session:
        name = session["agent_name"]
    else:
        return redirect(url_for("login"))
    return render_template("customise.html", name=name)



@app.route('/dialogue')
def dialogue():
    name = session["user"]["username"] if "user" in session else session.get("agent_name", "Agent")
    return render_template('dialogue.html', name=name)

@app.route('/get_sprites')
def get_sprites():
    base_path = os.path.join(app.root_path, 'static', 'images', 'avatar_parts')
    data = {}
    categories = ['characters', 'clothes', 'hair', 'eyes', 'acc']

    for category in categories:
        category_path = os.path.join(base_path, category)
        data[category] = []
        if os.path.isdir(category_path):
            for root, dirs, files in os.walk(category_path):
                for fn in files:
                    if fn.lower().endswith('.png'):
                        rel_path = os.path.relpath(os.path.join(root, fn), base_path)
                        data[category].append({
                            "name": os.path.splitext(fn)[0],
                            "img": f"/static/images/avatar_parts/{rel_path.replace(os.sep, '/')}"
                        })
    return jsonify(data)

@app.route('/save-avatar', methods=['POST'])
@csrf.exempt
def save_avatar():
    try:
        data = request.get_json(force=True)
        name = data.get('name')
        selections = data.get('selections')
        if not name or not selections or 'characters' not in selections:
            return jsonify({"error": "Missing avatar data"}), 400

        session['agent_name'] = name
        session['avatar_parts'] = selections
        print("Avatar saved to session:", session['avatar_parts'])

        if "user" in session:
            user = User.query.filter_by(email=session["user"]["email"]).first()
            if user:
                user.avatar_character = selections.get('characters')
                user.avatar_hair      = selections.get('hair')
                user.avatar_clothes   = selections.get('clothes')
                user.avatar_acc       = selections.get('acc')
                user.avatar_eyes      = selections.get('eyes')
                # Add any additional avatar parts here
                db.session.commit()
                print("Avatar saved to database for user:", user.email)

        return jsonify(status="ok")
    except Exception as e:
        print("Exception in /save-avatar:", e)
        return jsonify({"error": str(e)}), 500

@app.route('/get-avatar')
def get_avatar():
    avatar = session.get("avatar_parts")
    if avatar:
        return jsonify(name=session.get("user","Agent"), selections=avatar)
    return jsonify(error="No avatar data found"), 404

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
    form = ResetPasswordForm()  # <-- Make sure this exists and is imported!
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


@app.route('/profile')
def profile():
    username = None
    email = None
    avatar_parts = None
    is_guest = False

    # --- LOGGED-IN USER ---
    if "user" in session:
        username = session["user"]["username"]
        email = session["user"]["email"]
        is_guest = False

        # Fetch user's avatar parts from the database
        user = User.query.filter_by(email=email).first()
        if user:
            avatar_parts = {
                "characters": user.avatar_character,
                "hair": user.avatar_hair,
                "clothes": user.avatar_clothes,
                "acc": user.avatar_acc,
                "eyes": user.avatar_eyes,
            }
        else:
            avatar_parts = None

    # --- GUEST USER ---
    elif session.get("guest"):
        username = session.get("agent_name", "Guest Agent")
        email = None
        is_guest = True

        # Fall back to session-stored avatar, if any
        avatar_parts = session.get("avatar_parts", {})

    # --- NOT LOGGED IN OR GUEST ---
    else:
        return redirect(url_for('login'))

    # Fallback/default avatar image, if no data found
    default_avatar = "avatar1.png"

    return render_template(
        "profile.html",
        username=username,
        email=email,
        is_guest=is_guest,
        avatar_parts=avatar_parts,
        default_avatar=default_avatar,
    )


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
    avatar_img = session.get('avatar_img', 'default.png')
    return render_template('game.html', avatar_img=avatar_img)


# === RUN SERVER ===
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)