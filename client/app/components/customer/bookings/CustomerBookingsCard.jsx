import React, { useState } from 'react'
import Button from '../../ui/Button'
import CustomerBookingsCardModal from './CustomerBookingsCardModal';

const CustomerBookingsCard = () => {
    const [isCancel, setIsCancel] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalCancel = () => {
        setIsCancel(true);
        setIsModalOpen(true);
    }

    const handleModalReschedule = () => {
        setIsCancel(false);
        setIsModalOpen(true);
    }

    return (
        <>
            <div className="booking-card p-5 cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-[rgba(108,99,255,0.2)]">
                        <svg className="w-5 h-5 text-accent-soft" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
                            />
                        </svg>
                    </div>

                    <span className="badge badge-confirmed">Confirmed</span>
                </div>

                <h3 className="font-semibold text-tx mb-1">Deep Tissue Massage</h3>
                <p className="text-xs text-muted mb-3">Zen Wellness Studio · Sarah Mitchell</p>

                <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-2 text-xs text-muted">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>

                        <span>Tomorrow, June 15 · 2:30 PM</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>

                        <span>60 minutes</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-solid border-[rgba(255,255,255,0.07)]">
                    <div>
                        <span className="text-lg font-bold text-tx">$90</span>
                        <span className="badge badge-paid ml-2">Paid</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <Button label="Cancel" className="text-xs px-3 py-1.5 rounded-lg text-weak bg-[rgba(248,113,113,0.1)] 
                            border border-solid border-[rgba(248,113,113,0.2)]" onClick={handleModalCancel}
                        />
                        
                        <Button className="text-xs px-3 py-1.5 rounded-lg text-accent-soft bg-[rgba(108,99,255,0.15)] 
                            border border-solid border-[rgba(108,99,255,0.25)]" onClick={handleModalReschedule}
                            label="Reschedule"
                        />
                    </div>
                </div>
            </div>

            { isModalOpen && <CustomerBookingsCardModal isCancel={isCancel} setIsOpenModal={setIsModalOpen} /> }
        </>
    )
}

export default CustomerBookingsCard