import React from 'react'
import Button from '../../ui/Button'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation';
import { useGetService } from '@/app/features/service/hooks/useGetService';
import LoadingOverlay from '../../ui/LoadingOverlay';
import CustomerBookPaymentInfo from './CustomerBookPaymentInfo';
import { buildISODateTime, formatBookingDate, formatTime, formatTo12hr, formatTo2Decimals, TODAY } from '@/app/utils/dateUtils';
import { useGetAppointment } from '@/app/features/appointment/hooks/useGetAppointment';

const CustomerBookPayment = ({ activeStep, setActiveStep, setCompletedSteps }) => {
    const searchParams = useSearchParams();
    const serviceId = searchParams.get('serviceId');
    const startTime = searchParams.get('startTime');
    const appointmentId = searchParams.get('appointmentId');

    const { data, isPending } = useGetService(serviceId);
    const { data: appointmentData, isPending: pendingAppointment } = useGetAppointment(appointmentId);

    const handleStepChange = () => {
        setActiveStep(activeStep - 1);
        setCompletedSteps(prev => prev.filter(step => step !== (activeStep - 1)));
    };

    return (
        <>
            { (isPending || pendingAppointment) && <LoadingOverlay /> }

            <div className="glass2 rounded-2xl p-5 space-y-4">
                <h2 className="font-semibold text-tx">Review & Pay</h2>

                <div className="glass2 rounded-xl p-4 space-y-2 text-sm">
                    <CustomerBookPaymentInfo 
                        title="Service" value={data?.service?.title}
                    />

                    <CustomerBookPaymentInfo 
                        title="Date" value={formatBookingDate(buildISODateTime(TODAY, startTime))}
                    />

                    <CustomerBookPaymentInfo 
                        title="Time" 
                        value={`${formatTo12hr(startTime)} - ${formatTime(appointmentData?.appointment?.endTime)}`}
                    />

                    <CustomerBookPaymentInfo 
                        title="Duration" value={`${data?.service?.duration} min`}
                    />

                    <hr className="bg-[rgba(255,255,255,0.07)]"/>

                    <CustomerBookPaymentInfo 
                        title="Total" 
                        value={`$${formatTo2Decimals((data?.service?.price + 20) || 0)}`}
                        valueClass="font-semibold"
                    />

                    <CustomerBookPaymentInfo 
                        title="Deposit Now" 
                        value={`$${formatTo2Decimals(20)}`}
                        valueClass="font-semibold"
                    />

                    <CustomerBookPaymentInfo 
                        title="Due at session" 
                        value={`$${formatTo2Decimals(data?.service?.price || 0)}`}
                    />
                </div>

                <div className="flex items-start gap-2 text-xs text-muted p-3 rounded-xl bg-[rgba(108,99,255,0.08)] 
                    border border-solid border-[rgba(108,99,255,0.2)]" 
                >
                    <svg className="w-4 h-4 shrink-0 mt-0.5 text-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>

                A $20 deposit is required to secure your booking. The remaining balance is paid at the time of your appointment.
                </div>

                <div className="flex gap-2">
                    <Button className="glass2 rounded-xl py-2.5 px-5 text-sm font-medium text-muted hover:text-tx transition-colors" 
                        label="← Back" onClick={handleStepChange}
                    />
                    
                    <Link href="/checkout" className="flex-1 btn-primary text-white rounded-xl py-2.5 text-sm font-medium text-center 
                        flex items-center justify-center gap-2"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                            />
                        </svg>
                        Pay $20.00 Deposit
                    </Link>
                </div>
            </div>
        </>
    )
}

export default CustomerBookPayment