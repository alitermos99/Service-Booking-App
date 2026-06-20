import React from 'react'
import CustomerReviewsPastReviewCard from './CustomerReviewsPastReviewCard'

const CustomerReviewsPastReviews = () => {
    return (
        <div>
            <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full text-good"></span>
                Your Reviews
            </h2>

            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                <CustomerReviewsPastReviewCard />
            </div>
        </div>
    )
}

export default CustomerReviewsPastReviews