import React, { useState } from 'react';

export const LoginModal = ({ onClose, onEmailLogin, onGoogleLogin, onSwitchToSignUp }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);
        const { error: loginError } = await onEmailLogin(email, password);
        if (loginError) {
            setError(loginError.message);
        } else {
            onClose(); // Close modal on successful login
        }
        setIsLoading(false);
    };

    const handleGoogleClick = async () => {
        setError(null);
        await onGoogleLogin();
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
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
                        <h2>Login</h2>
                        <p>Welcome back! Please login to your account.</p>

                        <button className="btn-google" onClick={handleGoogleClick}>
                            <i className="fab fa-google"></i>
                            <span>Sign in with Google</span>
                        </button>

                        <div className="separator-or">OR</div>
                        
                        <form onSubmit={handleEmailSubmit}>
                            {error && <p className="login-error">{error}</p>}
                            <div className="form-group">
                                <label htmlFor="email">Email</label>
                                <input 
                                    type="email" 
                                    id="email" 
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="yourname@email.com"
                                    required
                                />
                            </div>
                            <div className="form-group">
                                <label htmlFor="password">Password</label>
                                <div className="password-input-wrapper">
                                    <input 
                                        type={showPassword ? 'text' : 'password'}
                                        id="password" 
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        placeholder="**************"
                                        required
                                    />
                                    <button type="button" onClick={togglePasswordVisibility} className="password-toggle-btn">
                                        <i className={showPassword ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                                    </button>
                                </div>
                            </div>
                            <div className="form-options">
                                <div className="remember-me">
                                    <input type="checkbox" id="remember-me" />
                                    <label htmlFor="remember-me">Remember me</label>
                                </div>
                                <a href="#" className="forgot-password">Forgot Password?</a>
                            </div>

                            <button type="submit" className="btn-login-submit" disabled={isLoading}>
                                {isLoading ? 'Logging in...' : 'Login'}
                            </button>
                        </form>
                        
                        <p className="signup-prompt">
                            Don't have an account? <a href="#" onClick={(e) => { e.preventDefault(); onSwitchToSignUp(); }}>Sign up</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};