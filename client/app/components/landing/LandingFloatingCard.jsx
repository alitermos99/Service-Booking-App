import React from 'react'

const LandingFloatingCard = () => {
    return (
        <div className="absolute right-8 top-1/3 hidden xl:block animate-float">
            <div className="glass rounded-2xl p-5 w-64 card-hover">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-xl btn-primary flex items-center justify-center">
                        <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"/>
                        </svg>
                    </div>

                    <div>
                        <div className="text-sm font-semibold text-tx">
                            Booking confirmed
                        </div>

                        <div className="text-xs text-muted">
                            Just now
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                        <span className="text-muted">Service</span>
                        <span className="text-tx">Haircut — $50</span>
                    </div>

                    <div className="flex justify-between text-xs">
                        <span className="text-muted">Date</span>
                        <span className="text-tx">Jun 12, 2:00 PM</span>
                    </div>

                    <div className="flex justify-between text-xs">
                        <span className="text-muted">Status</span>
                        <span className="font-medium text-good">Paid ✓</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LandingFloatingCard