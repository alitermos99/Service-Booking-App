'use client'

import React, { useEffect, useState } from 'react'
import TextArea from '../../forms/TextArea'
import Button from '../../ui/Button'
import { useRouter, useSearchParams } from 'next/navigation'
import { sanitizeInput } from '@/app/utils/inputUtils'
import { useCreateAppointment } from '@/app/features/appointment/hooks/useCreateAppointment'
import LoadingOverlay from '../../ui/LoadingOverlay'
import { buildISODateTime, TODAY } from '@/app/utils/dateUtils';
import { useUpdateAppointment } from '@/app/features/appointment/hooks/useUpdateAppointment'
import { useGetAppointment } from '@/app/features/appointment/hooks/useGetAppointment'

const CustomerBookDetails = ({ activeStep, setActiveStep, setCompletedSteps }) => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const title = searchParams.get('title');
    const serviceId = searchParams.get('serviceId');
    const startTime = searchParams.get('startTime');
    const appointmentId = searchParams.get('appointmentId');

    const { data, isPending: getPending } = useGetAppointment(appointmentId);
    const { mutateAsync: createAppointmentAsync, isPending } = useCreateAppointment();
    const { mutate: updateAppointment, isPending: updatePending } = useUpdateAppointment();

    const [notes, setNotes] = useState('');

    const handleChange = (event) => {
        const { value } = event.target;
        setNotes(value);
    }

    const handleStepChange = () => {
        setCompletedSteps(prev => {
            return [
                ...prev,
                activeStep
            ]
        });
        setActiveStep(activeStep + 1);
    }

    const insertAppointment = async () => {
        const start = buildISODateTime(TODAY, startTime);

        try {
            const data = await createAppointmentAsync({
                startTime: start,
                notes: sanitizeInput(notes),
                serviceId
            });
            router.push(`/book?serviceId=${serviceId}&startTime=${startTime}&title=${encodeURIComponent(title)}&appointmentId=${data?.appointment?._id}`);
        } catch (err) {}
    }

    const handleAppointmentCreation = async () => {
        if(!appointmentId) {
            insertAppointment();
        }
        else {
            if(notes !== data?.appointment?.notes) {
                updateAppointment({
                    id: appointmentId,
                    body: { notes: sanitizeInput(notes) }
                });
            }
        }

        handleStepChange();
    }

    useEffect(() => {
        function handleNotesInfo() {
            if(data) {
                setNotes(data.appointment?.notes);
            }
        }

        handleNotesInfo();
    }, [data]);

    return (
        <>
            { (isPending || updatePending || getPending) && <LoadingOverlay /> }

            <div className="glass2 rounded-2xl p-5 space-y-4">
                <h2 className="font-semibold text-tx">Your Details</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="sm:col-span-2">
                        <TextArea label="Special Requests / Notes" className="resize-none" 
                            placeholder="Any special requests, allergies, or preferences..."
                            labelClass="block text-xs font-medium text-muted mb-1.5"
                            value={notes}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="flex gap-2">
                    <Button className="flex-1 btn-primary text-white rounded-xl py-2.5 text-sm font-medium" 
                        label="Continue to Payment →" onClick={handleAppointmentCreation}
                    />
                </div>
            </div>
        </>
    )
}

export default CustomerBookDetails