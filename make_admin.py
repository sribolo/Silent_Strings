
"""
Script to grant admin privileges to a user
Usage: python3 make_admin.py <email>
"""

import sys
from app import app, db, User

def make_admin(email):
    with app.app_context():
        user = User.query.filter_by(email=email).first()
        if user:
            user.is_admin = True
            db.session.commit()
            print(f"✅ Admin privileges granted to {user.username} ({email})")
            return True
        else:
            print(f"❌ User with email {email} not found")
            return False

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 make_admin.py <email>")
        sys.exit(1)
    
    email = sys.argv[1]
    success = make_admin(email)
    sys.exit(0 if success else 1) 