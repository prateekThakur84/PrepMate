import React from 'react';
import { useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth'; 
import '../landingPage.css'; // Using the standard BEM CSS we created

const LandingPage = () => {
    // ==========================================================================
    // Application Layer: State and Navigation Logic
    // ==========================================================================
    const navigate = useNavigate();
    
    // Extracting user state and logout handler from the auth context
    const { user, handleLogout } = useAuth(); 

    const handleNavigateLogin = () => navigate("/login");
    const handleNavigateRegister = () => navigate("/register");
    const handleNavigateDashboard = () => navigate("/home");

    // Handles the logout sequence and keeps the user on the landing page
    const onLogoutClick = async () => {
        await handleLogout();
        // State updates automatically; UI will immediately switch back to "Log in"
    };

    // ==========================================================================
    // Presentation Layer: Pure UI
    // ==========================================================================
    return (
        <div className="landing">
            
            {/* --- Navigation Bar --- */}
            <nav className="navbar">
                <div className="container navbar__container">
                    <div className="navbar__brand" onClick={() => navigate("/")}>
                        PrepMate
                    </div>
                    <div className="navbar__actions">
                        {/* Conditional Rendering: Show Logout & Dashboard if authenticated */}
                        {user ? (
                            <>
                                <button onClick={onLogoutClick} className="btn btn--text">
                                    Log out
                                </button>
                                <button onClick={handleNavigateDashboard} className="btn btn--primary">
                                    Go to Dashboard
                                </button>
                            </>
                        ) : (
                            <>
                                <button onClick={handleNavigateLogin} className="btn btn--text">
                                    Log in
                                </button>
                                <button onClick={handleNavigateRegister} className="btn btn--primary">
                                    Get Started
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </nav>

            {/* --- Hero Section --- */}
            <header className="hero">
                <div className="container hero__container">
                    <div className="hero__content">
                        <h1 className="hero__title">
                            Master your interviews.<br />
                            <span className="text-highlight">Leave nothing to chance.</span>
                        </h1>
                        <p className="hero__subtitle">
                            Whether you're tackling complex DSA problems or deep-diving into full-stack system design, PrepMate analyzes your resume against target roles to build a personalized, day-by-day preparation roadmap.
                        </p>
                        <div className="hero__cta-group">
                            {/* Conditional Rendering: Update primary CTA based on auth state */}
                            {user ? (
                                <button onClick={handleNavigateDashboard} className="btn btn--primary btn--large">
                                    Continue to Dashboard
                                </button>
                            ) : (
                                <button onClick={handleNavigateRegister} className="btn btn--primary btn--large">
                                    Start Your Journey
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* --- Features Section --- */}
            <main className="features">
                <div className="container">
                    <h2 className="features__heading">Why PrepMate?</h2>
                    <div className="features__grid">
                        
                        {/* Feature Card 1 */}
                        <article className="feature-card">
                            <div className="feature-card__icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
                            </div>
                            <h3 className="feature-card__title">Match Analysis</h3>
                            <p className="feature-card__description">
                                Upload your resume and the job description. Our AI instantly highlights your strengths and pinpoints critical skill gaps.
                            </p>
                        </article>

                        {/* Feature Card 2 */}
                        <article className="feature-card">
                            <div className="feature-card__icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
                            </div>
                            <h3 className="feature-card__title">Technical Drills</h3>
                            <p className="feature-card__description">
                                Stop guessing what they'll ask. Generate specific technical and behavioral questions based on the role's exact tech stack requirements.
                            </p>
                        </article>

                        {/* Feature Card 3 */}
                        <article className="feature-card">
                            <div className="feature-card__icon">
                                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                            </div>
                            <h3 className="feature-card__title">7-Day Roadmap</h3>
                            <p className="feature-card__description">
                                Execute a structured, customized daily plan designed to transform your theoretical knowledge into interview readiness.
                            </p>
                        </article>

                    </div>
                </div>
            </main>

            {/* --- Footer --- */}
            <footer className="footer">
                <div className="container footer__container">
                    <p>&copy; {new Date().getFullYear()} PrepMate. Built for engineers.</p>
                </div>
            </footer>
        </div>
    );
};

export default LandingPage;