import React, { useState } from 'react';
import { GeneratedRoadmap, User } from '../types';
import { generateCareerRoadmap } from '../services/geminiService';
import { SparklesIcon, SpinnerIcon, CheckCircleIcon, MapIcon, BeakerIcon, LightBulbIcon } from '../components/Icons';

const InitialState: React.FC = () => (
    <div className="roadmap-generator__initial-state">
        <MapIcon className="icon" />
        <h3>Ready to map your future?</h3>
        <p>
            Enter a job role above and our AI will generate a personalized roadmap for you.
        </p>
    </div>
);

const LoadingState: React.FC = () => (
    <div className="roadmap-generator__loading-state">
        <SpinnerIcon className="icon" />
        <h3>Generating Your Roadmap...</h3>
        <p>
            Our AI is crafting the perfect career plan for you. This might take a moment.
        </p>
    </div>
);

const RoadmapDisplay: React.FC<{ roadmap: GeneratedRoadmap, role: string }> = ({ roadmap, role }) => (
    <div className="roadmap-display">
        <h2 className="roadmap-display__title">Your Roadmap to Becoming a {role}</h2>
        
        <div className="roadmap-display__section">
            <h3 className="roadmap-display__section-title"><BeakerIcon className="icon"/>Key Skills to Master</h3>
            <div className="key-skills-grid">
                {roadmap.keySkills.map(category => (
                    <div key={category.category} className="key-skills-category">
                        <h4>{category.category}</h4>
                        <ul>
                            {category.skills.map(skill => (
                                <li key={skill}>
                                    <CheckCircleIcon className="icon-check"/>
                                    <span>{skill}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
        </div>

        <div className="roadmap-display__section">
            <h3 className="roadmap-display__section-title"><MapIcon className="icon"/>Step-by-Step Guide</h3>
            <div className="step-by-step-timeline">
                {roadmap.roadmap.map(step => (
                     <div key={step.step} className="timeline-item">
                         <div className="timeline-dot"></div>
                         <p className="timeline-duration">{step.duration}</p>
                         <h4 className="timeline-title">{step.title}</h4>
                         <p className="timeline-description">{step.description}</p>
                     </div>
                ))}
            </div>
        </div>

        <div className="roadmap-display__section">
            <h3 className="roadmap-display__section-title"><LightBulbIcon className="icon"/>Project Ideas to Build Your Portfolio</h3>
            <ul className="project-ideas-list">
                {roadmap.projectIdeas.map(project => (
                    <li key={project.title} className="project-idea">
                        <h4>{project.title}</h4>
                        <p>{project.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    </div>
);

interface CarrierRoadmapPageProps {
    currentUser: User | null;
    promptLogin: () => void;
}

export const CarrierRoadmapPage: React.FC<CarrierRoadmapPageProps> = ({ currentUser, promptLogin }) => {
    const [jobRole, setJobRole] = useState('');
    const [roadmap, setRoadmap] = useState<GeneratedRoadmap | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleGenerateRoadmap = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!jobRole.trim()) {
            setError('Please enter a job role.');
            return;
        }
        setIsLoading(true);
        setError(null);
        setRoadmap(null);
        try {
            const result = await generateCareerRoadmap(jobRole);
            setRoadmap(result);
        } catch (e) {
            console.error(e);
            setError('Sorry, we couldn\'t generate the roadmap at this moment. Please try again later.');
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="carrier-roadmap-page">
            <div className="container">
                <div className="all-courses-header">
                    <h1>AI Career Roadmap Generator</h1>
                    <p>Enter your desired job role and our AI will create a personalized step-by-step guide for you.</p>
                </div>

                {currentUser ? (
                    <div className="roadmap-generator">
                        <form onSubmit={handleGenerateRoadmap} className="roadmap-generator__form">
                            <input
                                type="text"
                                value={jobRole}
                                onChange={(e) => setJobRole(e.target.value)}
                                placeholder="e.g., Senior Backend Engineer"
                                className="roadmap-generator__input"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                className="roadmap-generator__button"
                                disabled={isLoading}
                            >
                                <SparklesIcon className="icon" />
                                Generate
                            </button>
                        </form>
                        
                        {error && <p className="roadmap-generator__error">{error}</p>}
                        
                        <div className="roadmap-generator__output">
                            {isLoading && <LoadingState />}
                            {!isLoading && !roadmap && !error && <InitialState />}
                            {roadmap && <RoadmapDisplay roadmap={roadmap} role={jobRole} />}
                        </div>
                    </div>
                ) : (
                    <div className="roadmap-generator__initial-state" style={{border: '1px solid var(--border-color)', boxShadow: 'var(--box-shadow)'}}>
                        <MapIcon className="icon" />
                        <h3>Please Log In to Continue</h3>
                        <p>You need to be logged in to generate a personalized career roadmap.</p>
                        <button onClick={promptLogin} className="btn-primary" style={{marginTop: '1.5rem'}}>Login to Generate</button>
                    </div>
                )}
            </div>
        </div>
    );
};
