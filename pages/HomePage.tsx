import React, { useRef, useEffect, useState } from 'react';
import { CourseCard } from '../components/CourseCard';

const roadmapData = [
    { month: "Month 1", title: "Basic Python", icon: "fab fa-python" },
    { month: "Month 2", title: "Stats & Probability", icon: "fas fa-chart-line" },
    { month: "Month 3", title: "Advanced Python", icon: "fab fa-python" },
    { month: "Month 4", title: "Visualization", icon: "fas fa-chart-bar" },
    { month: "Month 5", title: "Machine Learning", icon: "fas fa-robot" },
    { month: "Month 6", title: "Data Manipulation", icon: "fas fa-database" },
    { month: "Month 7", title: "Deployment", icon: "fas fa-server" },
    { month: "Month 8", title: "Deep Learning", icon: "fas fa-brain" },
    { month: "Month 9", title: "CV/NLP", icon: "fas fa-comments" },
    { month: "Month 10", title: "Interview Preparation", icon: "fas fa-user-tie" },
    { month: "Month 11", title: "Projects & Resume Prep", icon: "fas fa-file-alt" },
    { month: "Success!", title: "Land Your Dream Job", icon: "fas fa-trophy" }
];

const pinColors = ['#FFC200', '#FF5733', '#C70039', '#900C3F', '#581845', '#3D9970', '#0074D9', '#7FDBFF', '#39CCCC', '#B10DC9', '#F012BE', '#2ECC40'];

const desktopPositions = [
    { top: '10%', left: '15%' }, { top: '8%', left: '50%' }, { top: '10%', left: '85%' },
    { top: '35%', left: '80%' }, { top: '38%', left: '50%' }, { top: '35%', left: '20%' },
    { top: '60%', left: '15%' }, { top: '63%', left: '50%' }, { top: '60%', left: '85%' },
    { top: '85%', left: '80%' }, { top: '88%', left: '50%' }, { top: '85%', left: '20%' }
];

const mobilePositions = [
    { top: '3%', left: '50%' }, { top: '11%', left: '50%' }, { top: '19%', left: '50%' },
    { top: '27%', left: '50%' }, { top: '35%', left: '50%' }, { top: '43%', left: '50%' },
    { top: '51%', left: '50%' }, { top: '59%', left: '50%' }, { top: '67%', left: '50%' },
    { top: '75%', left: '50%' }, { top: '83%', left: '50%' }, { top: '91%', left: '50%' }
];


const testimonialsData = [
    {
        image: "https://randomuser.me/api/portraits/men/32.jpg",
        name: "Jacob Jones",
        text: "Devcotel has been a game-changer for my career. The courses are top-notch, and the community aspect is incredibly valuable. Highly recommended!"
    },
    {
        image: "https://randomuser.me/api/portraits/women/44.jpg",
        name: "Jenny Wilson",
        text: "I was able to upskill and land a new job thanks to the practical knowledge I gained here. The mentors are experts in their fields and very supportive."
    }
];

const featuresData = [
    {
        image: "https://cdn.pixabay.com/photo/2024/02/22/11/02/woman-8589721_640.png",
        title: "24x7 Access",
        description: "Study anywhere anytime, using your mobile, desktop, or laptop. Download lessons and view them offline or stream them directly for your convenience."
    },
    {
        image: "https://cdn-blog.flexi.ink/images/posts/post_45/174186186767d2b3eb630f1_s1000.jpeg",
        title: "AI-Powered Recommendations",
        description: "Plan your registrations with our AI-powered review analyzer. Get fully customized recommendations that help you plan a better future and be ready for your dreams."
    },
    {
        image: "https://img.freepik.com/premium-vector/freelancer-working-home-with-cat_6280-871.jpg?semt=ais_hybrid&w=740&q=80",
        title: "In-depth Knowledge Base",
        description: "Get all the information you need on any topic through our Career Roadmap. You don’t need to open a book anymore."
    }
];

