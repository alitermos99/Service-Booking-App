'use client'

import CustomerBookingsStats from '@/app/components/customer/bookings/CustomerBookingsStats'
import CustomerHeader from '@/app/components/customer/CustomerHeader'
import Section from '@/app/components/layouts/Section'
import Link from 'next/link'
import React from 'react'

const CustomerBookingsPage = () => {
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
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"/>
                        </svg>
                        Book New Appointment
                    </Link>
                </div>

                <CustomerBookingsStats />
            </Section>
        </>
    )
}

export default CustomerBookingsPage