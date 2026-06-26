import React from 'react'
import Modal from '../../ui/Modal'
import Button from '../../ui/Button'
import TextArea from '../../forms/TextArea'

const CustomerReviewsReviewModal = ({ setIsModalOpen }) => {
    return (
        <Modal>
            <div className="glass rounded-2xl w-full max-w-lg border border-solid border-[rgba(255,255,255,0.12)] h-full flex flex-col">
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
                        <div className="w-10 h-10 rounded-xl btn-primary flex items-center justify-center shrink-0">
                            <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                    d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 
                                    21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                />
                            </svg>
                        </div>

                        <div>
                            <p className="font-medium text-tx text-sm">Deep Tissue Massage</p>
                            <p className="text-xs text-muted">Zen Wellness Studio · May 28, 2025</p>
                        </div>
                    </div>

                    <div className="space-y-5 overflow-auto">
                        <div>
                            <p className="text-sm font-medium text-tx mb-3">Your Rating <span className="text-weak">*</span></p>

                            <div className="flex items-center gap-1" id="star-rating">
                                <span className="star-btn">★</span>
                                <span className="star-btn">★</span>
                                <span className="star-btn">★</span>
                                <span className="star-btn">★</span>
                                <span className="star-btn">★</span>
                            </div>
                            <p className="text-xs text-muted mt-1.5" id="rating-label">Click a star to rate</p>
                        </div>

                        <div>
                        <p className="text-sm font-medium text-tx mb-3">Rate Specific Aspects</p>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted">Professionalism</span>
                                <div className="flex items-center gap-0.5 text-lg">
                                    <span className="text-fair">★★★★★</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted">Quality of Service</span>

                                <div className="flex items-center gap-0.5 text-lg">
                                    <span className="text-fair">★★★★</span>
                                    <span className="text-[rgba(255,255,255,0.2)]">★</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between">
                                <span className="text-sm text-muted">Value for Money</span>
                                <div className="flex items-center gap-0.5 text-lg">
                                    <span className="text-fair">★★★★★</span>
                                </div>
                            </div>
                        </div>
                        </div>

                        <div>
                            <TextArea label="Your Review" rows={4} maxLength={500} value='' 
                                placeholder="Share the details of your experience — what stood out, 
                                    what could be improved, and whether you'd recommend this service..." 
                                labelClass="text-sm font-medium text-tx block mb-2"
                                showCount
                                required
                            />
                            {/* <label className="text-sm font-medium text-tx block mb-2">Your Review <span className="text-weak">*</span></label> */}
                            {/* <textarea rows="4" placeholder="Share the details of your experience — what stood out, 
                                what could be improved, and whether you'd recommend this service..." 
                                className="w-full rounded-xl px-4 py-3 text-sm outline-none resize-none bg-[rgba(26,26,36,0.6)]
                                    border border-solid border-[rgba(255,255,255,0.094)] text-tx" 
                            ></textarea>
                            <p className="text-xs text-muted mt-1 text-right">0 / 500</p> */}
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
                                id="toggle-anon"></div>
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
                            label="Submit Review"
                        />
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default CustomerReviewsReviewModal