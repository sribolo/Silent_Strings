import os
import base64
import json
from flask import (
    Flask, g,
    render_template, request, jsonify, session,
    redirect, url_for, send_from_directory, flash
)
from flask_dance.contrib.google import make_google_blueprint, google
from flask_session import Session
from flask_wtf import CSRFProtect
from flask_limiter import Limiter
from werkzeug.security import generate_password_hash, check_password_hash
from dotenv import load_dotenv

# === Load Environment Variables ===
load_dotenv()

app = Flask(__name__)
app.secret_key = os.getenv('FLASK_SECRET_KEY')

# === Session Configuration ===
app.config['SESSION_TYPE'] = 'filesystem'
app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_HTTPONLY'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'Lax'
Session(app)

# === CSRF Protection ===
csrf = CSRFProtect(app)

# === Rate Limiter ===
limiter = Limiter(key_func=lambda: request.remote_addr, app=app)

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
@app.route('/')
def home():
    return render_template('index.html')

@app.route('/start')
def start():
    # Pass your nonce into any inline handlers, if you kept them:
    return render_template('start.html')

@app.route('/login')
def login():
    return render_template('login.html')

@limiter.limit("5 per minute")
@app.route('/login/google')
def google_login():
    if not google.authorized:
        return redirect(url_for("google.login"))
    resp = google.get("/plus/v1/people/me")
    profile = resp.json()
    session['google_profile'] = profile
    session['agent_name'] = profile.get('displayName', 'Agent')
    return redirect(url_for('customise'))

@app.route('/guest_login', methods=['POST'])
def guest_login():
    session['guest'] = True
    session['agent_name'] = "Guest Agent"
    return redirect(url_for('customise'))

@app.route('/signup')
def signup():
    return render_template('signup.html')

@app.route('/process_signup', methods=['POST'])
def process_signup():
    username = request.form.get('username')
    email = request.form.get('email')
    # Hash the password before storing (placeholder logic)
    password_hash = generate_password_hash(request.form.get('password'), method='sha256')
    session['agent_name'] = username
    session['email'] = email
    flash("Account created successfully! You are now logged in.")
    return redirect(url_for('customise'))

@app.route('/customise')
def customise():
    name = session.get('agent_name', 'Agent')
    return render_template('customise.html', name=name)

@app.route('/dialogue')
def dialogue():
    name = session.get('agent_name', 'Agent')
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
    if 'avatar_parts' in session:
        return jsonify({
            "name": session.get('agent_name','Agent'),
            "selections": session.get('avatar_parts',{})
        })
    return jsonify({"error":"No avatar data found"}), 404

@app.route('/avatars/<path:filename>')
def avatar_files(filename):
    return send_from_directory('static/images/avatar_parts', filename)

# === RUN SERVER ===
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=5000)
