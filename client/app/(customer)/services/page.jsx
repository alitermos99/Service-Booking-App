'use client'

import React, { useEffect, useState } from 'react';
import LoadingOverlay from '@/app/components/ui/LoadingOverlay';
import CustomerHeader from '@/app/components/customer/CustomerHeader';
import { useGetServices } from '@/app/features/service/hooks/useGetServices';
import CustomerServicesGrid from '@/app/components/customer/services/CustomerServicesGrid';
import CustomerServicesHero from '@/app/components/customer/services/CustomerServicesHero';
import CustomerServicesFilterSection from '@/app/components/customer/services/CustomerServicesFilterSection';
import Button from '@/app/components/ui/Button';

const CustomerServicesPage = () => {
    const [tag, setTag] = useState('all');
    const [search, setSearch] = useState('');

    //* Paginagion *//
    const [cursor, setCursor] = useState(null);
    const [cursorHistory, setHistory] = useState([]);
    const [sortField, setSortField] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');
    //*           *//

    const { data, isPending } = useGetServices(search, sortField, sortOrder, cursor);
    const services = data?.results ?? [];
    const hasNextPage = data?.hasNextPage ?? false;
    const hasPrevPage = data?.hasPrevPage ?? false;

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

    const handleChangeSort = (event) => {
        const split = event.target.value.split(';');

        setSortField(split[0]);
        setSortOrder(split[1]);
    }

    const handleNext = () => {
        setHistory(prev => [...prev, cursor]);
        setCursor(data.nextCursor);
    };

    const handlePrev = () => {
        const history  = [...cursorHistory];
        const prevCursor = history.pop();
        setHistory(history);
        setCursor(prevCursor);
    };

    useEffect(() => {
        function handleSetPagination() {
            setCursor(null);
            setHistory([]);
        }

        handleSetPagination();
    }, [search, sortField, sortOrder]);

    return (
        <>
            { isPending && <LoadingOverlay /> }

            <CustomerHeader />
            <CustomerServicesHero onChange={handleChange} />

            <div className="px-4 lg:px-8 pb-16 max-w-7xl mx-auto">
                <CustomerServicesFilterSection 
                    selectedtTag={tag} 
                    onSort={handleChangeSort}
                    onSelect={handleTagChange} 
                    availableServices={services?.length} 
                />
                
                <CustomerServicesGrid services={services} />

                <div className="flex items-center justify-end gap-3 mt-8">
                    <Button
                        onClick={handlePrev}
                        label="← Previous"
                        disabled={!hasPrevPage || isPending}
                        className="px-5 py-2.5 rounded-xl text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                        style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.094)', color: '#f0f0f8' }}
                    />

                    <Button
                        onClick={handleNext}
                        label="Next →"
                        disabled={!hasNextPage || isPending}
                        className="btn-primary text-white px-5 py-2.5 rounded-xl text-sm font-medium disabled:opacity-40 disabled:cursor-not-allowed"
                    />
                </div>
            </div>
        </>
    )
}

export default CustomerServicesPage