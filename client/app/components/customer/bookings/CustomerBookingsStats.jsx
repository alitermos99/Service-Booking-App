import React from 'react'
import CustomerBookingsStat from './CustomerBookingsStat'

const CustomerBookingsStats = () => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <CustomerBookingsStat 
                title={'Total Bookings'} 
                stat={12} 
                subtitle={'All time'} 
            />

            <CustomerBookingsStat 
                title={'Upcoming'} 
                stat={3} 
                subtitle={'Next 30 Days'}
                colorClass="text-good" 
            />

            <CustomerBookingsStat 
                title={'Completed'} 
                stat={8} 
                subtitle={'Past sessions'}
                colorClass="text-accent-sky"
            />

            <CustomerBookingsStat 
                title={'Total Spent'} 
                stat={'$840'} 
                subtitle={'All time'} 
                colorClass="gradient-text"
            />
        </div>
    )
}

export default CustomerBookingsStats