# 🎻 Silent Strings

> A narrative-driven, browser-based cybersecurity adventure that turns learning infosec into an 8-bit mystery.

[![CI](https://img.shields.io/github/actions/workflow/status/<your-org>/Silent_Strings/ci.yml?label=build)](…)  
[![License](https://img.shields.io/github/license/<your-org>/Silent_Strings)](LICENSE)  
[Live Demo&nbsp;▶](https://silent-strings.onrender.com) &nbsp;|&nbsp; Built with **Flask & PostgreSQL** &nbsp;|&nbsp; Deployed on **Render**

---

## 📸 Screenshots

<!-- Swap in real images -->
<p align="center">
  <img src="docs/ss_avatar_builder.png" width="45%" alt="Avatar builder" />
  <img src="docs/ss_mission_terminal.gif" width="45%" alt="Mission puzzle" />
</p>

---

## 📚 Table of Contents
1. [Key Features](#-key-features)  
2. [Tech Stack](#-tech-stack)  
3. [Architecture](#-architecture)  
4. [Local Setup](#-local-setup)  
5. [One-Click Deploy](#-one-click-deploy-to-render)  
6. [Project Structure](#-project-structure)  
7. [Security Posture](#-security-posture)  
8. [Roadmap](#-roadmap)  
9. [Contributing](#-contributing)  
10. [License](#-license)  
11. [Acknowledgements](#-acknowledgements)

---

## ✨ Key Features

| Category           | Highlights |
|--------------------|------------|
| **Gameplay**       | Story-driven chapters, timed quizzes, PvP duel arena, daily streak rewards & point economy |
| **Customisation**  | Pixel-art avatar builder with 100+ layers (skin, hair, eyes, outfits, gear) |
| **Security & Auth**| Email + password (PBKDF2-SHA256) • Google OAuth 2 • Optional TOTP MFA • Server-side Redis sessions |
| **Hardening**      | CSRF tokens • Rate-limiting (100 req/min/IP) • Strict CSP w/ nonces • HSTS • Audit logging |
| **Admin Panel**    | Mission/quiz editor • User analytics export • Role-based access |
| **Dev Ops**        | Alembic migrations • Render blueprint • Gunicorn • GitHub Actions CI |

---

## 🛠 Tech Stack

| Layer        | Choices |
|--------------|---------|
| **Backend**  | Python 3.11 • Flask 3 • Flask-SQLAlchemy • Flask-Migrate |
| **Auth**     | Flask-Login • Flask-Dance • pyotp • Redis |
| **Frontend** | Jinja2 templates • Vanilla JS • HTML5 • CSS3 (BEM) |
| **Database** | PostgreSQL 15 |
| **Tooling**  | Alembic • Gunicorn • Render.com • GitHub Actions • Pre-Commit |

---

## 🏗 Architecture

```mermaid
graph TD
    A[Browser] -->|HTTPS/JSON| B(Flask API)
    B --> C(PostgreSQL)
    B --> D(Redis)
    B --> E(OAuth2 Providers)
    subgraph Security
      C -->|telemetry, audit| B
      D -->|session, rate-limit| B
    end
```

---

## ⚡ Local Setup

### 1. Prerequisites

* Python ≥ 3.10   *PostgreSQL ≥ 13* *Redis* *tcp port 5000 free*

### 2. Clone & Install

```bash
git clone https://github.com/<your-org>/Silent_Strings.git
cd Silent_Strings
python -m venv venv
source venv/bin/activate     # Windows: venv\Scripts\activate
pip install -r requirements.txt
```

### 3. Configure Environment

Copy and edit `.env`:

```dotenv
FLASK_SECRET_KEY=changeme
DATABASE_URL=postgresql://user:pass@localhost:5432/silent_strings
REDIS_URL=redis://localhost:6379/0
GOOGLE_OAUTH_CLIENT_ID=…
GOOGLE_OAUTH_CLIENT_SECRET=…
```

### 4. Initialise DB

```bash
createdb silent_strings
flask db upgrade
```

### 5. Launch

```bash
export FLASK_APP=app.py
flask run                  # dev server with hot-reload
# or: gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### 6. Create an Admin

```bash
python scripts/make_admin.py you@example.com
```

---

## ☁️ One-Click Deploy to Render

1. Push repo to GitHub.  
2. Log in to **Render** → **New + > Blueprint** → pick repo.  
3. Add variables from `.env` under *Environment > Secrets*.  
4. Hit **Apply**. Render sets up a PostgreSQL instance, Redis cache, and deploys behind HTTPS.

---

## 📂 Project Structure

```
Silent_Strings/
├── app.py              ← Flask factory & blueprints
├── requirements.txt
├── templates/          ← Jinja2 views
├── static/             ← CSS, JS, sprites, audio
├── levels/             ← YAML/JSON mission data
├── migrations/         ← Alembic scripts
├── scripts/            ← CLI utilities
│   ├── make_admin.py
│   ├── reset_mfa.py
│   └── sprite_mapper.py
└── render.yaml         ← Render deployment blueprint
```

---

## 🔒 Security Posture

* **Passwords**: PBKDF2-SHA256, 260 k iterations  
* **MFA**: RFC 6238-compliant TOTP (pyotp)  
* **Sessions**: Redis-backed server-side; no JWTs stored in localStorage  
* **Transport**: HSTS, TLS 1.3 enforced in prod  
* **Headers**: CSP (`script-src 'nonce-<random>'`), X-Frame-Options, Referrer-Policy  
* **Abuse Mitigation**: `Flask-Limiter` (100 req/min/IP), account lockouts, per-endpoint scopes  
* **Logging**: Audit trail for password resets, MFA enrol/disable, mission telemetry

---

## 🗺 Roadmap

| Milestone                        | ETA     | Notes                               |
| -------------------------------- | ------- | ----------------------------------- |
| Chapter 2 “Shadow Bridges”       | Q3 2025 | Introduce forensic-memory mini-game |
| Multiplayer lobby & voice chat   | Q4 2025 | Socket.IO + WebRTC                  |
| Achievements & badge gallery     | Q1 2026 | JSON schema-driven                  |
| i18n (🇬🇧 EN, 🇲🇾 BM, 🇸🇬 ZH) | Q2 2026 | Flask-Babel integration             |

---

## 🤝 Contributing

1. **Fork** & create a feature branch.  
2. Run `pre-commit install` (black, flake8, isort).  
3. Add tests (`pytest -q`).  
4. Open a PR — please describe **why** the change is needed.  
   Bug reports & discussion issues welcome!

---

## 📜 License

Released under the **MIT License**.  
See [`LICENSE`](LICENSE) for full text.

---

## 🙏 Acknowledgements

* Curriculum feedback by **Mr Suryanto**  
* Pixel sprites from [OpenGameArt](https://opengameart.org/)  
* Flask, PostgreSQL, Redis & their communities  
  

---

> *Happy hacking — and remember: in cybersecurity, silence tells the loudest story.*
