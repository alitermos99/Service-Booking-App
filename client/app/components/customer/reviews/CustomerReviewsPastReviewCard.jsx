'use client'

import React, { useState } from 'react'
import Button from '../../ui/Button'
import CustomerReviewsEditModal from './CustomerReviewsEditModal'

const CustomerReviewsPastReviewCard = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="review-card p-5">
                <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[rgba(52,211,153,0.15)]">
                        <svg className="w-5 h-5 text-good" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 
                                3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                            />
                        </svg>
                    </div>

                    <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-tx text-sm truncate">Business Consultation</h3>
                        <p className="text-xs text-muted">ProAdvice Consulting</p>
                    </div>

                    <span className="badge badge-confirmed shrink-0">Reviewed</span>
                </div>

                <div className="flex items-center gap-0.5 mb-3">
                    <span className="text-fair">★★★★★</span>
                    <span className="text-xs text-muted ml-2">5.0</span>
                </div>

                <p className="text-sm text-muted leading-relaxed mb-4">
                    Dr. Park was incredibly insightful. She helped clarify my business strategy within the first 20 minutes. 
                    Highly recommend for any startup founder!
                </p>

                <div className="rounded-xl p-3 bg-[rgba(108,99,255,0.08)] border border-solid border-[rgba(108,99,255,0.15)]">
                    <div className="flex items-center gap-2 mb-1.5">
                        <div className="w-5 h-5 rounded-full btn-primary flex items-center justify-center">
                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M12 5l7 7-7 7"/>
                            </svg>
                        </div>

                        <span className="text-xs font-medium text-accent-soft">Business Reply</span>
                    </div>

                    <p className="text-xs text-muted">
                        Thank you so much for the kind words! It was a pleasure working with you. 
                        Looking forward to your next session!
                    </p>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-solid border-[rgba(255,255,255,0.07)]">
                    <span className="text-xs text-muted">Apr 10, 2025</span>
                    <Button className="text-xs px-3 py-1 rounded-lg bg-[rgba(255,255,255,0.05)] text-muted"
                        label="Edit" 
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>
            </div>

            { isModalOpen && <CustomerReviewsEditModal setIsModalOpen={setIsModalOpen} /> }
        </>
    )
}

export default CustomerReviewsPastReviewCard