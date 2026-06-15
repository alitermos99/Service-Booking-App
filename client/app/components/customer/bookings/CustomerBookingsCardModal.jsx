import React from 'react'
import Modal from '../../ui/Modal'
import Button from '../../ui/Button'
import Link from 'next/link';
import { useCancelAppointment } from '@/app/features/appointment/hooks/useCancelAppointment';
import LoadingOverlay from '../../ui/LoadingOverlay';
import CustomerAvailableSlots from '../CustomerAvailableSlots';

const DEFAULT_ICON_BG = 'linear-gradient(135deg,rgba(108,99,255,0.2),rgba(167,139,250,0.2))';

const CustomerBookingsCardModal = ({ appointmentId, icon, iconBg, title, status, timeText, time, duration, amount, paymentStatus, notes, providerName,
    modal, setModal, setIsOpenModal, serviceId, adminId
}) => {
    const { mutate: cancelAppointment, isPending } = useCancelAppointment();

    const handleReschedule = (startTime) => {
        console.log('satr ', startTime);
        
    }

    const handleCancelAppointment = () => {
        cancelAppointment(appointmentId);
        setIsOpenModal(false);
    }

    return (
        <>
            { isPending && <LoadingOverlay /> }

            <Modal>
                {
                    modal === 'reschedule' &&
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
                                    <div className="w-12 h-12 rounded-xl btn-primary flex items-center justify-center shrink-0"
                                        style={{ background: iconBg ?? DEFAULT_ICON_BG }}
                                    >
                                        { icon }
                                    </div>

                                    <div>
                                        <h4 className="font-semibold text-tx">{ title }</h4>
                                        {/* <p className="text-sm text-muted">Zen Wellness Studio</p> */}
                                    </div>

                                    <span className={`badge ml-auto capitalize
                                            ${status === 'confirmed' ? 'badge-confirmed' : status === 'pending' ? 'badge-pending' 
                                                : 'badge-cancelled'
                                            }
                                        `}
                                    >
                                        { status }
                                    </span>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="glass2 rounded-xl p-3">
                                        <p className="text-xs text-muted mb-1">Date & Time</p>
                                        <p className="text-sm font-medium text-tx">{ timeText }</p>
                                        <p className="text-xs text-muted">{ time }</p>
                                    </div>

                                    <div className="glass2 rounded-xl p-3">
                                        <p className="text-xs text-muted mb-1">Duration</p>
                                        <p className="text-sm font-medium text-tx">{ duration } minutes</p>
                                        {/* <p className="text-xs text-muted">1 session</p> */}
                                    </div>

                                    <div className="glass2 rounded-xl p-3">
                                        <p className="text-xs text-muted mb-1">Provider</p>
                                        <p className="text-sm font-medium text-tx">{ providerName }</p>
                                        {/* <p className="text-xs text-muted">Licensed Therapist</p> */}
                                    </div>

                                    <div className="glass2 rounded-xl p-3">
                                        <p className="text-xs text-muted mb-1">Amount Paid</p>
                                        <p className="text-sm font-bold text-good">${ amount }</p>
                                        <span className={`badge capitalize ${paymentStatus === 'paid' ? 'badge-paid' : 'badge-unpaid'}`}>{ paymentStatus }</span>
                                    </div>
                                </div>

                                <div className="glass2 rounded-xl p-4">
                                    <p className="text-xs text-muted mb-2">Your Notes</p>
                                    <p className="text-sm text-tx">{ notes }</p>
                                </div>

                                <div className="flex gap-3 pt-2">
                                    <Button label="Cancel Booking"
                                        onClick={() => {setModal('cancel')}}
                                        className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-[rgba(248,113,113,0.1)] text-weak 
                                            border-[rgba(248,113,113,0.2)] border border-solid" 
                                    />

                                    <Button className="flex-1 py-2.5 rounded-xl text-sm font-medium bg-[rgba(108,99,255,0.15)] 
                                        text-accent-soft border-[rgba(108,99,255,0.25)] border border-solid" 
                                        label="Reschedule" onClick={() => {setModal('slots')}}
                                    />
                                    
                                    <Link href="/reviews" className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white btn-primary flex items-center justify-center gap-1.5">
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
                    modal === 'cancel' &&
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
                                    onClick={handleCancelAppointment}
                                />
                            </div>
                        </div>
                    )
                }

                {
                    modal === 'slots' &&
                    <CustomerAvailableSlots 
                        serviceId={serviceId} 
                        adminId={adminId} 
                        className="glass rounded-2xl w-full max-w-lg overflow-y-auto p-6 space-y-4"
                        onCancel={() => setIsOpenModal(false)}
                        showCancel
                    />
                }
            </Modal>
        </>
    )
}

export default CustomerBookingsCardModal