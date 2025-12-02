import React from 'react';

export interface Review {
    name: string;
    handle: string;
    platform: string;
    reviewText: string;
    date: string;
}

interface ReviewCardProps {
    review: Review;
    isLast: boolean;
}

const timeSince = (dateString: string) => {
    const date = new Date(dateString);
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return Math.floor(interval) + "y";
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + "mo";
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + "d";
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + "h";
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + "m";
    return Math.floor(seconds) + "s";
}


export const ReviewCard: React.FC<ReviewCardProps> = ({ review, isLast }) => (
    <div className="review-card-wrapper">
        <div className="review-card">
            <div className="review-avatar">
                <div className="review-avatar-img"></div>
                {!isLast && <div className="review-connecting-line"></div>}
            </div>
            <div className="review-content">
                <div className="review-header">
                    <span className="review-name">{review.name}</span>
                    <span className="review-handle">@{review.handle}</span>
                    <span>·</span>
                    <span>{timeSince(review.date)}</span>
                </div>
                <div className="review-body">
                    <p>
                        <strong>Platform/Course:</strong> {review.platform}
                    </p>
                    <p>{review.reviewText}</p>
                </div>
                <div className="review-actions">
                    <div className="review-action"><i className="far fa-comment icon"></i> <span>0</span></div>
                    <div className="review-action"><i className="fas fa-retweet icon"></i> <span>0</span></div>
                    <div className="review-action"><i className="far fa-heart icon"></i> <span>0</span></div>
                    <div className="review-action"><i className="fas fa-upload icon"></i></div>
                </div>
            </div>
        </div>
    </div>
);
