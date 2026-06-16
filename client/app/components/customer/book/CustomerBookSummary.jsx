import React from 'react'

const CustomerBookSummary = () => {
    return (
        <div className="lg:col-span-1">
            <div className="glass2 rounded-2xl p-5 space-y-4 sticky top-24">
                <h3 className="font-semibold text-tx text-sm">Booking Summary</h3>

                <div className="flex items-center gap-3 pb-4 border-b border-[rgba(255,255,255,0.07)]">
                    <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0 
                        bg-[linear-gradient(135deg,rgba(108,99,255,0.2),rgba(167,139,250,0.2))]" 
                    >
                        <span className="text-2xl">💆</span>
                    </div>

                    <div>
                        <p className="text-sm font-semibold text-tx">Deep Tissue Massage</p>
                        <p className="text-xs text-muted">Jane&apos;s Beauty Studio</p>
                    </div>
                </div>

                <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-muted">
                        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>

                        <span>60 minutes</span>
                    </div>

                    <div className="flex items-center gap-2 text-muted" id="summaryDate">
                        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>

                        <span>Tue, June 3 · 10:00 AM</span>
                    </div>

                    <div className="flex items-center gap-2 text-muted">
                        <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                        </svg>

                        <span>123 Wellness Ave, Suite 4</span>
                    </div>
                </div>

                <div className="pt-3 border-t space-y-2 border-[rgba(255,255,255,0.07)]">
                    <div className="flex justify-between text-sm">
                        <span className="text-muted">Service total</span>
                        <span className="text-tx">$85.00</span>
                    </div>

                    <div className="flex justify-between text-sm">
                        <span className="text-muted">Deposit due</span>
                        <span className="text-success font-semibold">$20.00</span>
                    </div>
                </div>
                
                <div className="flex items-center gap-1.5 text-xs text-muted">
                    <svg className="w-3.5 h-3.5 text-good" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 
                            9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                        />
                    </svg>

                    Free cancellation up to 24 hours before
                </div>
            </div>
        </div>
    )
}

export default CustomerBookSummary