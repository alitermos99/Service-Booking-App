'use client'

import React, { useState } from 'react'
import Button from '../../ui/Button'
import CustomerReviewsReviewModal from './CustomerReviewsReviewModal'
import { formatDate } from '@/app/utils/dateUtils'

const DEFAULT_ICON_BG = 'linear-gradient(135deg,rgba(108,99,255,0.2),rgba(167,139,250,0.2))';

const CustomerReviewsPendingCard = ({ title, providerName, startTime, icon, iconBg, serviceId, appointmentId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="pending-card p-5">
                <div className="flex items-start gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: iconBg ?? DEFAULT_ICON_BG }}
                    >
                        { icon }
                    </div>

                    <div className="flex-1">
                        <div className="flex items-start justify-between gap-2">
                            <div>
                                <h3 className="font-semibold text-tx">{ title }</h3>
                                <p className="text-xs text-muted">{ providerName } · { formatDate(startTime) }</p>
                            </div>

                            <span className="badge badge-pending shrink-0">Review Needed</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center justify-between">
                    <p className="text-xs text-muted">How was your experience?</p>

                    <Button 
                        className="btn-primary text-xs px-4 py-2 rounded-xl text-white font-medium flex items-center gap-1.5"
                        label={
                            <>
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 
                                        2.828L11.828 15H9v-2.828l8.586-8.586z"
                                    />
                                </svg>
                                Write Review
                            </>
                        }
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>
            </div>

            { 
                isModalOpen && 
                <CustomerReviewsReviewModal 
                    title={title}
                    providerName={providerName}
                    startTime={startTime}
                    icon={icon}
                    iconBg={iconBg}
                    serviceId={serviceId}
                    appointmentId={appointmentId}
                    setIsModalOpen={setIsModalOpen} 
                /> 
            }
        </>
    )
}

export default CustomerReviewsPendingCard