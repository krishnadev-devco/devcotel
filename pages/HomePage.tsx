
import React, { useRef, useEffect, useState } from 'react';
import { CourseCard } from '../components/CourseCard';

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
           { id: 5, image: 'https://img.freepik.com/free-vector/thoughtful-woman-with-laptop-planning-schedule-week_74855-20519.jpg?w=1060&t=st=1722256424~exp=1722257024~hmac=50e487198e723528f804fc64e62244e830e79391e0a29ef99335c05ab5976b97', title: 'Prompt Engineering for ChatGPT  2025 Tutorial', instructor: 'Dr. Jules White Top Instructor powered by [COURSERA].How to apply prompt engineering to effectively work with large language models, like ChatGPT How to use prompt patterns to tap into powerful capabilities within large language models.', rating: 4.8, reviews: 7160, price: 'devcotel recomented', old_price: 'this is not an affilation', bestseller: true, link: 'https://www.coursera.org/learn/prompt-engineering?utm_medium=sem&utm_source=gg&utm_campaign=b2c_india_x_coursera_ftcof_courseraplus_cx_dr_bau_gg_sem_bd-ex_in_all_m_hyb_24-05_x&campaignid=21327429274&adgroupid=162815312357&device=c&keyword=coursera&matchtype=e&network=g&devicemodel=&creativeid=700607287634&assetgroupid=&targetid=kwd-36262515261&extensionid=&placement=&gad_source=1&gad_campaignid=21327429274&gbraid=0AAAAADdKX6Y7ZtIr7vsRs0oj7m9hAQSYl&gclid=CjwKCAiAwqHIBhAEEiwAx9cTeemR1ZwxOa-7IJqD-MMae5SEl9Hzo-bA3tV8Q6HpYAgcY4Zzrw7MchoCF-EQAvD_BwE' },
           { id: 6, image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=2070&auto=format&fit=crop', title: 'AI-Powered Business Analysis: Excel, KPIs & GenAI Specialization', instructor: 'Kelley O Connell [COURSERA]Apply GenAI tools like ChatGPT to automate business analysis tasks and generate faster insights across multiple industries.Create impactful data visualizations and reports using AI-powered tools while maintaining ethical AI practices.', rating: 4.5, reviews: 10, price: 'Devcotel recomented', old_price: 'this is not an affilation', bestseller: true, link: 'https://www.coursera.org/specializations/ai-powered-business-analysis-excel-kpis-and-genai' },

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
    link?: string;
}

