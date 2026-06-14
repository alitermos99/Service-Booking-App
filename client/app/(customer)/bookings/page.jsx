'use client'

import React from 'react'
import Link from 'next/link'
import Section from '@/app/components/layouts/Section'
import CustomerHeader from '@/app/components/customer/CustomerHeader'
import CustomerBookingsStats from '@/app/components/customer/bookings/CustomerBookingsStats'
import CustomerBookingsFiltersSearch from '@/app/components/customer/bookings/CustomerBookingsFilterSection'
import CustomerBookingsUpcomingSection from '@/app/components/customer/bookings/CustomerBookingsUpcomingSection'
import DataTable from '@/app/components/ui/DataTable'
import Button from '@/app/components/ui/Button'
import { useGetAppointments } from '@/app/features/appointment/hooks/useGetAppointments';

function formatAppointmentDate(dateString) {
    const date = new Date(dateString);

    const datePart = date.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
    });

    const timePart = date.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });

    return `${datePart} · ${timePart}`;
}

const PAST_APPOINTMENTS_COLUMNS = [
    {label: 'SERVICE', fieldName: 'service', className: 'font-medium text-tx'},
    {label: 'PROVIDER', fieldName: 'provider', className: 'text-muted'},
    {label: 'DATE & TIME', fieldName: 'datetime', className: 'text-muted hidden sm:table-cell'},
    {label: 'DURATION', fieldName: 'duration', className: 'text-muted hidden md:table-cell'},
    {label: 'STATUS', fieldName: 'status', 
        typeAttributes: {
            className: (row) => row?.status === 'completed' ? 'badge badge-completed' : 'badge badge-cancelled'
        }
    },
    {label: 'PAYMENT', fieldName: 'paymentStatus', typeAttributes: {
            className: (row) => row?.paymentStatus === 'paid' ? 'badge badge-paid' : 'badge badge-refunded'
        }
    },
    {label: 'AMOUNT', fieldName: 'amount', className: 'hidden lg:table-cell font-medium text-muted'},
]

const CustomerBookingsPage = () => {
    const { data: appointments, isPending } = useGetAppointments();
    console.log('@@@@ data ', appointments, isPending);
    const pastAppointments = appointments?.filter(filter => {
        return filter?.status === 'completed' || filter?.status === 'cancelled'
    }).map(appointment => {
        return {
            ...appointment,
            amount: `$${appointment.service_id?.price}`,
            duration: `${appointment.service_id?.price} min`,
            provider: appointment.admin_id?.name,
            service: appointment.service_id?.title,
            datetime: formatAppointmentDate(appointment.startTime)
        }
    });
    console.log('@@@@ pastAppointments ', pastAppointments);

    return (
        <>
            <CustomerHeader />

            <Section padding="px-4 py-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-tx">My Bookings</h1>
                        <p className="text-muted text-sm mt-0.5">Track and manage all your appointments</p>
                    </div>

                    <Link href="/services" className={`btn-primary inline-flex items-center gap-2 px-4 py-2.5 
                            rounded-xl text-sm font-medium text-white self-start sm:self-auto`}
                    >
                        {/* <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                        </svg> */}
                        Book New Appointment ➜
                    </Link>
                </div>

                <CustomerBookingsStats />
                <CustomerBookingsFiltersSearch />
                <CustomerBookingsUpcomingSection />

                <div className="glass2 rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-6 py-4 border-b border-solid border-[rgba(255,255,255,0.07)]">
                        <h2 className="text-sm font-semibold text-muted uppercase tracking-wider flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-accent-sky"></span>
                            Booking History
                        </h2>

                        <span className="text-xs text-muted">9 records</span>
                    </div>

                    <DataTable
                        columns={PAST_APPOINTMENTS_COLUMNS}
                        data={pastAppointments}
                        tableClass="w-full table"
                    />

                    <div className="flex items-center justify-between px-6 py-4 border-[rgba(255,255,255,0.07)] border-t border-solid">
                        <p className="text-xs text-muted">Showing 5 of 9 records</p>

                        <div className="flex items-center gap-1">
                            <Button className="w-8 h-8 rounded-lg text-xs flex items-center justify-center text-muted bg-[rgba(255,255,255,0.04)]" 
                                label={
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                                    </svg>
                                }
                            />

                            <Button className="w-8 h-8 rounded-lg text-xs flex items-center justify-center text-muted bg-[rgba(255,255,255,0.04)]" 
                                label={
                                    <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                                    </svg>
                                }
                            />
                        </div>
                    </div>
                </div>
            </Section>
        </>
    )
}

export default CustomerBookingsPage