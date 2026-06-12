'use client'

import React, { useState } from 'react';
import LoadingOverlay from '@/app/components/ui/LoadingOverlay';
import CustomerHeader from '@/app/components/customer/CustomerHeader';
import { useGetServices } from '@/app/features/service/hooks/useGetServices';
import CustomerServicesGrid from '@/app/components/customer/services/CustomerServicesGrid';
import CustomerServicesHero from '@/app/components/customer/services/CustomerServicesHero';
import CustomerServicesFilterSection from '@/app/components/customer/services/CustomerServicesFilterSection';

const CustomerServicesPage = () => {
    const [tag, setTag] = useState('all');
    const [search, setSearch] = useState('');
    const { data: services, isPending } = useGetServices(search);

    const handleChange = (event) => {
        const { value } = event.target;

        if(value?.length > 0 && !value.trim()) {
            return;
        }
        
        setSearch(event.target.value);
    }

    const handleTagChange = (event) => { 
        const { name } = event.target;

        setTag(name);    
        setSearch(name === 'all' ? '' : name);
    }

    return (
        <>
            { isPending && <LoadingOverlay /> }

            <CustomerHeader />
            <CustomerServicesHero onChange={handleChange} />

            <div className="px-4 lg:px-8 pb-16 max-w-7xl mx-auto">
                <CustomerServicesFilterSection 
                    selectedtTag={tag} 
                    onSelect={handleTagChange} 
                    availableServices={services?.length} 
                />
                
                <CustomerServicesGrid services={services} />
            </div>
        </>
    )
}

export default CustomerServicesPage