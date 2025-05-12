from flask import Flask, render_template, request, jsonify, session, redirect, url_for, send_from_directory
from flask_dance.contrib.google import make_google_blueprint, google
from dotenv import load_dotenv
import os
import json

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
    return render_template('dialogue.html')

@app.route('/guest_login', methods=['POST'])
def guest_login():
    """Handle guest login, set a session and redirect to customize page."""
    session['google_profile'] = {
        'displayName': 'Guest Agent',
        'email': 'guest@silentstrings.com'
    }
    return redirect(url_for('customise'))

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/login/google')
def google_login():
    if not google.authorized:
        return redirect(url_for("google.login"))
    resp = google.get("/plus/v1/people/me")
    session['google_profile'] = resp.json()
    return redirect(url_for('customize'))

@app.route('/guest_login', methods=['POST'])
def guest_login():
    session['guest'] = True
    session['name'] = "Guest Agent"
    return redirect(url_for('customize'))



@app.route('/customise')
def customise():
    """Render the avatar customisation page."""
    user_info = session.get('google_profile')

    # If logged in, continue to customisation
    if user_info:
        name = user_info.get('displayName', 'Agent')
    else:
        name = "Agent"
    
    return render_template('customise.html', name=name)


@app.route('/dialogue')
def dialogue():
    """Render the dialogue page with the customised avatar."""
    return render_template('dialogue.html')


@app.route('/get_sprites')
def get_sprites():
    """Serve the sprite mappings to the frontend."""
    data = {}
    categories = ["acc", "characters", "clothes", "eyes", "hair", "walk"]
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
    """Save the customized avatar to the session."""
    data = request.get_json()
    session['agent_name'] = data['name']
    session['avatar_parts'] = data['selections']
    return jsonify(status="ok")


@app.route('/get-avatar')
def get_avatar():
    """Fetch the saved avatar for dialogue rendering."""
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
    return send_from_directory('static/images/avatar_parts', filename)

# === RUN SERVER ===
if __name__ == "__main__":
    app.run(debug=True)
