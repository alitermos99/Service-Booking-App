'use client'

import CustomerHeader from '@/app/components/customer/CustomerHeader'
import CustomerServicesFilterSection from '@/app/components/customer/services/CustomerServicesFilterSection'
import CustomerServicesGrid from '@/app/components/customer/services/CustomerServicesGrid'
import CustomerServicesHero from '@/app/components/customer/services/CustomerServicesHero'
import React from 'react'

const CustomerServicesPage = () => {
    return (
        <>
            <CustomerHeader />
            <CustomerServicesHero />

            <div className="px-4 lg:px-8 pb-16 max-w-7xl mx-auto">
                <CustomerServicesFilterSection />
                <CustomerServicesGrid />
            </div>
        </>
    )
}

export default CustomerServicesPage