
import React, { useState } from 'react';
import { ReviewCard } from '../components/ReviewCard';
import { User, Review } from '../types'; 

interface ReviewsPageProps {
    currentUser: User | null;
    promptLogin: () => void;
    reviews: Review[];
    onPostReview: (reviewData: { platform: string; reviewText: string; }) => Promise<{ error?: any }>;
}

export const ReviewsPage: React.FC<ReviewsPageProps> = ({ currentUser, promptLogin, reviews, onPostReview }) => {
    const [formData, setFormData] = useState({ platform: '', reviewText: '' });
    const [error, setError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentUser) {
            promptLogin();
            return;
        }
        if (!formData.platform || !formData.reviewText) {
            setError('All fields are required.');
            return;
        }
        setError('');
        
        const { error: postError } = await onPostReview({
            platform: formData.platform,
            reviewText: formData.reviewText,
        });
        
        if (postError) {
            setError(postError.message);
        } else {
            setFormData({ platform: '', reviewText: '' }); // Clear form on success
        }
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
                                        <p>You are posting as: <strong>{currentUser.full_name || currentUser.email}</strong></p>
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
                                    <ReviewCard key={`${review.handle}-${review.date}`} review={review} isLast={index === reviews.length - 1}/>
                                ))
                             ) : (
                                <div className="empty-state" style={{ border: 'none', boxShadow: 'none', padding: '40px 20px' }}>
                                    <div className="empty-state-icon" style={{ width: '60px', height: '60px', fontSize: '1.8rem' }}>
                                        <i className="far fa-comments"></i>
                                    </div>
                                    <h3>No reviews yet</h3>
                                    <p>Be the first to share your learning experience with the community. Your feedback helps others!</p>
                                </div>
                             )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
