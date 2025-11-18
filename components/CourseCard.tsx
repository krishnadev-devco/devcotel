import React from 'react';
import { User } from '../types';

const typeDisplayMap = {
    course: 'Course',
    bootcamp: 'Bootcamp',
    webinar: 'Webinar',
    youtube: 'YouTube'
};

// FIX: Define interfaces for props and type the component with React.FC. This resolves the TypeScript error related to the 'key' prop by correctly typing the component, its props, and event handlers.
interface Course {
    id: number;
    image: string;
    title: string;
    type?: string;
    category: string;
    instructor: string;
    rating: number | string;
    students: number | string;
    price: string;
    likes?: number;
    community_link?: string;
    enroll_link?: string;
}

interface CourseCardProps {
    course: Course;
    onLike: (courseId: number) => void;
    currentUser: User | null;
    promptLogin: () => void;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course, onLike, currentUser, promptLogin }) => {
    
    // Derive `isLiked` from the single source of truth (localStorage + currentUser) on each render.
    // This is more robust than using a separate `useState`.
    const isLiked = (() => {
        if (!currentUser) {
            return false;
        }
        const userLikedCoursesKey = `likedCourses_${currentUser.id}`;
        const likedCourses = JSON.parse(localStorage.getItem(userLikedCoursesKey) || '[]');
        return likedCourses.includes(course.id);
    })();

    const handleLikeClick = () => {
        // The guard check is the first and most important step.
        if (!currentUser) {
            promptLogin();
            return;
        }
        // Prevent multiple clicks and call the parent handler.
        if (!isLiked) {
            onLike(course.id);
        }
    };
    
    const handleEnrollClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // Prevent navigation for logged-out users and prompt them to log in.
        if (!currentUser) {
            e.preventDefault();
            promptLogin();
        }
    };

    return (
        <div className="course-card">
            <div className="course-card-image-wrapper">
                 <img src={course.image} alt={course.title} />
                 {course.type && <span className={`resource-type-tag type-${course.type}`}>{typeDisplayMap[course.type] || 'Resource'}</span>}
            </div>
            <div className="course-info">
                <div className="category">{course.category}</div>
                <h3>{course.title}</h3>
                <p className="course-instructor">{course.instructor}</p>
                <div className="course-meta">
                    <span className="rating"><i className="fas fa-star"></i> {course.rating}</span>
                    <span className="students"><i className="fas fa-user-friends"></i> {course.students}</span>
                    <span className="price">{course.price}</span>
                </div>
                <div className="course-socials">
                    <button 
                        className={`social-btn ${isLiked ? 'liked' : ''}`} 
                        onClick={handleLikeClick} 
                        aria-label="Like this course"
                        disabled={isLiked}
                    >
                        <i className={isLiked ? "fas fa-heart" : "far fa-heart"}></i>
                        <span>{course.likes || 0}</span>
                    </button>
                    <button className="social-btn" aria-label="Comment on this course">
                        <i className="far fa-comment"></i>
                    </button>
                    <button className="social-btn" aria-label="Share this course">
                        <i className="fas fa-share-alt"></i>
                    </button>
                </div>
                <div className="course-actions">
                    <a href={course.community_link || '#'} className="btn btn-join-community" target="_blank" rel="noopener noreferrer">Join Community</a>
                    <a 
                        href={course.enroll_link || '#'} 
                        className="btn btn-enroll" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        onClick={handleEnrollClick}
                    >
                        Enroll
                    </a>
                </div>
            </div>
        </div>
    );
};
