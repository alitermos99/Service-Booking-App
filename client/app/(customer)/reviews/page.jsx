import CustomerHeader from '@/app/components/customer/CustomerHeader'
import Section from '@/app/components/layouts/Section'
import StatsCard from '@/app/components/ui/StatsCard'
import React from 'react'

const CustomerReviewsPage = () => {
    return (
        <>
            <CustomerHeader />

            <Section>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-tx">My Reviews</h1>
                        <p className="text-muted text-sm mt-0.5">Share your experience and help others choose better</p>
                    </div>

                    <div className="flex items-center gap-3">
                        <StatsCard 
                            stat="4.8"
                            subtitle="Avg Rating"
                            cardStyle="glass2 rounded-xl px-4 py-2 text-center"
                            statStyle="text-xl font-bold gradient-text"
                            spacing="mt-0"
                        />

                        <StatsCard 
                            stat="6"
                            subtitle="Reviews"
                            cardStyle="glass2 rounded-xl px-4 py-2 text-center"
                            statStyle="text-xl font-bold text-tx"
                            spacing="mt-0"
                        />

                        <StatsCard 
                            stat="2"
                            subtitle="Pending"
                            cardStyle="glass2 rounded-xl px-4 py-2 text-center"
                            statStyle="text-xl font-bold text-fair"
                            spacing="mt-0"
                        />
                    </div>
                </div>
            </Section>
        </>
    )
}

export default CustomerReviewsPage