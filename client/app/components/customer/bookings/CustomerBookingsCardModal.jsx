import React from 'react'
import Modal from '../../ui/Modal'
import Button from '../../ui/Button'
import Link from 'next/link';

const CustomerBookingsCardModal = ({ isCancel = false, setIsOpenModal }) => {
    return (
        <Modal>
            {
                !isCancel &&
                (
                    <div className="glass rounded-2xl w-full max-w-lg max-h-screen overflow-y-auto border-[rgba(255,255,255,0.12)] border border-solid">
                        <div className="flex items-center justify-between p-6 border-[rgba(255,255,255,0.07)] border border-solid">
                            <h3 className="font-semibold text-tx text-lg">Booking Details</h3>
                                <Button className="w-8 h-8 rounded-lg flex items-center justify-center bg-[rgba(255,255,255,0.05)]"
                                    label={
                                        <svg className="w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    }

                                    onClick={() => setIsOpenModal(false)}
                                />
                        </div>

                        <div className="p-6 space-y-5">
                            <div className="flex items-center gap-4 p-4 rounded-xl bg-[rgba(108,99,255,0.08)] border-[rgba(108,99,255,0.2)] border border-solid">
                                <div className="w-12 h-12 rounded-xl btn-primary flex items-center justify-center shrink-0">
                                    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                            d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                                        />
                                    </svg>
                                </div>

                                <div>
                                    <h4 className="font-semibold text-tx">Deep Tissue Massage</h4>
                                    <p className="text-sm text-muted">Zen Wellness Studio</p>
                                </div>

                                <span className="ml-auto badge badge-confirmed">Confirmed</span>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="glass2 rounded-xl p-3">
                                    <p className="text-xs text-muted mb-1">Date & Time</p>
                                    <p className="text-sm font-medium text-tx">Jun 15, 2025</p>
                                    <p className="text-xs text-muted">2:30 PM – 3:30 PM</p>
                                </div>
                                <div className="glass2 rounded-xl p-3">
                                    <p className="text-xs text-muted mb-1">Duration</p>
                                    <p className="text-sm font-medium text-tx">60 minutes</p>
                                    <p className="text-xs text-muted">1 session</p>
                                </div>
                                <div className="glass2 rounded-xl p-3">
                                    <p className="text-xs text-muted mb-1">Provider</p>
                                    <p className="text-sm font-medium text-tx">Sarah Mitchell</p>
                                    <p className="text-xs text-muted">Licensed Therapist</p>
                                </div>
                                <div className="glass2 rounded-xl p-3">
                                    <p className="text-xs text-muted mb-1">Amount Paid</p>
                                    <p className="text-sm font-bold text-good">$90.00</p>
                                    <span className="badge badge-paid">Paid</span>
                                </div>
                            </div>

                            {/* <div className="glass2 rounded-xl p-4">
                                <p className="text-xs text-muted mb-2 flex items-center gap-1.5">
                                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor"><path d="M13.976 9.15c-2.172-.806-3.356-1.426-3.356-2.409 0-.831.683-1.305 1.901-1.305 2.227 0 4.515.858 6.09 1.631l.89-5.494C18.252.975 15.697 0 12.165 0 9.667 0 7.589.654 6.104 1.872 4.56 3.147 3.757 4.992 3.757 7.218c0 4.039 2.467 5.76 6.476 7.219 2.585.92 3.445 1.574 3.445 2.583 0 .98-.84 1.545-2.354 1.545-1.875 0-4.965-.921-6.99-2.109l-.9 5.555C5.175 22.99 8.385 24 11.714 24c2.641 0 4.843-.624 6.328-1.813 1.664-1.305 2.525-3.236 2.525-5.732 0-4.128-2.524-5.851-6.591-7.305z"/></svg>
                                    Stripe Payment Intent
                                </p>
                                <p className="text-sm font-mono" style="color:#a78bfa">pi_3Ngh8xLksMz7F00Q1Kq2xAB</p>
                            </div> */}

                            <div className="glass2 rounded-xl p-4">
                                <p className="text-xs text-muted mb-2">Your Notes</p>
                                <p className="text-sm text-tx">Please focus on lower back and shoulders. Allergic to lavender oil.</p>
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button label="Cancel Booking"
                                    className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-[rgba(248,113,113,0.1)] text-weak 
                                        border-[rgba(248,113,113,0.2)] border border-solid" 
                                />

                                <Button className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-[rgba(108,99,255,0.15)] 
                                    text-accent-soft border-[rgba(108,99,255,0.25)] border border-solid" 
                                    label="Reschedule"
                                />
                                
                                <Link href="reviews.html" className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white btn-primary flex items-center justify-center gap-1.5">
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 
                                            0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 
                                            0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 
                                            0 00.951-.69l1.519-4.674z"
                                        />
                                    </svg>
                                    Review
                                </Link>
                            </div>
                        </div>
                    </div>
                )
            }

            {
                isCancel &&
                (
                    <div className="glass rounded-2xl w-full max-w-sm p-6 border-[rgba(248,113,113,0.2)] border border-solid">
                        <div className="w-12 h-12 rounded-xl mx-auto mb-4 flex items-center justify-center bg-[rgba(248,113,113,0.15)]">
                            <svg className="w-6 h-6 text-weak" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 
                                    4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                />
                            </svg>
                        </div>

                        <h3 className="text-center font-semibold text-tx text-lg mb-2">Cancel Booking?</h3>
                        <p className="text-center text-sm text-muted mb-6">Are you sure you want to cancel this appointment? A refund will be processed within 5–7 business days.</p>
                        
                        <div className="flex gap-3">
                            <Button className="flex-1 py-2.5 rounded-xl text-sm font-medium text-tx bg-[rgba(255,255,255,0.05)] 
                                border-[rgba(255,255,255,0.094)] border border-solid"
                                label="Keep Booking" onClick={() => setIsOpenModal(false)}
                            />

                            <Button className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-[linear-gradient(135deg,#f87171,#ef4444)]" 
                                label="Yes, Cancel"
                            />
                        </div>
                    </div>
                )
            }
        </Modal>
    )
}

export default CustomerBookingsCardModal