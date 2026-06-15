import React, { useState } from 'react'
import Button from '../ui/Button'
import { useGetAvailableSlots } from '@/app/features/slot/hooks/useGetAvailableSlots';
import Link from 'next/link';

function formatTo12hr(time) {
    const [h, m] = time.split(':').map(Number);
    const period = h >= 12 ? 'PM' : 'AM';
    const hour = h % 12 || 12;
    return `${hour}:${m.toString().padStart(2, '0')} ${period}`;
};

const CustomerAvailableSlots = ({ serviceId, adminId, onSelect, onCancel, showCancel = false, className = '' }) => {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const { data: availableSlots } = useGetAvailableSlots(adminId, serviceId, 
        new Date().toLocaleDateString('en-CA'), new Date().getTimezoneOffset()
    );

    const handleSlotSelection = (slot, index) => {
        setSelectedIndex(index);
        onSelect(slot.startTime);
    }
    
    return (
        <div className={className}>
            <p className="text-sm font-medium text-tx mb-2">Available Today</p>

            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                {
                    availableSlots?.filter(filter => filter.available).map((slot, index) => (
                        <Button key={index} 
                            className={`glass2 rounded-xl py-2 text-xs text-tx hover:border-accent transition-colors text-[10px]
                                ${selectedIndex === index ? 'border-[rgba(108,99,255,0.4)]!' : ''}
                                ${slot.available ? '' : 'text-muted! line-through'}
                            `} 
                            label={
                                `${formatTo12hr(slot.startTime)} - ${formatTo12hr(slot.endTime)}`
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
                                

                <Link href="/book" className="flex-1 btn-primary text-white rounded-xl py-3 text-sm font-medium flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                    Continue to Book
                </Link>
            </div>
        </div>
    )
}

export default CustomerAvailableSlots