'use client'

import React, { useState } from 'react';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import TextArea from '../../forms/TextArea';
import { formatDate } from '@/app/utils/dateUtils';
import { useCreateReview } from '@/app/features/review/hooks/useCreateReview';
import LoadingOverlay from '../../ui/LoadingOverlay';

const LABELS = ['Terrible','Poor','Average','Good','Excellent'];
const DEFAULT_ICON_BG = 'linear-gradient(135deg,rgba(108,99,255,0.2),rgba(167,139,250,0.2))';

const CustomerReviewsReviewModal = ({ title, providerName, startTime, icon, iconBg, serviceId, appointmentId, setIsModalOpen }) => {
    const [notes, setNotes] = useState('');
    const [rateLevel, setRateLevel] = useState(0);
    const [rateText, setRateText] = useState('Click a star to rate');

    const { mutate: createReview, isPending } = useCreateReview();

    const handleRating = (level) => {
        setRateLevel(level);
        setRateText(LABELS[level - 1]);
    }

    const handleCreateReview = () => {
        createReview({
            rating: rateLevel,
            comment: notes,
            appointmentId,
            serviceId
        });
    }

    return (
        <>
            { isPending && <LoadingOverlay /> }

            <Modal>
                <div className="glass rounded-2xl w-full max-w-lg border border-solid border-[rgba(255,255,255,0.12)] flex flex-col">
                    <div className="flex items-center justify-between p-6 border-b border-solid border-[rgba(255,255,255,0.07)]">
                        <h3 className="font-semibold text-tx text-lg">Write a Review</h3>

                        <Button className="w-8 h-8 rounded-lg flex items-center justify-center bg-[rgba(255,255,255,0.05)]"
                            label={
                                <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            }
                            onClick={() => setIsModalOpen(false)}
                        />
                    </div>

                    <div className="p-6 space-y-5 flex flex-col overflow-auto">
                        <div className="flex items-center gap-3 p-4 rounded-xl bg-[rgba(108,99,255,0.08)] border border-solid 
                            border-[rgba(108,99,255,0.2)]"
                        >
                            <div className="w-10 h-10 rounded-xl btn-primary flex items-center justify-center shrink-0"
                                style={{ background: iconBg ?? DEFAULT_ICON_BG }}
                            >
                                { icon }
                            </div>

                            <div>
                                <p className="font-medium text-tx text-sm">{ title }</p>
                                <p className="text-xs text-muted">{ providerName } · { formatDate(startTime) }</p>
                            </div>
                        </div>

                        <div className="space-y-5 overflow-auto">
                            <div>
                                <p className="text-sm font-medium text-tx mb-3">Your Rating <span className="text-weak">*</span></p>

                                <div className="flex items-center gap-1" id="star-rating">
                                    {
                                        [1, 2, 3, 4, 5].map(level => (
                                            <span key={level} 
                                                className={`star-btn ${level <= rateLevel ? 'filled' : ''}`} 
                                                onClick={() => handleRating(level)}
                                            >
                                                ★
                                            </span>
                                        ))
                                    }
                                </div>

                                <p className="text-xs text-muted mt-1.5" id="rating-label">{ rateText }</p>
                            </div>

                            <div>
                                <TextArea label="Your Review" rows={4} maxLength={500} 
                                    placeholder="Share the details of your experience — what stood out, 
                                        what could be improved, and whether you'd recommend this service..." 
                                    labelClass="text-sm font-medium text-tx block mb-2"
                                    onChange={(e) => setNotes(e.target.value)}
                                    value={notes}
                                    showCount
                                    required
                                />
                            </div>

                            <div className="flex items-center justify-between p-3 rounded-xl bg-[rgba(255,255,255,0.03)]
                                border border-solid border-[rgba(255,255,255,0.07)]" 
                            >
                            
                                <div>
                                    <p className="text-sm font-medium text-tx">Post Anonymously</p>
                                    <p className="text-xs text-muted">Your name won&apos;t be shown publicly</p>
                                </div>

                                <div className="relative w-10 h-5 cursor-pointer">
                                    <div className="w-10 h-5 rounded-full transition-colors bg-[rgba(255,255,255,0.1)]
                                        border border-solid border-[rgba(255,255,255,0.15)]"
                                        id="toggle-anon">
                                    </div>

                                    <div className="absolute top-0.5 left-0.5 w-4 h-4 rounded-full bg-white transition-transform" id="toggle-anon-thumb"></div>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3 pt-1">
                            <Button className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-[rgba(255,255,255,0.05)]
                                border border-solid border-[rgba(255,255,255,0.094)] text-tx" 
                                label="Cancel"
                                onClick={() => setIsModalOpen(false)}
                            />

                            <Button className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white btn-primary"
                                onClick={handleCreateReview}
                                label="Submit Review"
                            />
                        </div>
                    </div>
                </div>
            </Modal>
        </>
    )
}

export default CustomerReviewsReviewModal