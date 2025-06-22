// MFA Verification Page JavaScript
document.addEventListener("DOMContentLoaded", function() {
    const otpInput = document.getElementById('otp-code');
    
    if (!otpInput) return;
    
    // Focus on input
    otpInput.focus();
    
    // Only allow numbers
    otpInput.addEventListener('input', function() {
        this.value = this.value.replace(/[^0-9]/g, '');
        
        // Auto-submit when 6 digits are entered
        if (this.value.length === 6) {
            this.form.submit();
        }
    });
    
    // Handle paste events
    otpInput.addEventListener('paste', function(e) {
        e.preventDefault();
        const pastedText = (e.clipboardData || window.clipboardData).getData('text');
        const numbers = pastedText.replace(/[^0-9]/g, '');
        this.value = numbers.substring(0, 6);
        
        if (this.value.length === 6) {
            this.form.submit();
        }
    });
}); 