import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useInterview } from '../hooks/useInterview.js';
import '../style/Interview.css'; // Shifted to standard CSS

// --- Constants & Config ---
const NAV_ITEMS = [
    { id: 'technical', label: 'Technical Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6" /><polyline points="8 6 2 12 8 18" /></svg>) },
    { id: 'behavioral', label: 'Behavioral Questions', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>) },
    { id: 'roadmap', label: 'Road Map', icon: (<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>) },
];

// --- Sub-components (Pure Presentation) ---
const QuestionCard = ({ item, index }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <article className="question-card">
            <header className="question-card__header" onClick={() => setIsOpen(!isOpen)}>
                <span className="question-card__index">Q{index + 1}</span>
                <p className="question-card__text">{item.question}</p>
                <span className={`question-card__chevron ${isOpen ? 'question-card__chevron--open' : ''}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9" /></svg>
                </span>
            </header>
            
            {isOpen && (
                <div className="question-card__body">
                    <div className="question-card__section">
                        <span className="badge badge--intention">Intention</span>
                        <p className="question-card__detail">{item.intention}</p>
                    </div>
                    <div className="question-card__section">
                        <span className="badge badge--answer">Model Answer</span>
                        <p className="question-card__detail">{item.answer}</p>
                    </div>
                </div>
            )}
        </article>
    );
};

const RoadMapDay = ({ day }) => (
    <article className="roadmap-card">
        <header className="roadmap-card__header">
            <span className="badge badge--day">Day {day.day}</span>
            <h3 className="roadmap-card__title">{day.focus}</h3>
        </header>
        <ul className="roadmap-card__tasks">
            {day.tasks.map((task, i) => (
                <li key={i} className="roadmap-card__task-item">
                    <span className="roadmap-card__bullet" />
                    {task}
                </li>
            ))}
        </ul>
    </article>
);


// --- Main Component ---
const Interview = () => {
    // Application Layer: State, Hooks, and Routing
    const [activeNav, setActiveNav] = useState('technical');
    const { report, getReportById, loading, getResumePdf } = useInterview();
    const { interviewId } = useParams();
    const navigate = useNavigate();

    // Fetch report data on mount or when ID changes
    useEffect(() => {
        if (interviewId) {
            getReportById(interviewId);
        }
    }, [interviewId]);

    // Derived State Logic
    const getScoreModifier = (score) => {
        if (score >= 80) return 'score--high';
        if (score >= 60) return 'score--mid';
        return 'score--low';
    };

    // Presentation Layer: Render Loading State
    if (loading || !report) {
        return (
            <main className="dashboard-loading">
                <div className="spinner"></div>
                <h2>Loading your interview strategy...</h2>
            </main>
        );
    }

    // Presentation Layer: Main Dashboard Render
    return (
        <div className="dashboard-layout">
            
            {/* ── Left Sidebar: Navigation ── */}
            <aside className="dashboard-nav">
                <div className="dashboard-nav__top">
                    <h1 className="brand-heading" onClick={() => navigate("/")}>PrepMate</h1>
                    <span className="dashboard-nav__label">Strategy Sections</span>
                    
                    <nav className="nav-menu">
                        {NAV_ITEMS.map(item => (
                            <button
                                key={item.id}
                                className={`nav-menu__item ${activeNav === item.id ? 'nav-menu__item--active' : ''}`}
                                onClick={() => setActiveNav(item.id)}
                            >
                                <span className="nav-menu__icon">{item.icon}</span>
                                {item.label}
                            </button>
                        ))}
                    </nav>
                </div>

                <div className="dashboard-nav__bottom">
                    <button onClick={() => getResumePdf(interviewId)} className="btn btn--primary btn--full">
                        <svg width="16" height="16" style={{ marginRight: "0.5rem" }} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 16L7 11l1.4-1.4 2.6 2.6V4h2v8.2l2.6-2.6L17 11l-5 5zm-6 4v-2h12v2H6z"/></svg>
                        Export PDF
                    </button>
                </div>
            </aside>

            {/* ── Center Content: Dynamic Sections ── */}
            <main className="dashboard-content">
                <div className="content-container">
                    
                    {activeNav === 'technical' && (
                        <section className="dashboard-section">
                            <header className="section-header">
                                <h2 className="section-header__title">Technical Deep Dive</h2>
                                <span className="badge badge--counter">{report.technicalQuestions.length} Items</span>
                            </header>
                            <div className="question-list">
                                {report.technicalQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'behavioral' && (
                        <section className="dashboard-section">
                            <header className="section-header">
                                <h2 className="section-header__title">Behavioral Frameworks</h2>
                                <span className="badge badge--counter">{report.behavioralQuestions.length} Items</span>
                            </header>
                            <div className="question-list">
                                {report.behavioralQuestions.map((q, i) => (
                                    <QuestionCard key={i} item={q} index={i} />
                                ))}
                            </div>
                        </section>
                    )}

                    {activeNav === 'roadmap' && (
                        <section className="dashboard-section">
                            <header className="section-header">
                                <h2 className="section-header__title">Preparation Roadmap</h2>
                                <span className="badge badge--counter">{report.preparationPlan.length} Days</span>
                            </header>
                            <div className="roadmap-list">
                                {report.preparationPlan.map((day) => (
                                    <RoadMapDay key={day.day} day={day} />
                                ))}
                            </div>
                        </section>
                    )}

                </div>
            </main>

            {/* ── Right Sidebar: Analytics ── */}
            <aside className="dashboard-analytics">
                
                {/* Score Widget */}
                <div className="widget">
                    <h3 className="widget__title">Profile Match</h3>
                    <div className={`match-ring ${getScoreModifier(report.matchScore)}`}>
                        <span className="match-ring__value">{report.matchScore}</span>
                        <span className="match-ring__symbol">%</span>
                    </div>
                    <p className="widget__subtitle">Alignment with job requirements</p>
                </div>

                <hr className="divider" />

                {/* Skill Gaps Widget */}
                <div className="widget">
                    <h3 className="widget__title">Identified Skill Gaps</h3>
                    <div className="skill-gap-list">
                        {report.skillGaps.map((gap, i) => (
                            <span key={i} className={`gap-tag gap-tag--${gap.severity.toLowerCase()}`}>
                                {gap.skill}
                            </span>
                        ))}
                    </div>
                </div>

            </aside>
        </div>
    );
};

export default Interview;