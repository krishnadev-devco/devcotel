
import React, { useState } from 'react';
import { CourseCard } from '../components/CourseCard';

const categories = ['All', 'Courses', 'Bootcamps', 'Webinars', 'YouTube Videos'];

export const AllCoursesPage = ({ courses, loading, error, onLikeCourse, currentUser, promptLogin }) => {
    const [activeCategory, setActiveCategory] = useState('All');

    const filteredCourses = courses.filter(course => {
        if (activeCategory === 'All') return true;
        if (activeCategory === 'Courses') return course.type === 'course';
        if (activeCategory === 'Bootcamps') return course.type === 'bootcamp';
        if (activeCategory === 'Webinars') return course.type === 'webinar';
        if (activeCategory === 'YouTube Videos') return course.type === 'youtube';
        return false;
    });

    return (
        <div className="all-courses-page">
            <div className="container">
                <div className="all-courses-header">
                    <h1>Explore Our Full Resource Catalog</h1>
                    <p>Find the perfect course, bootcamp, or resource to kickstart your journey or take your skills to the next level.</p>
                </div>

                <div className="course-categories-tabs">
                    {categories.map(category => (
                        <button
                            key={category}
                            className={`category-tab ${activeCategory === category ? 'active' : ''}`}
                            onClick={() => setActiveCategory(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>

                {loading && <p className="status-message">Loading resources...</p>}
                {error && <p className="status-message error">{error}</p>}
                {!loading && !error && (
                    <>
                        {filteredCourses.length > 0 ? (
                            <div className="course-grid">
                                {filteredCourses.map((course, index) => (
                                    <CourseCard key={course.id || index} course={course} onLike={onLikeCourse} currentUser={currentUser} promptLogin={promptLogin} />
                                ))}
                            </div>
                        ) : (
                            <div className="empty-state">
                                <div className="empty-state-icon">
                                    <i className="fas fa-search"></i>
                                </div>
                                <h3>No resources found</h3>
                                <p>We couldn't find any {activeCategory !== 'All' ? activeCategory.toLowerCase() : 'resources'} matching your criteria. Try exploring other categories.</p>
                                {activeCategory !== 'All' && (
                                    <button className="btn-empty-cta" onClick={() => setActiveCategory('All')}>
                                        View All Resources
                                    </button>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
