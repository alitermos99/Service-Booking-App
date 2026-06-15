import React, { useEffect, useState } from 'react'
import DataTable from '../../ui/DataTable';
import { useGetPastAppointments } from '@/app/features/appointment/hooks/useGetPastAppointments';
import Button from '../../ui/Button';
import LoadingOverlay from '../../ui/LoadingOverlay';
import CustomerBookingsFilterSection from './CustomerBookingsFilterSection';

const PAST_APPOINTMENTS_COLUMNS = [
    {label: 'SERVICE', fieldName: 'service', className: 'font-medium text-tx'},
    {label: 'PROVIDER', fieldName: 'provider', className: 'text-muted'},
    {label: 'DATE & TIME', fieldName: 'datetime', className: 'text-muted hidden sm:table-cell', headerClass: 'hidden sm:table-cell'},
    {label: 'DURATION', fieldName: 'duration', className: 'text-muted hidden md:table-cell', headerClass: 'hidden sm:table-cell'},
    {label: 'STATUS', fieldName: 'status', 
        typeAttributes: {
            className: (row) => row?.status === 'completed' ? 'badge badge-completed capitalize' : 'badge badge-cancelled capitalize'
        }
    },
    {label: 'PAYMENT', fieldName: 'paymentStatus', typeAttributes: {
            className: (row) => row?.paymentStatus === 'paid' ? 'badge badge-paid capitalize' : 'badge badge-refunded capitalize'
        }
    },
    {label: 'AMOUNT', fieldName: 'amount', className: 'hidden lg:table-cell font-medium text-good', headerClass: 'hidden sm:table-cell'},
]

const CustomerBookingsPastAppointments = () => {
    //* Paginagion *//
    const [cursor, setCursor] = useState(null);
    const [cursorHistory, setHistory] = useState([]);
    const [sortField, setSortField] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');
    //*           *//

    const [tag, setTag] = useState('all');
    const [search, setSearch] = useState('');
    const [totalShowing, setTotalShowing] = useState(0);

    const { data, isPending } = useGetPastAppointments(search, tag, sortField, sortOrder, cursor);
    const hasNextPage = data?.hasNextPage ?? false;
    const hasPrevPage = data?.hasPrevPage ?? false;
    
    const pastAppointments = data?.results?.map(appointment => {
        return {
            ...appointment,
            amount: `$${appointment.service_id?.price}`,
            duration: `${appointment.service_id?.price} min`,
            provider: appointment.admin_id?.name,
            service: appointment.service_id?.title,
            datetime: formatAppointmentDate(appointment.startTime)
        }
    });

    const handleSearchChange = (event) => {
        const { value } = event.target;

        if(value?.length > 0 && !value.trim()) {
            return;
        }
        
        setSearch(value);
    }

    const handleTagChange = (event) => { 
        setTag(event.target.name);    
    }

    const handleSortChange = (event) => {
        const { value } = event.target; 

        setSortField(value.split(';')[0]);
        setSortOrder(value.split(';')[1]);
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
        setTotalShowing(prev => prev - data.results.length);
    };

    useEffect(() => {
        function handleSetPagination() {
            setCursor(null);
            setHistory([]);
            setTotalShowing(0);
        }

        handleSetPagination();
    }, [sortField, sortOrder, search, tag]);

    useEffect(() => {
        function accumulateData() {
            if (data?.results?.length) {
                setTotalShowing(prev => {
                    return prev + data.results.length;
                });
            }
        }

        accumulateData();
    }, [data]);

    return (
        <>
            { isPending && <LoadingOverlay /> }

            <CustomerBookingsFilterSection 
                selectedTag={tag} 
                onSort={handleSortChange}
                onSelect={handleTagChange} 
                onChange={handleSearchChange} 
            />

            <div className="glass2 rounded-2xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-solid border-[rgba(255,255,255,0.07)]">
                    <h2 className="text-sm font-semibold text-muted uppercase tracking-wider flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-accent-sky"></span>
                        Booking History
                    </h2>

                    <span className="text-xs text-muted">{ data?.totalRecords } record(s)</span>
                </div>

                <DataTable
                    columns={PAST_APPOINTMENTS_COLUMNS}
                    data={pastAppointments}
                    tableClass="w-full table"
                />

                <div className="flex items-center justify-between px-6 py-4 border-[rgba(255,255,255,0.07)] border-t border-solid">
                    <p className="text-xs text-muted">Showing { totalShowing } of { data?.totalRecords } record(s)</p>

                    <div className="flex items-center gap-1">
                        <Button 
                            className="w-8 h-8 rounded-lg text-xs flex items-center justify-center text-muted bg-[rgba(255,255,255,0.04)] disabled:opacity-40 disabled:cursor-not-allowed" 
                            label={
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7"/>
                                </svg>
                            }
                            disabled={!hasPrevPage || isPending}
                            onClick={handlePrev}
                        />

                        <Button 
                            className="w-8 h-8 rounded-lg text-xs flex items-center justify-center text-muted bg-[rgba(255,255,255,0.04)] disabled:opacity-40 disabled:cursor-not-allowed" 
                            label={
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/>
                                </svg>
                            }
                            disabled={!hasNextPage || isPending}
                            onClick={handleNext}
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

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

export default CustomerBookingsPastAppointments