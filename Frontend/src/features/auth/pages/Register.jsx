import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import '../styles/Auth.css'; // Shared standard CSS

const Register = () => {
    // Application Layer: State management and API integration
    const navigate = useNavigate();
    const { loading, handleRegister } = useAuth();
    
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        await handleRegister({ username, email, password });
        navigate("/home"); // Direct to home after successful registration
    };

    // Presentation Layer: Loading UI
    if (loading) {
        return (
            <main className="auth-page">
                <div className="auth-loading">
                    <h2>Creating Account...</h2>
                    <p>Setting up your PrepMate profile.</p>
                </div>
            </main>
        );
    }

    // Presentation Layer: Form UI
    return (
        <main className="auth-page">
            <Link to="/" className="auth-brand">PrepMate</Link>
            
            <section className="auth-card">
                <div className="auth-card__header">
                    <h1 className="auth-card__title">Create an account</h1>
                    <p className="auth-card__subtitle">Start generating custom interview roadmaps today.</p>
                </div>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-form__group">
                        <label className="auth-form__label" htmlFor="username">Username</label>
                        <input
                            className="auth-form__input"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                            type="text" 
                            id="username" 
                            name="username" 
                            placeholder="Choose a username" 
                            required 
                        />
                    </div>

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
                            placeholder="Create a strong password" 
                            required 
                            minLength="6"
                        />
                    </div>

                    <button type="submit" className="btn btn--primary auth-form__submit">
                        Sign Up
                    </button>
                </form>

                <div className="auth-card__footer">
                    <p>Already have an account? <Link to="/login" className="auth-link">Log in</Link></p>
                </div>
            </section>
        </main>
    );
};

export default Register;