const SkillCourseCard: React.FC<{ course: SkillCourse }> = ({ course }) => (
    <a href={course.link || "https://krishnadev-devco.github.io/form-test/"} target="_blank" rel="noopener noreferrer" className="skill-course-card">
        <div className="skill-card-image">
            <img src={course.image} alt={course.title} />
        </div>
        <div className="skill-card-content">
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
        </div>
        <div className="know-more-link">
            Know More <i className="fas fa-arrow-right"></i>
        </div>
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
                    <h2><span>Hello!</span> i am here to help you #discover your perfect course..</h2>
                    <p>Build a deep, solid Networks with devcotel community and more.</p>
                    <a href="https://devcotel-chatbot.vercel.app/"  className="btn-primary">LET'S FIND TOGETHER</a>
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

const CourseInsightsSection = () => {
    const insights = [
        {
            title: "Artificial Intelligence",
            score: 98,
            icon: "fas fa-brain",
            description: "Simulation of human intelligence processes by machines, especially computer systems.",
            future: "Projected to contribute $15.7 trillion to the global economy by 2030. Key for automation."
        },
        {
            title: "Machine Learning",
            score: 96,
            icon: "fas fa-robot",
            description: "A subset of AI that provides systems the ability to automatically learn and improve from experience.",
            future: "Essential for predictive analytics in finance, healthcare, and retail. High career growth potential."
        },
        {
            title: "Data Science",
            score: 95,
            icon: "fas fa-chart-pie",
            description: "Extracting knowledge and insights from noisy, structured and unstructured data.",
            future: "Data is the new oil. Companies rely on data scientists to interpret data for strategic decisions."
        },
        {
            title: "Cyber Security",
            score: 99,
            icon: "fas fa-shield-alt",
            description: "The practice of defending computers, servers, mobile devices, electronic systems, and networks.",
            future: "With increasing cyber threats, this is a zero-unemployment field with massive demand."
        }
    ];

    return (
        <section className="course-insights-section">
            <div className="container">
                <div className="section-header">
                    <h2>Course Career Impact Map</h2>
                    <p>Understand the future relevance, growth potential, and market demand for top technology domains (Rated out of 100).</p>
                </div>

                <div className="insights-grid">
                    {insights.map((item, index) => (
                        <div className="insight-card" key={index}>
                            <div className="insight-header">
                                <div className="insight-icon"><i className={item.icon}></i></div>
                                <div className="insight-score-box">
                                    <span className="score-val">{item.score}</span>
                                    <span className="score-label">/100 Impact</span>
                                </div>
                            </div>
                            <h3>{item.title}</h3>
                            <p className="insight-desc">{item.description}</p>
                            <div className="insight-future">
                                <strong><i className="fas fa-chart-line"></i> Future Scope:</strong>
                                <p>{item.future}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="our-approach-section">
                    <div className="approach-block">
                        <div className="approach-icon"><i className="fas fa-balance-scale"></i></div>
                        <div className="approach-content">
                            <h3>Unbiased Recommendation System</h3>
                            <p>We believe in transparency. Our recommendations are purely based on course quality, curriculum relevance, and verified student reviews. We do not promote courses based on commission or marketing budgets.</p>
                        </div>
                    </div>
                    <div className="approach-block">
                        <div className="approach-icon"><i className="fas fa-users"></i></div>
                        <div className="approach-content">
                            <h3>Community Group Discounts</h3>
                            <p>Education should be affordable. We group learners with similar interests to negotiate exclusive bulk discounts with premium course providers, making high-quality education accessible to everyone.</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const HowItWorksSection = () => (
    <section className="how-it-works-section">
        <div className="container">
            <div className="section-header">
                <h2>Our Plan for Your Success</h2>
                <p>We simplify your learning journey with AI and community power.</p>
            </div>
            <div className="steps-container">
                <div className="step-card">
                    <div className="step-number">1</div>
                    <div className="step-icon"><i className="fas fa-search-location"></i></div>
                    <h3>Find and Select</h3>
                    <p>Choose a course from any of our platforms as per user request and recommended by the AI.</p>
                </div>
                <div className="step-connector"><i className="fas fa-chevron-right"></i></div>
                <div className="step-card">
                    <div className="step-number">2</div>
                    <div className="step-icon"><i className="fas fa-user-friends"></i></div>
                    <h3>Group Up</h3>
                    <p>Devcotel automatically adds you to a group of interested buyers.</p>
                </div>
                <div className="step-connector"><i className="fas fa-chevron-right"></i></div>
                <div className="step-card">
                    <div className="step-number">3</div>
                    <div className="step-icon"><i className="fas fa-tags"></i></div>
                    <h3>Enroll and Save</h3>
                    <p>Once the group hits the minimum size, everyone gets the negotiated discounts and enrolls!</p>
                </div>
            </div>
        </div>
    </section>
);

export const HomePage = ({ courses, loading, error, handleNavClick, onLikeCourse, currentUser, promptLogin }) => (
    <>
        <section className="hero">
            <div className="container">
                <div className="hero-content">
                    <div className="hero-text">
                        <h1>WE keep your #carrier signal's clean.</h1>
                        <p>THE SMARTEST LEARNING ECOSYSTEM CUTS THROUGH THE NOICE . OUR TEAM AND CORE AI IS RADICALLY BIASED TOWARDS YOUR CORE NEEDS .    <b>| DATASCIENCE | MACHINE LEARNING | CYBER SECURITY | ARTIFICAL INTELLIGENCE | CLOUD COMPUTING |</b></p>
                        <form className="hero-form">
                            <input type="email" placeholder="Enter your email" />
                            <button type="submit">Start Free Trial</button>
                        </form>
                        <div className="hero-stats">
                            <div className="stat-item">
                                <h3>118+</h3>
                                <p>Parllel enroll clicks</p>
                            </div>
                            <div className="stat-item">
                                <h3>2+</h3>
                                <p>Months of sucess Experience</p>
                            </div>
                            <div className="stat-item">
                                <h3>37+</h3>
                                <p>sucess suggestions</p>
                            </div>
                            <div className="stat-item">
                                <h3>18+</h3>
                                <p>Connections</p>
                            </div>
                        </div>
                    </div>
                    <div className="hero-image">
                        <div className="hero-image-wrapper">
                            <img src="https://t3.ftcdn.net/jpg/04/11/54/82/360_F_411548225_ocrNLceeFh0ql7sOaL2wznxVO8GvLZi0.jpg" alt="Happy student" />
                        </div>
                        <div className="job-tag job-tag-1">18+ platforms</div>
                        <div className="job-tag job-tag-2">29+ courses</div>
                    </div>
                </div>
            </div>
        </section>

        <HowItWorksSection />

        <section className="popular-courses">
            <div className="container">
                <div className="section-header">
                    <h2>Offering Courses</h2>
                </div>
                {loading && <p className="status-message">Loading courses...</p>}
                {error && <p className="status-message error">{error}</p>}
                {!loading && !error && (
                    <>
                        {courses.length > 0 ? (
                            <div className="course-grid">
                                {courses.slice(0, 3).map((course, index) => (
                                    <CourseCard key={course.id || index} course={course} onLike={onLikeCourse} currentUser={currentUser} promptLogin={promptLogin} />
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <div className="empty-state-icon">
                                    <i className="fas fa-graduation-cap"></i>
                                </div>
                                <h3>No Courses Available</h3>
                                <p>It looks like there are no courses featured right now. Check out our full catalog to see everything we offer.</p>
                                <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('courses'); }} className="btn-empty-cta">
                                    Explore Catalog
                                </a>
                            </div>
                        )}
                    </>
                )}
                <a href="#" onClick={(e) => { e.preventDefault(); handleNavClick('courses'); }} className="view-all-btn">View All</a>
            </div>
        </section>

        <SkillsShowcase />
        
        <LearnAnythingSection />

        <CourseInsightsSection />

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
