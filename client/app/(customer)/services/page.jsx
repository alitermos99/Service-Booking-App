'use client'

import React from 'react'
import CustomerHeader from '@/app/components/customer/CustomerHeader'
import CustomerServicesGrid from '@/app/components/customer/services/CustomerServicesGrid'
import CustomerServicesHero from '@/app/components/customer/services/CustomerServicesHero'
import CustomerServicesFilterSection from '@/app/components/customer/services/CustomerServicesFilterSection'
import { useGetServices } from '@/app/features/service/hooks/useGetServices'
import LoadingOverlay from '@/app/components/ui/LoadingOverlay'

const CustomerServicesPage = () => {
    const { data: services, isPending } = useGetServices();

    return (
        <>
            { isPending && <LoadingOverlay /> }

            <CustomerHeader />
            <CustomerServicesHero />

            <div className="px-4 lg:px-8 pb-16 max-w-7xl mx-auto">
                <CustomerServicesFilterSection availableServices={services?.length} />
                <CustomerServicesGrid services={services} />
            </div>
        </>
    )
}

export default CustomerServicesPage