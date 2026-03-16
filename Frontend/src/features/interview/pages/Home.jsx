import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { useInterview } from '../hooks/useInterview.js';
import '../style/Home.css';

const Home = () => {
    // ==========================================================================
    // Application Layer: State, Refs, and Hooks
    // ==========================================================================
    const { loading, generateReport, reports } = useInterview();
    const navigate = useNavigate();
    
    const [jobDescription, setJobDescription] = useState("");
    const [selfDescription, setSelfDescription] = useState("");
    const [fileName, setFileName] = useState(""); // UX: Show selected file name
    const resumeInputRef = useRef();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) setFileName(file.name);
    };

    const handleGenerateReport = async () => {
        const resumeFile = resumeInputRef.current?.files[0];
        const data = await generateReport({ jobDescription, selfDescription, resumeFile });
        if (data && data._id) {
            navigate(`/interview/${data._id}`);
        }
    };

    // ==========================================================================
    // Presentation Layer: Loading UI
    // ==========================================================================
    if (loading) {
        return (
            <main className="dashboard-loading">
                <div className="spinner"></div>
                <h2>Engineering your strategy...</h2>
                <p>Analyzing profile match and generating technical drills.</p>
            </main>
        );
    }

    // ==========================================================================
    // Presentation Layer: Main Dashboard UI
    // ==========================================================================
    return (
        <div className="home-dashboard">
            <div className="container">
                
                {/* --- Compact Page Header --- */}
                <header className="home-header">
                    <h1 className="home-header__title">
                        Interview <span className="text-highlight">Strategy Builder</span>
                    </h1>
                    <p className="home-header__subtitle">
                        Provide the job description and your profile. We'll handle the rest.
                    </p>
                </header>

                {/* --- Compact Generator Card --- */}
                <section className="generator-widget">
                    <div className="generator-widget__grid">
                        
                        {/* Left Column: Job Description */}
                        <div className="widget-panel">
                            <label className="panel-label">
                                Target Job Description <span className="badge badge--required">Required</span>
                            </label>
                            <div className="textarea-wrapper">
                                <textarea
                                    onChange={(e) => setJobDescription(e.target.value)}
                                    value={jobDescription}
                                    className="panel-textarea"
                                    placeholder="Paste the full job description here... (e.g., 'Requires React, Node.js, and System Design experience...')"
                                />
                                <span className="char-count">{jobDescription.length} / 5000</span>
                            </div>
                        </div>

                        {/* Right Column: Profile Inputs */}
                        <div className="widget-panel">
                            <label className="panel-label">
                                Your Profile <span className="badge badge--best">Resume Recommended</span>
                            </label>
                            
                            {/* Horizontal Compact Dropzone */}
                            <label className="compact-dropzone" htmlFor="resume">
                                <span className="compact-dropzone__icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
                                </span>
                                <div className="compact-dropzone__text">
                                    {fileName ? (
                                        <span className="file-name-highlight">{fileName}</span>
                                    ) : (
                                        <span>Click to upload PDF or DOCX</span>
                                    )}
                                </div>
                                <input 
                                    ref={resumeInputRef} 
                                    onChange={handleFileChange}
                                    hidden 
                                    type="file" 
                                    id="resume" 
                                    accept=".pdf,.docx" 
                                />
                            </label>

                            <div className="divider-text">OR / AND</div>

                            {/* Compact Self Description */}
                            <textarea
                                onChange={(e) => setSelfDescription(e.target.value)}
                                value={selfDescription}
                                className="panel-textarea panel-textarea--short"
                                placeholder="Write a quick summary of your skills and years of experience..."
                            />
                        </div>
                    </div>

                    {/* Action Footer */}
                    <footer className="generator-widget__footer">
                        <span className="footer-note">
                            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" stroke="var(--bg-secondary)" strokeWidth="2" /><line x1="12" y1="16" x2="12.01" y2="16" stroke="var(--bg-secondary)" strokeWidth="2" /></svg>
                            Takes ~30 seconds to generate.
                        </span>
                        <button onClick={handleGenerateReport} className="btn btn--primary btn--generate">
                            Generate Roadmap
                        </button>
                    </footer>
                </section>

                {/* --- Recent Reports Grid --- */}
                {reports && reports.length > 0 && (
                    <section className="recent-reports">
                        <h2 className="recent-reports__title">Recent Strategies</h2>
                        <ul className="reports-grid">
                            {reports.map(report => {
                                const scoreClass = report.matchScore >= 80 ? 'score--high' : report.matchScore >= 60 ? 'score--mid' : 'score--low';
                                return (
                                    <li key={report._id} className="report-card" onClick={() => navigate(`/interview/${report._id}`)}>
                                        <h3 className="report-card__title">{report.title || 'Untitled Role'}</h3>
                                        <p className="report-card__date">{new Date(report.createdAt).toLocaleDateString()}</p>
                                        <div className="report-card__score">
                                            Match: <span className={scoreClass}>{report.matchScore}%</span>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    </section>
                )}
            </div>
        </div>
    );
};

export default Home;    