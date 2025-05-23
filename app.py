import os
import base64
import requests
from flask import (
    Flask, g,
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
from forms import SignupForm, LoginForm
from flask_migrate import Migrate
# === Load Environment Variables ===
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('FLASK_SECRET_KEY') or "dev-secret-key"

# === Session Configuration ===
#app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
app.config['WTF_CSRF_SSL_STRICT'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URL')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)
migrate = Migrate(app, db)
#Session(app)


class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    pwd_hash = db.Column(db.String(256), nullable=False)


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
    if not request.is_secure and os.getenv("FLASK_ENV") != "development" and not request.is_secure:
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
    redirect_to="google.authorized" 
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
    print("Session Keys:", session.keys())
    print("Session Cookie:", request.cookies.get('session'))
    print("CSRF Token (form):", form.csrf_token.data)
    print("CSRF Token (session):", session.get('_csrf_token'))

    if form.validate_on_submit():
        # reCAPTCHA check
        token = request.form.get("g-recaptcha-response")
        if not verify_recaptcha(token):
            flash("Please complete the CAPTCHA", "error")
            return render_template("signup.html", form=form, recaptcha_site_key=os.getenv("RECAPTCHA_SITE_KEY"))
        
        username = form.username.data
        email    = form.email.data
        pwd      = form.password.data

        if User.query.filter_by(email=email).first():
            flash("That email is already registered", "error")
            return redirect(url_for("signup"))

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



# Google OAuth Log-In
@app.route("/oauth/google")
def oauth_google():
    if not google.authorized:
        return redirect(url_for('google.login'))
    
    resp = google.get("/oauth2/v2/userinfo")
    info = resp.json()
    email = info["email"]
    
    user = User.query.filter_by(email=email).first()
    if not user:
        user = User(username=info.get("name"), email=email, pwd_hash="")
        db.session.add(user)
        db.session.commit()
    session["user"] = {"username": info.get("name"), "email": email}
    flash("Logged in with Google!", "success")
    return redirect(url_for("customise"))


@app.route('/guest_login', methods=['POST'])
def guest_login():
    session['guest'] = True
    session['agent_name'] = "Guest Agent"
    return redirect(url_for('customise'))

# Log-Out
@app.route("/logout")
def logout():
    session.pop("user", None)
    session.pop("guest", None)
    session.pop("agent_name", None)
    return redirect(url_for("index"))

# Avatar Customisation
@app.route('/customise')
def customise():
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
    data = {}
    for category in ["acc","characters","clothes","eyes","hair"]:
        data[category] = {}
        folder = f'static/images/avatar_parts/{category}'
        if os.path.isdir(folder):
            for fn in os.listdir(folder):
                if fn.lower().endswith('.png'):
                    key = fn.rsplit('.',1)[0]
                    data[category][key] = {"x":0,"y":0}
    return jsonify(data)

@app.route('/save-avatar', methods=['POST'])
def save_avatar():
    data = request.get_json()
    session['agent_name']   = data.get('name','Agent')
    session['avatar_parts'] = data.get('selections',{})
    return jsonify(status="ok")

@app.route('/get-avatar')
def get_avatar():
    avatar = session.get("avatar_parts")
    if avatar:
        return jsonify(name=session.get("user","Agent"), selections=avatar)
    return jsonify(error="No avatar data found"), 404


@app.route('/avatars/<path:filename>')
def avatar_files(filename):
    return send_from_directory('static/images/avatar_parts', filename)

# === RUN SERVER ===
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)