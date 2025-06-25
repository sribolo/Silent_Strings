#!/usr/bin/env python3
"""
Script to reset MFA for a user.
Usage: python3 reset_mfa.py <email>
"""

import sys
from app import app, db, User

def reset_mfa(email):
    """Resets MFA for the user with the given email."""
    with app.app_context():
        user = User.query.filter_by(email=email).first()
        if user:
            user.mfa_enabled = False
            user.otp_secret = None
            user.recovery_codes = None
            db.session.commit()
            print(f"✅ MFA has been reset for {user.username} ({email}).")
            print("   The user can now log in with their password only.")
            return True
        else:
            print(f"❌ User with email {email} not found.")
            return False

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python3 reset_mfa.py <email>")
        sys.exit(1)
    
    email_arg = sys.argv[1]
    reset_mfa(email_arg) 