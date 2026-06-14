import React from 'react'
import CustomerBookingsCard from './CustomerBookingsCard';
import { useGetAppointments } from '@/app/features/appointment/hooks/useGetAppointments';
import LoadingOverlay from '../../ui/LoadingOverlay';

const CustomerBookingsUpcomingSection = () => {
    const { data, isPending } = useGetAppointments();
    console.log('@@@data ', data)

    return (
        <>
            { isPending && <LoadingOverlay /> }

            <div className="mb-8">
                <h2 className="text-sm font-semibold text-muted uppercase tracking-wider mb-4 flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-good"></span>
                    Upcoming Appointments
                </h2>

                <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                    {
                        !!data?.length &&
                        data.map(appointment => (
                            <CustomerBookingsCard 
                                key={appointment._id}
                                appointmentId={appointment._id}
                                icon={appointment.service_id?.icon}
                                iconBg={appointment.service_id?.iconBg}
                                title={appointment.service_id?.title}
                                status={appointment.status}
                                providerName={appointment.admin_id?.name}
                                startTime={appointment.startTime}
                                endTime={appointment.endTime}
                                duration={appointment.service_id?.duration}
                                amount={appointment.amount}
                                paymentStatus={appointment.paymentStatus}
                                notes={appointment.notes}
                            />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default CustomerBookingsUpcomingSection