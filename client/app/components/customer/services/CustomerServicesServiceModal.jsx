import React, { useState } from 'react'
import Modal from '../../ui/Modal'
import Button from '../../ui/Button'
import CustomerAvailableSlots from '../CustomerAvailableSlots'

const CustomerServicesServiceModal = ({ serviceId, adminId, title, price, duration, description, stars, avgRating = 0, 
    totalReviews = 0, setIsOpen 
}) => {
    const [selectedTime, setSelectedTime] = useState(null);

    const handleSlotSelection = (startTime) => {
        setSelectedTime(startTime);
    }

    return (
        <Modal>
            <div className="glass rounded-2xl w-full max-w-lg overflow-y-auto max-h-[90vh]">
                <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-tx">{ title }</h3>
                            <p className="text-muted text-sm mt-0.5">{ duration } min · ${ price }</p>
                        </div>

                        <Button 
                            label={
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            }
                            className="text-muted hover:text-tx transition-colors mt-1"
                            onClick={() => setIsOpen(false)}
                        />
                    </div>

                    <div className="flex items-center gap-1">
                        {!stars?.length
                            ? <p className="text-xs text-muted">No rating available</p>
                            : <>
                                {stars.map(star => (
                                    <span key={star} className="text-fair text-xs">★</span>
                                ))}

                                <span className="text-sm text-muted ml-1">{avgRating} · {totalReviews} review(s)</span>
                            </>
                        }
                    </div>

                    <p className="text-sm text-muted leading-relaxed">
                        { description }
                    </p>
                    
                    <div className="grid grid-cols-3 gap-3">
                        <div className="glass2 rounded-xl p-3 text-center">
                            <p className="text-xs text-muted">Duration</p>
                            <p className="text-sm font-semibold text-tx mt-0.5">{ duration } min</p>
                        </div>

                        <div className="glass2 rounded-xl p-3 text-center">
                            <p className="text-xs text-muted">Price</p>
                            <p className="text-sm font-semibold text-tx mt-0.5">${ price }</p>
                        </div>

                        {/* <div className="glass2 rounded-xl p-3 text-center">
                            <p className="text-xs text-muted">Deposit</p>
                            <p className="text-sm font-semibold text-success mt-0.5">$20</p>
                        </div> */}
                    </div>

                    <CustomerAvailableSlots serviceId={serviceId} adminId={adminId} onSelect={handleSlotSelection} />
                </div>
            </div>
        </Modal>
    )
}

export default CustomerServicesServiceModal