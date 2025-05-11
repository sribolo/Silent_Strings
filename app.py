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
    scope=["profile", "email"],
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

@app.route('/login')
def login():
    try:
        if not google.authorized:
            print("User not authorized. Redirecting to Google login...")
            return redirect(url_for("google.login"))
        
        resp = google.get("/plus/v1/people/me")
        print("Google Response:", resp.json())  # <-- Debugging log
        session['google_profile'] = resp.json()
        return redirect(url_for('customize'))
    except Exception as e:
        print(f"Error during login: {str(e)}")
        return "Internal Server Error", 500


@app.route('/customise')
def customise():
    """Render the avatar customisation page."""
    user_info = session.get('google_profile')

    # If the user is not logged in, render the Mission Briefing page
    if not user_info and not session.get('guest_user'):
        return render_template('mission.html')
    
    # If logged in, continue to customisation
    if user_info:
        name = user_info.get('displayName', 'Agent')
    elif session.get('guest_user'):
        name = session.get('guest_user')
    
    return render_template('customise.html', name=name)

@app.route('/guest_login', methods=['POST'])
def guest_login():
    """Log in as a guest and redirect to customisation."""
    session['guest_user'] = "Guest Agent"
    return redirect(url_for('customise'))

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
