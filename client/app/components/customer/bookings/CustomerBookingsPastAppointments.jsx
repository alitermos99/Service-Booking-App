import React, { useEffect, useState } from 'react'
import DataTable from '../../ui/DataTable';
import { useGetPastAppointments } from '@/app/features/appointment/hooks/useGetPastAppointments';
import Button from '../../ui/Button';
import LoadingOverlay from '../../ui/LoadingOverlay';
import CustomerBookingsFilterSection from './CustomerBookingsFilterSection';
import Link from 'next/link';
import CustomerBookingsCardModal from './CustomerBookingsCardModal';

const CustomerBookingsPastAppointments = () => {
    /* useStates */
    /* Paginagion */
    const [cursor, setCursor] = useState(null);
    const [cursorHistory, setHistory] = useState([]);
    const [sortField, setSortField] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState('desc');
    // end

    const [tag, setTag] = useState('all');
    const [search, setSearch] = useState('');
    const [clickedRow, setClickedRow] = useState(null);
    const [totalShowing, setTotalShowing] = useState(0);

    const { data, isPending } = useGetPastAppointments(search, tag, sortField, sortOrder, cursor);
    const hasNextPage = data?.hasNextPage ?? false;
    const hasPrevPage = data?.hasPrevPage ?? false;
    // end

    const pastAppointmentsColumns = [
        ...PAST_APPOINTMENTS_COLUMNS,
        {
            label: 'ACTIONS', fieldName: 'actions', type: 'custom',
            render: (row) => (
                <div className="flex items-center gap-1">
                    <Button className="w-7 h-7 rounded-lg! flex items-center justify-center bg-[rgba(108,99,255,0.1)]"
                        label={
                            <svg className="w-3.5 h-3.5 text-accent-soft" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 
                                    9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                            </svg>
                        }
                        onClick={() => setClickedRow(row)}
                    />

                    <Link href="/reviews" className="w-7 h-7 rounded-lg! flex items-center justify-center bg-[rgba(251,191,36,0.1)]">
                        <svg className="w-3.5 h-3.5 text-fair" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 
                                0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 
                                1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 
                                00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 
                                1 0 00.951-.69l1.519-4.674z"
                            />
                        </svg>
                    </Link>
                </div>
            )
        }
    ];
    
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
                    columns={pastAppointmentsColumns}
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

            { clickedRow &&
                <CustomerBookingsCardModal 
                    modal={'reschedule'} 
                    setIsOpenModal={() => setClickedRow(null)} 
                    title={clickedRow.service_id.title}
                    duration={clickedRow.duration}
                    notes={clickedRow.notes}
                    paymentStatus={clickedRow.paymentStatus}
                    status={clickedRow.status}
                    providerName={clickedRow.admin_id.name}
                    amount={clickedRow.amount}
                    icon={clickedRow.service_id.icon}
                    iconBg={clickedRow.service_id.iconBg}
                    time={clickedRow.startTime + '~' + clickedRow.endTime}
                    timeText={clickedRow.startTime}
                    appointmentId={clickedRow._id}
                    serviceId={clickedRow.service_id._id}
                    adminId={clickedRow.admin_id._id}
                />
            }
        </>
    )
}

const PAST_APPOINTMENTS_COLUMNS = [
    {label: 'SERVICE', fieldName: 'service', className: 'font-medium text-tx'},
    {label: 'PROVIDER', fieldName: 'provider', className: 'text-muted'},
    {label: 'DATE & TIME', fieldName: 'datetime', className: 'text-muted hidden sm:table-cell', headerClass: 'hidden sm:table-cell'},
    {label: 'DURATION', fieldName: 'duration', className: 'text-muted hidden md:table-cell', headerClass: 'hidden sm:table-cell'},
    {label: 'STATUS', fieldName: 'status', 
        typeAttributes: {
            className: (row) => row?.status === 'completed' ? 'badge badge-completed capitalize' 
                : row?.status === 'pending' ? 'badge badge-pending capitalize' : 'badge badge-cancelled capitalize'
        }
    },
    {label: 'PAYMENT', fieldName: 'paymentStatus', typeAttributes: {
            className: (row) => row?.paymentStatus === 'paid' ? 'badge badge-paid capitalize' 
                : row?.paymentStatus === 'unpaid' ? 'badge badge-unpaid capitalize' : 'badge badge-refunded capitalize'
        }
    },
    {label: 'AMOUNT', fieldName: 'amount', className: 'hidden lg:table-cell font-medium text-good', headerClass: 'hidden sm:table-cell'}
];

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