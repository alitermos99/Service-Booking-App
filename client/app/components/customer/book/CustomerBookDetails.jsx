'use client'

import React from 'react'
import TextArea from '../../forms/TextArea'
import Button from '../../ui/Button'

const CustomerBookDetails = () => {
    const handleChange = (event) => {
        const { name, value } = event.target;
        
        // setForm((prev) => ({
        //     ...prev,
        //     [name]: value
        // }));
    }

    return (
        <div className="glass2 rounded-2xl p-5 space-y-4">
            <h2 className="font-semibold text-tx">Your Details</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                    <TextArea label="Special Requests / Notes" className="resize-none" 
                        placeholder="Any special requests, allergies, or preferences..."
                        labelClass="block text-xs font-medium text-muted mb-1.5"
                        onChange={handleChange}
                    />
                </div>
            </div>

            <div className="flex gap-2">
                <Button className="glass2 rounded-xl py-2.5 px-5 text-sm font-medium text-muted hover:text-tx 
                    transition-colors" label="← Back"
                />

                <Button className="flex-1 btn-primary text-white rounded-xl py-2.5 text-sm font-medium" 
                    label="Continue to Payment →"
                />
            </div>
        </div>
    )
}

export default CustomerBookDetails