'use client'

import React, { useState } from 'react';
import LoadingOverlay from '@/app/components/ui/LoadingOverlay';
import CustomerHeader from '@/app/components/customer/CustomerHeader';
import { useGetServices } from '@/app/features/service/hooks/useGetServices';
import CustomerServicesGrid from '@/app/components/customer/services/CustomerServicesGrid';
import CustomerServicesHero from '@/app/components/customer/services/CustomerServicesHero';
import CustomerServicesFilterSection from '@/app/components/customer/services/CustomerServicesFilterSection';

const CustomerServicesPage = () => {
    const [search, setSearch] = useState('');
    const { data: services, isPending } = useGetServices(search);

    const handleChange = (event) => {
        const { value } = event.target;

        if(value?.length > 0 && !value.trim()) {
            return;
        }
        
        setSearch(event.target.value);
    }

    return (
        <>
            { isPending && <LoadingOverlay /> }

            <CustomerHeader />
            <CustomerServicesHero onChange={handleChange} />

            <div className="px-4 lg:px-8 pb-16 max-w-7xl mx-auto">
                <CustomerServicesFilterSection availableServices={services?.length} />
                <CustomerServicesGrid services={services} />
            </div>
        </>
    )
}

export default CustomerServicesPage