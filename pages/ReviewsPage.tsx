import React, { useState, useEffect } from 'react';
import { ReviewCard, Review } from '../components/ReviewCard';
import { User } from '../types'; 

interface ReviewsPageProps {
    currentUser: User | null;
    promptLogin: () => void;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ currentUser, promptLogin }) => {
    const [reviews, setReviews] = useState<Review[]>([]);
    const [formData, setFormData] = useState({ platform: '', reviewText: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        try {
            const storedReviews = JSON.parse(localStorage.getItem('courseReviews') || '[]');
            setReviews(storedReviews);
        } catch (e) {
            console.error("Failed to parse reviews from localStorage", e);
            setReviews([]);
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) {
            setError('You must be logged in to post a review.');
            return;
        }
        if (!formData.platform || !formData.reviewText) {
            setError('All fields are required.');
            return;
        }
        setError('');
        const newReview: Review = {
            name: currentUser.full_name || 'Anonymous',
            handle: currentUser.username || currentUser.email.split('@')[0],
            platform: formData.platform,
            reviewText: formData.reviewText,
            date: new Date().toISOString()
        };
        const updatedReviews = [newReview, ...reviews];
        setReviews(updatedReviews);
        localStorage.setItem('courseReviews', JSON.stringify(updatedReviews));
        setFormData({ platform: '', reviewText: '' });
    };

    return (
        <div className="reviews-page">
            <div className="container">
                <div className="all-courses-header">
                    <h1>Course & Platform Reviews</h1>
                    <p>See what others are saying and share your own experiences.</p>
                </div>
                <div className="reviews-page-container">
                    <div className="review-form-section">
                        <form onSubmit={handleSubmit} className="review-form">
                            <h3>Write a Review</h3>
                             {currentUser ? (
                                <>
                                    <div className="logged-in-prompt">
                                        <p>You are posting as: <strong>{currentUser.full_name}</strong> (@{currentUser.username})</p>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="platform">Platform / Course</label>
                                        <input type="text" id="platform" name="platform" value={formData.platform} onChange={handleChange} placeholder="e.g., Coursera - Python for Everybody" required />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="reviewText">Your Review</label>
                                        <textarea id="reviewText" name="reviewText" rows={5} value={formData.reviewText} onChange={handleChange} placeholder="Share your thoughts..." required></textarea>
                                    </div>
                                    {error && <p className="form-error">{error}</p>}
                                    <button type="submit" className="btn-submit">Post Review</button>
                                </>
                            ) : (
                                 <div className="logged-in-prompt" style={{textAlign: 'center'}}>
                                    <p style={{marginBottom: '1rem'}}>You must be logged in to share your review with the community.</p>
                                    <button type="button" onClick={promptLogin} className="btn-primary">Login to Post a Review</button>
                                </div>
                            )}
                        </form>
                    </div>
                    <div className="review-feed-section">
                         <div className="review-feed">
                             {reviews.length > 0 ? (
                                reviews.map((review, index) => (
                                    <ReviewCard key={index} review={review} isLast={index === reviews.length - 1}/>
                                ))
                             ) : (
                                <p style={{textAlign: 'center', padding: '2rem'}}>Be the first to write a review!</p>
                             )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
