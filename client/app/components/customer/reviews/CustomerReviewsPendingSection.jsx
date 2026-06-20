import React from 'react'
import CustomerReviewsPendingCard from './CustomerReviewsPendingCard'

const CustomerReviewsPendingSection = () => {
    return (
        <div className="mb-10">
            <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-fair"></span>
                Awaiting Your Review
            </h2>

            <div className="grid gap-4 sm:grid-cols-2">
                <CustomerReviewsPendingCard />
                <CustomerReviewsPendingCard />
            </div>
        </div>
    )
}

export default CustomerReviewsPendingSection