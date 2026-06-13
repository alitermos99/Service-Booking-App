import React from 'react'
import CustomerBookingsCard from './CustomerBookingsCard'

const CustomerBookingsUpcomingSection = () => {
    return (
        <div className="mb-8">
            <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-good"></span>
                Upcoming Appointments
            </h2>

            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                <CustomerBookingsCard />
            </div>
        </div>
    )
}

export default CustomerBookingsUpcomingSection