const blogsData = [
    {
        image: "https://img.freepik.com/free-photo/view-3d-business-finance-illustration-with-bar-chart-graph_23-2151048868.jpg?t=st=1722253813~exp=1722257413~hmac=5066928e211832bb584b4aa590823577d2a58b09335ef00523edfe97f1f9e16a&w=900",
        tag: "NEWS",
        title: "COMPANY BOARD LGS & ASSISTANT PRISON OFFICER 2025 | KERALA PSC NOTIFICATION OUT",
        date: "October 31, 2025"
    },
    {
        image: "https://img.freepik.com/free-vector/online-education-concept-illustration_114360-1234.jpg?t=st=1722253856~exp=1722257456~hmac=f38e652a2335f606822263884d6910da126c04e3b1c2b53df90f10c634c03d15&w=740",
        tag: "NEST EXAM",
        title: "WHAT IS XYLEM NEST 2025-26? COMPLETE GUIDE TO KERALA’S TOP ENTRANCE SCHOLARSHIP TEST",
        date: "October 31, 2025"
    },
    {
        image: "https://img.freepik.com/free-photo/young-student-learning-library-book-stack-gaa9d94539_1920.jpg?w=996",
        tag: "ENTRANCE",
        title: "NEET 2026 SYLLABUS – EXAM DATE, PATTERN, CUTOFF, PREPARATION TIPS",
        date: "October 28, 2025"
    }
];

