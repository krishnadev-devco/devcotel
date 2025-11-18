import React, { useState } from 'react';

export const SignUpModal = ({ onClose, onSignUp, onSwitchToLogin }) => {
    const [fullName, setFullName] = useState('');
    const [mobile, setMobile] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleSignUpSubmit = async (e) => {
        e.preventDefault();
        if (!fullName || !email || !password) {
            setError("Full name, email, and password are required.");
            return;
        }
        setError(null);
        setIsLoading(true);
        const { error: signUpError } = await onSignUp(email, password, {
            full_name: fullName,
            mobile_number: mobile,
        });
        if (signUpError) {
            setError(signUpError.message);
        } else {
            onClose(); // Close modal on successful sign-up
        }
        setIsLoading(false);
    };
    
    // Prevent closing modal when clicking inside the content
    const handleContentClick = (e) => e.stopPropagation();

    return (
        <div className="login-modal-backdrop" onClick={onClose}>
            <div className="login-modal-content" onClick={handleContentClick}>
                <div className="login-modal-container">
                    <div className="login-image-panel">
                        {/* The background image is set via CSS */}
                    </div>
                    <div className="login-form-panel">
                         <button className="close-btn" onClick={onClose} aria-label="Close modal">&times;</button>
                        <h2>Create Account</h2>
                        <p>Join our community to start your learning journey.</p>
                        
                        <form onSubmit={handleSignUpSubmit}>
                            {error && <p className="login-error">{error}</p>}
                            <div className="form-group">
                                <label htmlFor="fullName">Full Name</label>
                                <input 
                                    type="text" 
                                    id="fullName" 
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    placeholder="e.g., John Doe"
                                    required
                                />
                            </div>
                             <div className="form-group">
                                <label htmlFor="mobile">Mobile Number (Optional)</label>
                                <input 
                                    type="tel" 
                                    id="mobile" 
                                    value={mobile}
                                    onChange={(e) => setMobile(e.target.value)}
                                    placeholder="e.g., +1 555-123-4567"
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="signup-email">Email</label>
                                <input 
                                    type="email" 
                                    id="signup-email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="yourname@email.com"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="signup-password">Password</label>
                                <div className="password-input-wrapper">
                                    <input 
                                        type={showPassword ? 'text' : 'password'}
                                        id="signup-password" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="Min. 6 characters"
                                        required
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="password-toggle-btn">
                                        <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                                    </button>
                                </div>
                            </div>

                            <button type="submit" className="btn-login-submit" disabled={isLoading}>
                                {isLoading ? 'Creating Account...' : 'Sign Up'}
                            </button>
                        </form>
                        
                        <p className="signup-prompt">
                            Already have an account? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToLogin(); }}>Log in</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};
