import os
import base64
from flask import (
    Flask, g,
    render_template, request, jsonify, session,
    redirect, url_for, send_from_directory, flash
)
from flask_pymongo import PyMongo
from pymongo import MongoClient
from flask_dance.contrib.google import make_google_blueprint, google
from flask_session import Session
from flask_wtf import CSRFProtect
from flask_limiter import Limiter
from flask_limiter.util import get_remote_address
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv

# === Load Environment Variables ===
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('FLASK_SECRET_KEY') or "dev-secret-key"

# === Session Configuration ===
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
Session(app)

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
        f"script-src 'self' 'nonce-{nonce}'; "
        f"style-src  'self' 'nonce-{nonce}'; "
        "font-src   'self'; "
        "img-src    'self';"
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
    
# === MongoDB ===
app.config["MONGO_URI"] = os.getenv("MONGO_URI", "mongodb://localhost:27017/silentstrings")
mongo = PyMongo(app)
users = mongo.db.users

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
app.register_blueprint(google_bp, url_prefix="/login")

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
# ─ Sign-Up ────────────────────────────────────────────────────────────────
@app.route("/signup", methods=["GET", "POST"])
def signup():
    if request.method == "POST":
        username = request.form["username"]
        email    = request.form["email"]
        pwd      = request.form["password"]
        if users.find_one({"email": email}):
            flash("That email is already registered", "error")
            return redirect(url_for("signup"))

        pwd_hash = generate_password_hash(pwd)
        users.insert_one({
            "username": username,
            "email":     email,
            "pwd_hash":  pwd_hash
        })
        session["user"] = {"username": username, "email": email}
        flash("Account created!", "success")
        return redirect(url_for("customise"))

    return render_template("signup.html", nonce=g.nonce)


# Log-In POST
@app.route("/login", methods=["GET", "POST"])
@limiter.limit("5 per minute")
def login():
    if request.method == "POST":
        email = request.form["email"]
        pwd   = request.form["password"]
        user  = users.find_one({"email": email})
        if user and check_password_hash(user["pwd_hash"], pwd):
            session["user"] = {"username": user["username"], "email": email}
            return redirect(url_for("customise"))
        flash("Invalid email or password", "error")
    return render_template("login.html", nonce=g.nonce)



# Google OAuth Log-In
@app.route("/login/google/authorized")
def google_authorized():
    if not google.authorized:
        return redirect(url_for("google.login"))
    resp = google.get("/oauth2/v2/userinfo")
    info = resp.json()
    email = info["email"]

    user = users.find_one({"email": email})
    if not user:
        users.insert_one({
            "username": info.get("name"),
            "email":     email,
            # passwordless
            "pwd_hash":  ""
        })
    session["user"] = {"username": info.get("name"), "email": email}
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
    return redirect(url_for("index"))

# Avatar Customisation
@app.route('/customise')
def customise():
    if "agent_name" not in session:
        return redirect(url_for("login"))
    return render_template("customise.html", name=session["agent_name"])


@app.route('/dialogue')
def dialogue():
    name = session.get('user', 'Agent')
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