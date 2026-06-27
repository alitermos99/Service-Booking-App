import React from 'react'
import CustomerReviewsPendingCard from './CustomerReviewsPendingCard'
import { useGetPendingReviews } from '@/app/features/review/hooks/useGetPendingReviews'
import LoadingOverlay from '../../ui/LoadingOverlay';

const CustomerReviewsPendingSection = () => {
    const { data: pendingReviews, isPending } = useGetPendingReviews();

    return (
        <>
            { isPending && <LoadingOverlay /> }

            <div className="mb-10">
                <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-fair"></span>
                    Awaiting Your Review
                </h2>

                {
                    !!pendingReviews?.length &&
                    (
                        <div className="grid gap-4 sm:grid-cols-2">
                            {
                                pendingReviews?.map(pending => (
                                    <CustomerReviewsPendingCard key={pending._id} 
                                        title={pending.service_id?.title}
                                        startTime={pending.startTime}
                                        icon={pending.service_id?.icon}
                                        iconBg={pending.service_id?.iconBg}
                                        providerName={pending.admin_id?.name}
                                        serviceId={pending.service_id?._id}
                                        appointmentId={pending._id}
                                    />
                                ))
                            }
                        </div>
                    )
                }

                { (!pendingReviews || !pendingReviews.length) && <p className="text-muted">No upcoming appointments</p> }
            </div>
        </>
    )
}

export default CustomerReviewsPendingSection