import React from 'react'
import ProcessStep from '../ui/ProcessStep'

const LandingProcessSteps = () => {
    return (
        <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-8">
            <ProcessStep 
                className="btn-primary"
                step="1"
                heading="Create your business"
                description="Register as an admin, add your services with prices and durations. You&apos;re live in minutes."
            />

            <ProcessStep 
                className='bg-[linear-gradient(135deg,#a78bfa,#38bdf8)]'
                step="2"
                heading="Customers book &amp; pay"
                description="Customers browse your services, pick a slot, and pay a deposit via Stripe — all in one flow."
            />

            <ProcessStep 
                className="bg-[linear-gradient(135deg,#38bdf8,#34d399)]"
                step="3"
                heading="Manage &amp; grow"
                description="Use your dashboard to confirm, reschedule, or cancel bookings and track your revenue growth."
            />
        </div>
    )
}

export default LandingProcessSteps