const showcaseData = {
    'ChatGPT': {
        title: 'Expand your horizons with ChatGPT',
        description: 'Master tools and techniques to streamline your work, create stunning content, and 10x your productivity.',
        courses: [
            { id: 5, image: 'https://img.freepik.com/free-vector/thoughtful-woman-with-laptop-planning-schedule-week_74855-20519.jpg?w=1060&t=st=1722256424~exp=1722257024~hmac=50e487198e723528f804fc64e62244e830e79391e0a29ef99335c05ab5976b97', title: 'The Complete AI Guide: Learn ChatGPT, Generative AI & More', instructor: 'Julian Melanson, Benza Maman', rating: 4.5, reviews: 51662, price: '₹549', old_price: '₹2,739', bestseller: true },
            { id: 6, image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop', title: 'ChatGPT: Complete ChatGPT Course For Work 2025 (Ethically)!', instructor: 'Steve Ballinger, MBA', rating: 4.5, reviews: 117510, price: '₹619', old_price: '₹3,619', bestseller: true },
        ]
    },
    'Data Science': {
        title: 'Unlock insights with Data Science',
        description: 'Learn to analyze data, build predictive models, and make data-driven decisions that impact business outcomes.',
        courses: [
            { id: 2, image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop', title: 'Introduction to Python for Data Science', instructor: 'Jane Smith', rating: 4.9, reviews: 9876, price: '₹499', old_price: '₹2,999', bestseller: false },
            { id: 7, image: 'https://images.unsplash.com/photo-1638369320327-58a5848c9a3b?q=80&w=1964&auto=format&fit=crop', title: 'Advanced Machine Learning & AI', instructor: 'Dr. Angela Yu', rating: 4.8, reviews: 25432, price: '₹799', old_price: '₹4,499', bestseller: true },
        ]
    },
    'Python': {
        title: 'Master the Python programming language',
        description: 'From web development to data analysis, Python is a versatile language that opens doors to countless opportunities.',
         courses: [
            { id: 8, image: 'https://images.unsplash.com/photo-1526379095098-d64698bf3824?q=80&w=2070&auto=format&fit=crop', title: 'Python for Absolute Beginners', instructor: 'Jose Portilla', rating: 4.6, reviews: 150231, price: '₹499', old_price: '₹1,999', bestseller: true },
            { id: 9, image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=2088&auto=format&fit=crop', title: 'Automate the Boring Stuff with Python', instructor: 'Al Sweigart', rating: 4.7, reviews: 89123, price: '₹549', old_price: '₹2,739', bestseller: false },
        ]
    },
    'AI': {
        title: 'Dive into the world of Artificial Intelligence',
        description: 'Explore the fundamentals of AI, machine learning, and neural networks to build intelligent systems of the future.',
        courses: [
             { id: 5, image: 'https://img.freepik.com/free-vector/thoughtful-woman-with-laptop-planning-schedule-week_74855-20519.jpg?w=1060&t=st=1722256424~exp=1722257024~hmac=50e487198e723528f804fc64e62244e830e79391e0a29ef99335c05ab5976b97', title: 'The Complete AI Guide: Learn ChatGPT, Generative AI & More', instructor: 'Julian Melanson, Benza Maman', rating: 4.5, reviews: 51662, price: '₹549', old_price: '₹2,739', bestseller: true },
             { id: 7, image: 'https://images.unsplash.com/photo-1638369320327-58a5848c9a3b?q=80&w=1964&auto=format&fit=crop', title: 'Advanced Machine Learning & AI', instructor: 'Dr. Angela Yu', rating: 4.8, reviews: 25432, price: '₹799', old_price: '₹4,499', bestseller: true },
        ]
    },
};

// FIX: Define an interface for the course prop and type the SkillCourseCard component with React.FC. This resolves a TypeScript error where the 'key' prop was being flagged as an undeclared prop during list rendering.
interface SkillCourse {
    id: number;
    image: string;
    title: string;
    instructor: string;
    rating: number;
    reviews: number;
    price: string;
    old_price: string;
    bestseller: boolean;
}

const SkillCourseCard: React.FC<{ course: SkillCourse }> = ({ course }) => (
    <a href="https://krishnadev-devco.github.io/form-test/" target="_blank" rel="noopener noreferrer" className="skill-course-card">
        <img src={course.image} alt={course.title} />
        <h4>{course.title}</h4>
        <p className="instructor">{course.instructor}</p>
        <div className="rating-line">
            <span className="rating-score">{course.rating.toFixed(1)}</span>
            <i className="fas fa-star"></i>
            <span className="reviews-count">({course.reviews.toLocaleString()})</span>
        </div>
        <div className="price-line">
            <span className="current-price">{course.price}</span>
            <span className="old-price">{course.old_price}</span>
        </div>
        {course.bestseller && <div className="bestseller-tag">Bestseller</div>}
    </a>
);


const SkillsShowcase = () => {
    const [activeTab, setActiveTab] = useState(Object.keys(showcaseData)[0]);
    const activeTabData = showcaseData[activeTab];

    return (
        <section className="skills-showcase-section">
            <div className="container">
                <div className="section-header">
                    <h2>All the skills you need in one place</h2>
                    <p>From critical skills to technical topics, devcotel supports your professional development.</p>
                </div>
                <div className="skills-tabs">
                    {Object.keys(showcaseData).map(tabName => (
                        <button
                            key={tabName}
                            onClick={() => setActiveTab(tabName)}
                            className={activeTab === tabName ? 'active' : ''}
                        >
                            {tabName}
                        </button>
                    ))}
                </div>
                <div className="skills-tab-content">
                    <div className="skills-tab-description">
                        <h3>{activeTabData.title}</h3>
                        <p>{activeTabData.description}</p>
                    </div>
                    <div className="skill-courses-grid">
                        {activeTabData.courses.map(course => (
                           <SkillCourseCard key={course.id} course={course} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};


const LearnAnythingSection = () => (
    <section className="learn-anything-section">
        <div className="container">
            <div className="learn-anything-content">
                <div className="learn-anything-text">
                    <p className="pre-header">LEARNERS AND STUDENTS</p>
                    <h2><span>You</span> can #be somebody.</h2>
                    <p>Build a deep, solid Networks with devcotel community and more.</p>
                    <a href="https://krishnadev-devco.github.io/form-test/" onClick={(e) => e.preventDefault()} className="btn-primary">ENTREPRENEUR, start here</a>
                </div>
                <div className="learn-anything-image">
                    <img src="https://img.freepik.com/free-vector/freelancer-working-laptop-her-house_1150-35054.jpg?semt=ais_hybrid&w=740&q=80" alt="Illustration of learning tools" />
                </div>
            </div>
        </div>
    </section>
);

const FeaturesSection = ({ handleNavClick }) => (
    <section className="features-section">
        <div className="container">
            <div className="section-header">
                <h2>Features of Devcotel Learning</h2>
            </div>
            <div className="features-grid">
                {featuresData.map((feature, index) => (
                    <div className="feature-item" key={index}>
                        <img src={feature.image} alt={feature.title} />
                        <h3>{feature.title}</h3>
                        <p>{feature.description}</p>
                    </div>
                ))}
            </div>
            <a href="#" className="view-all-btn" onClick={(e) => { e.preventDefault(); handleNavClick('about'); }}>About us &gt;</a>
        </div>
    </section>
);

const BlogsSection = () => (
    <section className="blogs-section">
        <div className="container">
            <div className="section-header">
                <h2>Latest Blogs & News</h2>
            </div>
            <div className="blogs-grid">
                {blogsData.map((blog, index) => (
                    <div className="blog-card" key={index}>
                        <div className="blog-image-container">
                            <img src={blog.image} alt={blog.title} />
                            <span className="blog-tag">{blog.tag}</span>
                        </div>
                        <div className="blog-content">
                            <h3>{blog.title}</h3>
                            <a href="#" className="read-more">READ MORE »</a>
                            <p className="blog-date">{blog.date}</p>
                        </div>
                    </div>
                ))}
            </div>
            <a href="#" className="btn-generate-roadmap" onClick={(e) => e.preventDefault()}>Know More &gt;</a>
        </div>
    </section>
);


const DataScienceRoadmap = ({handleNavClick}) => {
    const sectionRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            },
            {
                threshold: 0.2, // Trigger when 20% of the element is visible
            }
        );

        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }

        return () => {
            if (sectionRef.current) {
                observer.unobserve(sectionRef.current);
            }
        };
    }, []);

    const snakePath = "M50,100 C250,50,350,150,500,100 S750,50,950,120 C900,250,750,350,500,320 S250,250,100,350 C-50,500,250,550,500,500 S750,450,900,550 C950,650,800,750,500,700 S200,650,50,720";
    const mobilePath = "M50,50 C100,200 0,350 50,500 S100,800 50,950 S0,1250 50,1400 V1550";

    return (
        <section className="roadmap">
            <div className="container">
                <div className="section-header">
                    <h2>Data Science Roadmap</h2>
                    <p>Your step-by-step guide to becoming a successful Data Scientist.</p>
                </div>

                <div className="roadmap-visual" ref={sectionRef}>
                    <svg className="roadmap-svg roadmap-svg-desktop" viewBox="0 0 1000 800" preserveAspectRatio="none">
                        <g className="scenery">
                           <path className="scenery-mountain" d="M 700 350 L 780 200 L 860 350 Z" style={{'--delay': '0.1s'} as React.CSSProperties} />
                           <path className="scenery-mountain" d="M 750 350 L 830 180 L 910 350 Z" style={{'--delay': '0.2s'} as React.CSSProperties}/>
                           <path className="scenery-mountain" d="M 100 750 L 180 600 L 260 750 Z" style={{'--delay': '0.4s'} as React.CSSProperties}/>
                           <path className="scenery-mountain" d="M 150 750 L 230 580 L 310 750 Z" style={{'--delay': '0.5s'} as React.CSSProperties}/>

                           <path className="scenery-cloud" d="M 250 150 a 30 30 0 0 1 0 60 H 350 a 30 30 0 0 1 0 -60 a 40 40 0 0 1 -50 -30 a 40 40 0 0 1 -50 30 Z" style={{'--delay': '0.6s'} as React.CSSProperties}/>
                           <path className="scenery-cloud" d="M 800 50 a 20 20 0 0 1 0 40 H 870 a 20 20 0 0 1 0 -40 a 30 30 0 0 1 -35 -20 a 30 30 0 0 1 -35 20 Z" style={{'--delay': '0.3s'} as React.CSSProperties}/>
                           <path className="scenery-cloud" d="M 500 650 a 25 25 0 0 1 0 50 H 580 a 25 25 0 0 1 0 -50 a 35 35 0 0 1 -40 -25 a 35 35 0 0 1 -40 25 Z" style={{'--delay': '0.7s'} as React.CSSProperties}/>

                           <g className="scenery-tree" transform="translate(100, 200) scale(1.2)" style={{'--delay': '0.8s'} as React.CSSProperties}>
                               <rect x="-5" y="30" width="10" height="20" />
                               <circle cx="0" cy="15" r="20" />
                           </g>
                           <g className="scenery-tree" transform="translate(200, 450) scale(1)" style={{'--delay': '0.9s'} as React.CSSProperties}>
                                <rect x="-5" y="30" width="10" height="20" />
                                <circle cx="0" cy="15" r="20" />
                           </g>
                           <g className="scenery-tree" transform="translate(900, 300) scale(1.5)" style={{'--delay': '1s'} as React.CSSProperties}>
                                <rect x="-5" y="30" width="10" height="20" />
                                <circle cx="0" cy="15" r="20" />
                           </g>
                            <g className="scenery-tree" transform="translate(650, 750) scale(1.1)" style={{'--delay': '1.1s'} as React.CSSProperties}>
                                <rect x="-5" y="30" width="10" height="20" />
                                <circle cx="0" cy="15" r="20" />
                           </g>
                       </g>
                        <path className="roadmap-path-draw" d={snakePath} />
                        <path className="roadmap-path-draw-dashed" d={snakePath} />
                    </svg>
                    <svg className="roadmap-svg roadmap-svg-mobile" viewBox="0 0 100 1600" preserveAspectRatio="none">
                        <g className="scenery">
                            <path className="scenery-cloud" d="M 20 100 a 15 15 0 0 1 0 30 H 60 a 15 15 0 0 1 0 -30 a 20 20 0 0 1 -20 -15 a 20 20 0 0 1 -20 15 Z" style={{'--delay': '0.5s'} as React.CSSProperties} />
                            <g className="scenery-tree" transform="translate(80, 500) scale(1)" style={{'--delay': '0.8s'} as React.CSSProperties}>
                                <rect x="-5" y="30" width="10" height="20" />
                                <circle cx="0" cy="15" r="20" />
                            </g>
                            <g className="scenery-tree" transform="translate(20, 1100) scale(0.8)" style={{'--delay': '1s'} as React.CSSProperties}>
                                <rect x="-5" y="30" width="10" height="20" />
                                <circle cx="0" cy="15" r="20" />
                            </g>
                        </g>
                        <path className="roadmap-path-draw" d={mobilePath} />
                        <path className="roadmap-path-draw-dashed" d={mobilePath} />
                    </svg>

                    <div className="roadmap-milestones-desktop">
                        {roadmapData.map((item, index) => (
                            <div
                                key={index}
                                className={`roadmap-milestone ${desktopPositions[index].top > '40%' ? 'align-top' : ''}`}
                                style={{
                                    '--delay': `${index * 0.15 + 1}s`,
                                    '--pin-color': pinColors[index],
                                    top: desktopPositions[index].top,
                                    left: desktopPositions[index].left,
                                } as React.CSSProperties}
                            >
                                <div className="roadmap-pin"></div>
                                <div className="roadmap-info">
                                    <div className="month">{item.month}</div>
                                    <div className="title">{item.title}</div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="roadmap-milestones-mobile">
                        {roadmapData.map((item, index) => (
                            <div
                                key={`mobile-${index}`}
                                className={`roadmap-milestone ${index % 2 !== 0 ? 'align-top' : ''}`}
                                style={{
                                    '--delay': `${index * 0.15 + 1}s`,
                                    '--pin-color': pinColors[index],
                                    top: mobilePositions[index].top,
                                    left: mobilePositions[index].left,
                                    transform: `translateX(${index % 2 === 0 ? '-10px' : '-20px'})`
                                } as React.CSSProperties}
                            >
                                <div className="roadmap-pin"></div>
                                <div className="roadmap-info">
                                    <div className="month">{item.month}</div>
                                    <div className="title">{item.title}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('carrier-roadmap'); }} className="btn-generate-roadmap">
                    Generate my own roadmap
                </a>
            </div>
        </section>
    );
}

export const HomePage = ({ courses, loading, error, handleNavClick, onLikeCourse, currentUser, promptLogin }) => (
    <>
        <section className="hero">
            <div className="container">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1>Learning skills for a better career</h1>
                        <p>We believe everyone has the capacity to be creative. Get started with our free trial and join a community of passionate learners today.</p>
                        <form className="hero-form">
                            <input type="email" placeholder="Enter your email" />
                            <button type="submit">Start Free Trial</button>
                        </form>
                        <div className="hero-stats">
                            <div className="stat-item">
                                <h3>12k+</h3>
                                <p>Fresh Graduates</p>
                            </div>
                            <div className="stat-item">
                                <h3>9+</h3>
                                <p>Years of Experience</p>
                            </div>
                            <div className="stat-item">
                                <h3>358+</h3>
                                <p>Excellence Awards</p>
                            </div>
                            <div className="stat-item">
                                <h3>47+</h3>
                                <p>Brand Partners</p>
                            </div>
                        </div>
                    </div>
                    <div className="hero-image">
                        <div className="hero-image-wrapper">
                            <img src="https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI1LTA2L3Jhd3BpeGVsb2ZmaWNlN19waG90b19vZl95b3VuZ19pbmRpYW5fYm95X2hvbGRpbmdfc3R1ZGVudF9iYWNrcF9mMTgzNzMwYy00ZDdmLTRlNzUtOGE1MC1iZmFkNTI5MjMyYjFfMS5qcGc.jpg" alt="Happy student" />
                        </div>
                        <div className="job-tag job-tag-1">100+ platforms</div>
                        <div className="job-tag job-tag-2">1000+ courses</div>
                    </div>
                </div>
            </div>
        </section>

        <section className="popular-courses">
            <div className="container">
                <div className="section-header">
                    <h2>Offering Courses</h2>
                </div>
                {loading && <p className="status-message">Loading courses...</p>}
                {error && <p className="status-message error">{error}</p>}
                {!loading && !error && (
                    <div className="course-grid">
                        {courses.slice(0, 3).map((course, index) => (
                            <CourseCard key={course.id || index} course={course} onLike={onLikeCourse} currentUser={currentUser} promptLogin={promptLogin} />
                        ))}
                    </div>
                )}
                {!loading && courses.length === 0 && !error && <p className="status-message">No courses available at the moment.</p>}
                <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('courses'); }} className="view-all-btn">View All</a>
            </div>
        </section>

        <SkillsShowcase />
        
        <LearnAnythingSection />

        <DataScienceRoadmap handleNavClick={handleNavClick} />

        <FeaturesSection handleNavClick={handleNavClick} />

        <BlogsSection />

        <section className="testimonials">
            <div className="container">
                <div className="section-header">
                    <h2>Testimonials</h2>
                </div>
                <div className="testimonial-grid">
                    {testimonialsData.map((testimonial, index) => (
                        <div className="testimonial-card" key={index}>
                            <div className="testimonial-header">
                                <img src={testimonial.image} alt={testimonial.name} />
                                <div className="testimonial-author">
                                    <h4>{testimonial.name}</h4>
                                    <div className="stars">
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                        <i className="fas fa-star"></i>
                                    </div>
                                </div>
                            </div>
                            <p>"{testimonial.text}"</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    </>
);