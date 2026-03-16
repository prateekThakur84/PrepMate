import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import '../styles/Auth.css'; // Importing standard CSS instead of SCSS

const Login = () => {
    // Application Layer: State management and routing logic
    const { loading, handleLogin } = useAuth();
    const navigate = useNavigate();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleLogin({ email, password });
        navigate('/home'); // Standard redirect after login
    };

    // Presentation Layer: Pure UI Rendering
    if (loading) {
        return (
            <main className="auth-page">
                <div className="auth-loading">
                    <h2>Authenticating...</h2>
                    <p>Please wait while we verify your credentials.</p>
                </div>
            </main>
        );
    }

    return (
        <main className="auth-page">
            <Link to="/" className="auth-brand">PrepMate</Link>
            
            <section className="auth-card">
                <div className="auth-card__header">
                    <h1 className="auth-card__title">Welcome back</h1>
                    <p className="auth-card__subtitle">Enter your details to access your dashboard.</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-form__group">
                        <label className="auth-form__label" htmlFor="email">Email</label>
                        <input
                            className="auth-form__input"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            type="email" 
                            id="email" 
                            name="email" 
                            placeholder="name@example.com" 
                            required 
                        />
                    </div>

                    <div className="auth-form__group">
                        <label className="auth-form__label" htmlFor="password">Password</label>
                        <input
                            className="auth-form__input"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            type="password" 
                            id="password" 
                            name="password" 
                            placeholder="Enter your password" 
                            required 
                        />
                    </div>

                    <button type="submit" className="btn btn--primary auth-form__submit">
                        Sign In
                    </button>
                </form>

                <div className="auth-card__footer">
                    <p>Don't have an account? <Link to="/register" className="auth-link">Sign up</Link></p>
                </div>
            </section>
        </main>
    );
};

export default Login;