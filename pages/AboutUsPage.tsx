
import React, { useState, useEffect, useRef } from 'react';

interface AboutUsPageProps {
    handleNavClick: (page: string) => void;
}

// Helper component for animating numbers
const CountUp = ({ end, duration = 2000, suffix = '' }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const easeOutQuad = (t: number) => t * (2 - t);

    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            if (entry.isIntersecting) {
                let startTime: number | null = null;
                const animate = (currentTime: number) => {
                    if (!startTime) startTime = currentTime;
                    const progress = Math.min((currentTime - startTime) / duration, 1);
                    const easedProgress = easeOutQuad(progress);
                    const currentCount = Math.floor(easedProgress * end);
                    setCount(currentCount);
                    if (progress < 1) {
                        requestAnimationFrame(animate);
                    } else {
                        setCount(end); // Ensure it ends on the exact number
                    }
                };
                requestAnimationFrame(animate);
                if (ref.current) {
                    observer.unobserve(ref.current);
                }
            }
        }, { threshold: 0.8 });
        
        const currentRef = ref.current;
        if (currentRef) {
            observer.observe(currentRef);
        }

        return () => {
            if (currentRef) {
                observer.unobserve(currentRef);
            }
        };
    }, [end, duration]);

    return <span ref={ref} aria-live="polite">{count.toLocaleString()}{suffix}</span>;
};


// Custom hook to manage scroll animations
const useAnimateOnScroll = () => {
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                        observer.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        const targets = document.querySelectorAll('.animate-section');
        targets.forEach(target => observer.observe(target));

        return () => {
            targets.forEach(target => {
                if(target) observer.unobserve(target);
            });
        };
    }, []);
};


export const AboutUsPage: React.FC<AboutUsPageProps> = ({ handleNavClick }) => {
    useAnimateOnScroll();
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            setError('All fields are required.');
            return;
        }
        if (!/\S+@\S+\.\S+/.test(formData.email)) {
            setError('Please enter a valid email address.');
            return;
        }
        setError('');
        try {
            const submissions = JSON.parse(localStorage.getItem('contactSubmissions') || '[]');
            submissions.push({ ...formData, date: new Date().toISOString() });
            localStorage.setItem('contactSubmissions', JSON.stringify(submissions));
            setIsSubmitted(true);
            setFormData({ name: '', email: '', message: '' });
            setTimeout(() => setIsSubmitted(false), 5000);
        } catch (err) {
            console.error(err);
            setError('Failed to save your message. Please try again.');
        }
    };

    return (
        <div className="about-us-page">
            <div className="container">
                <section className="all-courses-header animate-section">
                    <h1 className="anim-child">About Devcotel</h1>
                    <p className="anim-child" style={{'--delay': '0.1s'} as React.CSSProperties}>Your trusted partner in skill development and career advancement.</p>
                </section>

                <section className="about-principles animate-section">
                    <div className="values-grid">
                        <div className="value-card anim-child" style={{'--delay': '0.1s'} as React.CSSProperties}>
                            <div className="icon-wrapper"><i className="fas fa-project-diagram"></i></div>
                            <h3>Platform Integration & Services</h3>
                            <p>We connect with 18+ learning platforms, provide certification, and assist with job placement.</p>
                        </div>

                        <div className="value-card anim-child" style={{'--delay': '0.2s'} as React.CSSProperties}>
                            <div className="icon-wrapper"><i className="fas fa-file-contract"></i></div>
                            <h3>Offer Availability</h3>
                            <p>All platform offers are subject to their respective terms and conditions.</p>
                        </div>

                        <div className="value-card anim-child" style={{'--delay': '0.3s'} as React.CSSProperties}>
                            <div className="icon-wrapper"><i className="fas fa-star-half-alt"></i></div>
                            <h3>Suggestion Basis (Reviews)</h3>
                            <p>We suggest platforms based on independent reviews and testimonial reports.</p>
                        </div>

                        <div className="value-card anim-child" style={{'--delay': '0.4s'} as React.CSSProperties}>
                            <div className="icon-wrapper"><i className="fas fa-shield-alt"></i></div>
                            <h3>No Third-Party Promotion</h3>
                            <p>We do not promote platforms based on third-party endorsements or suggestions.</p>
                        </div>

                        <div className="value-card anim-child" style={{'--delay': '0.5s'} as React.CSSProperties}>
                            <div className="icon-wrapper"><i className="fas fa-briefcase"></i></div>
                            <h3>Suggestion Basis (Modules)</h3>
                            <p>Platform suggestions are tailored to meet corporate needs, matching your requirements to relevant learning modules.</p>
                        </div>

                        <div className="value-card anim-child" style={{'--delay': '0.6s'} as React.CSSProperties}>
                            <div className="icon-wrapper"><i className="fas fa-chart-pie"></i></div>
                            <h3>Report Analysis</h3>
                            <p>We use a third-party API for comprehensive report analysis and generating suggestions.</p>
                        </div>
                    </div>
                </section>
                
                 <section className="impact-stats animate-section">
                    <div className="impact-stat anim-child">
                        <i className="fas fa-user-graduate stat-icon"></i>
                        <h3><CountUp end={51} />+</h3>
                        <p>Students Guided</p>
                    </div>
                     <div className="impact-stat anim-child" style={{'--delay': '0.1s'} as React.CSSProperties}>
                        <i className="fas fa-handshake stat-icon"></i>
                        <h3><CountUp end={0} />+</h3>
                        <p>course platform Partnerships</p>
                    </div>
                     <div className="impact-stat anim-child" style={{'--delay': '0.2s'} as React.CSSProperties}>
                        <i className="fas fa-bullseye stat-icon"></i>
                        <h3><CountUp end={95} suffix="%" /></h3>
                        <p>Career Placement Rate through our recomentation</p>
                    </div>
                </section>

                <section className="contact-section-premium animate-section">
                     <h2 className="anim-child">Get in Touch</h2>
                    <div className="contact-wrapper anim-child anim-zoom-in" style={{'--delay': '0.1s'} as React.CSSProperties}>
                        <div className="contact-info-panel">
                            <h3>Contact Information</h3>
                            <p>We'd love to hear from you. Whether you have a question about our programs, partnerships, or anything else, our team is ready to answer all your questions.</p>
                            <ul className="contact-details">
                                <li><i className="fas fa-map-marker-alt"></i> 123 Tech Avenue, Silicon Valley</li>
                                <li><i className="fas fa-phone-alt"></i> +91 DEVCOTEL</li>
                                <li><i className="fas fa-envelope"></i> www.devcotel.com</li>
                            </ul>
                        </div>
                        <div className="contact-form-panel">
                            <h3>Send us a Message</h3>
                            <form onSubmit={handleSubmit} noValidate>
                                <div className="form-group">
                                    <label htmlFor="name">Full Name</label>
                                    <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email Address</label>
                                    <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="message">Message</label>
                                    <textarea id="message" name="message" rows={5} value={formData.message} onChange={handleChange} required></textarea>
                                </div>
                                {error && <p className="form-error">{error}</p>}
                                {isSubmitted && <p className="form-success">Thank you! Your message has been sent.</p>}
                                <button type="submit" className="btn-submit">Send Message</button>
                            </form>
                        </div>
                    </div>
                </section>

            </div>
        </div>
    );
};
