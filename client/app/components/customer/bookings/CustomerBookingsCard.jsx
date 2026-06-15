import React, { useState } from 'react'
import Button from '../../ui/Button'
import CustomerBookingsCardModal from './CustomerBookingsCardModal';

const DEFAULT_ICON_BG = 'linear-gradient(135deg,rgba(108,99,255,0.2),rgba(167,139,250,0.2))';

const CustomerBookingsCard = ({ appointmentId, icon, iconBg, status, title, providerName, startTime, endTime, 
    duration, amount, paymentStatus, notes, serviceId, adminId 
}) => {
    const [modal, setModal] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleModalCancel = () => {
        setModal('cancel');
        setIsModalOpen(true);
    }

    const handleModalReschedule = () => {
        setModal('reschedule');
        setIsModalOpen(true);
    }

    return (
        <>
            <div className="booking-card p-5 cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                        style={{ background: iconBg ?? DEFAULT_ICON_BG }}
                    >
                        { icon }
                    </div>

                    <span className={`badge capitalize
                            ${status === 'confirmed' ? 'badge-confirmed' : status === 'pending' ? 'badge-pending' 
                                : 'badge-cancelled'
                            }
                        `}
                    >
                        { status }
                    </span>
                </div>

                <h3 className="font-semibold text-tx mb-1">{ title }</h3>
                <p className="text-xs text-muted mb-3">{ providerName }</p>

                <div className="space-y-1.5 mb-4">
                    <div className="flex items-center gap-2 text-xs text-muted">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>

                        <span>{ formatBookingDate(startTime) }</span>
                    </div>

                    <div className="flex items-center gap-2 text-xs text-muted">
                        <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>

                        <span>{ duration } minutes</span>
                    </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-solid border-[rgba(255,255,255,0.07)]">
                    <div>
                        <span className="text-lg font-bold text-tx">${ amount }</span>
                        <span className={`badge ml-2 capitalize ${paymentStatus === 'paid' ? 'badge-paid' : 'badge-unpaid'}`}>{ paymentStatus }</span>
                    </div>
                    
                    {
                        status !== 'cancelled' &&
                        (
                            <div className="flex items-center gap-2">
                                <Button label="Cancel" className="text-xs px-3 py-1.5 rounded-lg text-weak bg-[rgba(248,113,113,0.1)] 
                                    border border-solid border-[rgba(248,113,113,0.2)]" onClick={handleModalCancel}
                                />
                                
                                <Button className="text-xs px-3 py-1.5 rounded-lg text-accent-soft bg-[rgba(108,99,255,0.15)] 
                                    border border-solid border-[rgba(108,99,255,0.25)]" onClick={handleModalReschedule}
                                    label="Reschedule"
                                />
                            </div>
                        )
                    }
                </div>
            </div>

            { isModalOpen && 
                <CustomerBookingsCardModal 
                    modal={modal} 
                    setModal={setModal}
                    setIsOpenModal={setIsModalOpen} 
                    title={title}
                    duration={duration}
                    notes={notes}
                    paymentStatus={paymentStatus}
                    status={status}
                    providerName={providerName}
                    amount={amount}
                    icon={icon}
                    iconBg={iconBg}
                    time={formatTimeRange(startTime, endTime)}
                    timeText={formatBookingDate(startTime)}
                    appointmentId={appointmentId}
                    serviceId={serviceId}
                    adminId={adminId}
                /> 
            }
        </>
    )
}

function formatBookingDate(dateString, locale = "en-US") {
    const date = new Date(dateString);
    const now = new Date();

    const today = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );

    const bookingDay = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate()
    );

    const diffDays = Math.floor(
        (bookingDay - today) / (1000 * 60 * 60 * 24)
    );

    const formattedDate = date.toLocaleDateString(locale, {
        month: "long",
        day: "numeric"
    });

    const formattedTime = date.toLocaleTimeString(locale, {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    });

    if (diffDays === 0) {
        return `Today, ${formattedDate} · ${formattedTime}`;
    }

    if (diffDays === 1) {
        return `Tomorrow, ${formattedDate} · ${formattedTime}`;
    }

    return `${formattedDate} · ${formattedTime}`;
}

function formatTimeRange(startDateString, endDateString, locale = "en-US") {
    const startDate = new Date(startDateString);
    const endDate = new Date(endDateString);

    const options = {
        hour: "numeric",
        minute: "2-digit",
        hour12: true
    };

    const startTime = startDate.toLocaleTimeString(locale, options);
    const endTime = endDate.toLocaleTimeString(locale, options);

    return `${startTime} – ${endTime}`;
}

export default CustomerBookingsCard