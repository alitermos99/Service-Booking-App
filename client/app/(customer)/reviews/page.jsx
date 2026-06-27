'use client'

import React from 'react';
import StatsCard from '@/app/components/ui/StatsCard';
import Section from '@/app/components/layouts/Section';
import CustomerHeader from '@/app/components/customer/CustomerHeader';
import { useGetReviewsInfo } from '@/app/features/review/hooks/useGetReviewsInfo';
import CustomerReviewsPastReviews from '@/app/components/customer/reviews/CustomerReviewsPastReviews';
import CustomerReviewsPendingSection from '@/app/components/customer/reviews/CustomerReviewsPendingSection';
import LoadingOverlay from '@/app/components/ui/LoadingOverlay';

const CustomerReviewsPage = () => {
    const { data: reviewsInfo, isPending } = useGetReviewsInfo();

    return (
        <>
            { isPending && <LoadingOverlay /> }

            <CustomerHeader />

            <Section>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-tx">My Reviews</h1>
                        <p className="text-muted text-sm mt-0.5">Share your experience and help others choose better</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <StatsCard 
                            stat={reviewsInfo?.avgRating}
                            subtitle="Avg Rating"
                            cardStyle="glass2 rounded-xl px-4 py-2 text-center"
                            statStyle="text-xl font-bold gradient-text"
                            spacing="mt-0"
                        />

                        <StatsCard 
                            stat={reviewsInfo?.totalReviews}
                            subtitle="Reviews"
                            cardStyle="glass2 rounded-xl px-4 py-2 text-center"
                            statStyle="text-xl font-bold text-tx"
                            spacing="mt-0"
                        />

                        <StatsCard 
                            stat={reviewsInfo?.pendingReviews}
                            subtitle="Pending"
                            cardStyle="glass2 rounded-xl px-4 py-2 text-center"
                            statStyle="text-xl font-bold text-fair"
                            spacing="mt-0"
                        />
                    </div>
                </div>

                <CustomerReviewsPendingSection />
                <CustomerReviewsPastReviews />
            </Section>
        </>
    )
}

export default CustomerReviewsPage