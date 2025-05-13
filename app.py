from flask import Flask, render_template, request, jsonify, session, redirect, url_for, send_from_directory, flash
from flask_dance.contrib.google import make_google_blueprint, google
from dotenv import load_dotenv
import os
import json

# === Load Environment Variables ===
load_dotenv()
app = Flask(__name__)
app.secret_key = os.getenv('FLASK_SECRET_KEY')

# === CONFIGURATION ===
SPRITE_PATH = "static/images/avatar_parts"

# === OAuth Configuration ===
google_blueprint = make_google_blueprint(
    client_id=os.getenv('GOOGLE_CLIENT_ID'),
    client_secret=os.getenv('GOOGLE_CLIENT_SECRET'),
    scope=["https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
        "openid"],
    redirect_to="customise"
)
app.register_blueprint(google_blueprint, url_prefix="/login")


# === ROUTES ===
@app.route('/')
def home():
    """Landing Page for Silent Strings Homepage."""
    return render_template('index.html')


@app.route('/start')
def start():
    """Load the Mission Briefing Screen."""
    return render_template('start.html')


@app.route('/login')
def login():
    """Render the Login Page."""
    return render_template('login.html')


@app.route('/login/google')
def google_login():
    """Google OAuth Login Process."""
    if not google.authorized:
        return redirect(url_for("google.login"))
    resp = google.get("/plus/v1/people/me")
    session['google_profile'] = resp.json()
    session['agent_name'] = resp.json().get('displayName', 'Agent')
    return redirect(url_for('customise'))


@app.route('/guest_login', methods=['POST'])
def guest_login():
    """Handle Guest Login and Redirect to Customisation."""
    session['guest'] = True
    session['agent_name'] = "Guest Agent"
    return redirect(url_for('customise'))


@app.route('/signup')
def signup():
    """Render the Sign Up Page."""
    return render_template('signup.html')


@app.route('/process_signup', methods=['POST'])
def process_signup():
    """Handle the Sign Up Form Submission."""
    username = request.form.get('username')
    email = request.form.get('email')
    password = request.form.get('password')

    # 🚀 Placeholder: Save to database (Future)
    session['agent_name'] = username
    session['email'] = email
    flash("Account created successfully! You are now logged in.")
    return redirect(url_for('customise'))


@app.route('/customise')
def customise():
    """Render the Avatar Customisation Page."""
    name = session.get('agent_name', 'Agent')
    return render_template('customise.html', name=name)


@app.route('/dialogue')
def dialogue():
    """Render the Dialogue Page with the Customised Avatar."""
    name = session.get('agent_name', 'Agent')
    return render_template('dialogue.html', name=name)


@app.route('/get_sprites')
def get_sprites():
    """Serve the Sprite Mappings to the Frontend."""
    data = {}
    categories = ["acc", "characters", "clothes", "eyes", "hair"]
    for category in categories:
        data[category] = {}
        folder_path = f'static/images/avatar_parts/{category}'
        if os.path.exists(folder_path):
            for filename in os.listdir(folder_path):
                if filename.endswith(".png"):
                    data[category][filename.split(".")[0]] = {"x": 0, "y": 0}
    return jsonify(data)


@app.route('/save-avatar', methods=['POST'])
def save_avatar():
    """Save the Customised Avatar to the Session."""
    data = request.get_json()
    session['agent_name'] = data['name']
    session['avatar_parts'] = data['selections']
    return jsonify(status="ok")


@app.route('/get-avatar')
def get_avatar():
    """Fetch the Saved Avatar for Dialogue Rendering."""
    if 'avatar_parts' in session:
        data = {
            "name": session.get('agent_name', 'Agent'),
            "selections": session.get('avatar_parts', {})
        }
        return jsonify(data)
    else:
        return jsonify({"error": "No avatar data found"}), 404


@app.route('/avatars/<path:filename>')
def avatar_files(filename):
    """Serve Avatar Files from the Static Directory."""
    return send_from_directory('static/images/avatar_parts', filename)


# === RUN SERVER ===
if __name__ == "__main__":
    app.run(debug=True)
