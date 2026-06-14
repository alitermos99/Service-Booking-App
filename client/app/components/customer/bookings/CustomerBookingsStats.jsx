import React from 'react'
import CustomerBookingsStat from './CustomerBookingsStat'
import { useGetAppointmentsInfo } from '@/app/features/appointment/hooks/useGetAppointmentsInfo'
import LoadingOverlay from '../../ui/LoadingOverlay';

const CustomerBookingsStats = () => {
    const { data, isPending } = useGetAppointmentsInfo();

    return (
        <>
            { isPending && <LoadingOverlay /> }

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <CustomerBookingsStat 
                    title={'Total Bookings'} 
                    stat={data?.totalBookings} 
                    subtitle={'All time'} 
                />

                <CustomerBookingsStat 
                    title={'Upcoming'} 
                    stat={data?.upcomingBookings} 
                    subtitle={'Next 30 Days'}
                    colorClass="text-good" 
                />

                <CustomerBookingsStat 
                    title={'Completed'} 
                    stat={data?.completedBookings} 
                    subtitle={'Past sessions'}
                    colorClass="text-accent-sky"
                />

                <CustomerBookingsStat 
                    title={'Total Spent'} 
                    stat={`$${data?.totalAmount}`} 
                    subtitle={'All time'} 
                    colorClass="gradient-text"
                />
            </div>
        </>
    )
}

export default CustomerBookingsStats