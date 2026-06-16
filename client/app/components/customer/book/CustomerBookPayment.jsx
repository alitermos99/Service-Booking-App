import React from 'react'
import Button from '../../ui/Button'
import Link from 'next/link'

const CustomerBookPayment = ({ activeStep, setActiveStep, setCompletedSteps }) => {
    const handleStepChange = () => {
        setActiveStep(activeStep - 1);
        setCompletedSteps(prev => prev.filter(step => step !== (activeStep - 1)));
    };

    return (
        <div className="glass2 rounded-2xl p-5 space-y-4">
            <h2 className="font-semibold text-tx">Review & Pay</h2>

            <div className="glass2 rounded-xl p-4 space-y-2 text-sm">
                <div className="flex justify-between">
                    <span className="text-muted">Service</span>
                    <span className="text-tx">Deep Tissue Massage</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-muted">Date</span>
                    <span className="text-tx">Tuesday, June 3, 2025</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-muted">Time</span>
                    <span className="text-tx">10:00 AM – 11:00 AM</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-muted">Duration</span>
                    <span className="text-tx">60 minutes</span>
                </div>

                <hr className="bg-[rgba(255,255,255,0.07)]"/>

                <div className="flex justify-between">
                    <span className="text-muted">Total</span>
                    <span className="text-tx font-semibold">$85.00</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-muted">Deposit now</span>
                    <span className="text-success font-semibold">$20.00</span>
                </div>

                <div className="flex justify-between">
                    <span className="text-muted">Due at session</span>
                    <span className="text-tx">$65.00</span>
                </div>
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
    )
}

export default CustomerBookPayment