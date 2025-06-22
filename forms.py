from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField, BooleanField
from wtforms.validators import DataRequired, Email, Length, Regexp, EqualTo

class SignupForm(FlaskForm):
    username = StringField('Username', validators=[
        DataRequired(), Length(min=3, max=30)
    ])
    email = StringField('Email', validators=[
        DataRequired(), Email()
    ])
    password = PasswordField('Password', validators=[
        DataRequired(),
        Length(min=8, max=32),
        Regexp(
            r"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).+$",
            message="Password must have uppercase, lowercase, number, and special character."
        )
    ])
    submit = SubmitField('Sign Up')

class LoginForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    submit = SubmitField('Log In')

class ForgotPasswordForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired(), Email()])
    submit = SubmitField('Send Reset Link')

class ResetPasswordForm(FlaskForm):
    password = PasswordField('New Password', validators=[
        DataRequired(),
        Length(min=6, message="Password must be at least 6 characters")
    ])
    confirm = PasswordField('Confirm Password', validators=[
        DataRequired(),
        EqualTo('password', message='Passwords must match')
    ])
    submit = SubmitField('Reset Password')

class ResetProgressForm(FlaskForm):
    pass

class MFAVerificationForm(FlaskForm):
    otp_code = StringField('OTP Code', validators=[
        DataRequired(),
        Length(min=6, max=6, message="OTP code must be 6 digits")
    ])
    submit = SubmitField('Verify')

class MFASetupForm(FlaskForm):
    otp_code = StringField('OTP Code', validators=[
        DataRequired(),
        Length(min=6, max=6, message="OTP code must be 6 digits")
    ])
    submit = SubmitField('Enable MFA')

class MFARecoveryForm(FlaskForm):
    recovery_code = StringField('Recovery Code', validators=[
        DataRequired(),
        Length(min=16, max=16, message="Recovery code must be 16 characters")
    ])
    submit = SubmitField('Recover Access')