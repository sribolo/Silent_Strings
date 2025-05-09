from flask import Flask, render_template, request, jsonify, session, redirect, url_for
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
    redirect_to="customize"
)
app.register_blueprint(google_blueprint, url_prefix="/login")


# === ROUTES ===
@app.route('/')
def home():
    """Landing Page for Silent Strings Homepage."""
    return render_template('index.html')

@app.route('/login')
def login():
    """Render the mission briefing and login options."""
    if not google.authorized:
        return redirect(url_for("google.login"))
    resp = google.get("/plus/v1/people/me")
    session['google_profile'] = resp.json()
    return redirect(url_for('customise'))

@app.route('/customise')
def customize():
    """Render the avatar customization page."""
    user_info = session.get('google_profile')
    if user_info:
        name = user_info['displayName']
    else:
        name = "Agent"
    return render_template('customise.html', name=name)


@app.route('/dialogue')
def dialogue():
    """Render the dialogue page with the customized avatar."""
    return render_template('dialogue.html')


@app.route('/get_sprites')
def get_sprites():
    """Serve the sprite mappings to the frontend."""
    data = {}
    # Traverse each category
    for category in os.listdir("static/images/avatar_parts"):
        if os.path.isdir(f"static/images/avatar_parts/{category}"):
            data[category] = {}
            for sprite in os.listdir(f"static/images/avatar_parts/{category}"):
                if sprite.endswith(".json"):
                    with open(f"static/images/avatar_parts/{category}/{sprite}", 'r') as f:
                        data[category][sprite.split(".")[0]] = json.load(f)
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


# === RUN SERVER ===
if __name__ == "__main__":
    app.run(debug=True)
