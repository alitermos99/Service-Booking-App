import React, { useState } from 'react'
import Button from '../ui/Button';
import { useGetAvailableSlots } from '@/app/features/slot/hooks/useGetAvailableSlots';

function formatTo12hr(time) {
    const [h, m] = time.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${m.toString().padStart(2, '0')} ${period}`;
};

const CustomerScheduleAppointment = ({ serviceId, adminId, onSelect, onCancel, showCancel = false, onSchedule,
    scheduleLabel = 'Schedule', className = '' 
}) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const { data: slots } = useGetAvailableSlots(adminId, serviceId, 
        new Date().toLocaleDateString('en-CA'), new Date().getTimezoneOffset()
    );
    const availableSlots = slots?.filter(filter => filter.available);

    const handleSlotSelection = (slot, index) => {
        setSelectedIndex(index);

        if(onSelect && typeof value !== 'function') {
            onSelect(slot.startTime);
        }
    }
    
    return (
        <div className={className + ' ' + 'space-y-4'}>
            <p className="text-sm font-medium text-tx mb-2">Available Today</p>

            {
                !!availableSlots?.length > 0 &&
                (
                    <>
                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            {
                                availableSlots?.map((slot, index) => (
                                    <Button key={index} 
                                        className={`time-slot
                                            ${selectedIndex === index ? 'selected' : ''}
                                            ${slot.available ? '' : 'disabled'}
                                        `} 
                                        label={
                                            // `${formatTo12hr(slot.startTime)} - ${formatTo12hr(slot.endTime)}`
                                            `${formatTo12hr(slot.startTime)}`
                                        }
                                        onClick={() => handleSlotSelection(slot, index)}
                                        disabled={!slot.available}
                                    />
                                ))
                            }
                        </div>

                        <div className="flex gap-3">
                            {
                                showCancel &&
                                <Button className="flex-1 py-2.5 rounded-xl text-sm font-medium text-tx bg-[rgba(255,255,255,0.05)] 
                                    border-[rgba(255,255,255,0.094)] border border-solid"
                                    label="Cancel" onClick={onCancel}
                                />
                            }              

                            <Button className="flex-1 btn-primary text-white rounded-xl py-3 text-sm font-medium" 
                                label={
                                    <div className="flex items-center justify-center gap-2">
                                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                            />
                                        </svg>
                                        { scheduleLabel }
                                    </div>
                                }
                                onClick={onSchedule}
                            />
                        </div>
                    </>
                )
            }

            { (!availableSlots || !availableSlots.length) && 
                (
                    <div className="space-y-4">
                        <p className="text-muted">No available slots</p> 

                        {
                            showCancel &&
                            <Button className="flex-1 w-full py-2.5 rounded-xl text-sm font-medium text-tx bg-[rgba(255,255,255,0.05)] 
                                border-[rgba(255,255,255,0.094)] border border-solid"
                                label="Cancel" onClick={onCancel}
                            />
                        }
                    </div>
                )
            }
        </div>
    )
}

export default CustomerScheduleAppointment