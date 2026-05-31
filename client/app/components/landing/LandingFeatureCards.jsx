import React from 'react'
import FeatureCard from '../ui/FeatureCard'

const LandingFeatureCards = () => {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard 
                title="Role-Based Auth"
                description="Customers, Admins, and Super Admins each get tailored dashboards with JWT-secured routes."
                bgColor="bg-[rgba(108,99,255,0.2)]"
                iconColor="text-accent"
                icon={
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        />
                    </svg>
                }
            />

            <FeatureCard 
                title="Smart Scheduling"
                description="Automatically prevents double-bookings by checking slot availability against existing appointments."
                bgColor="bg-[rgba(56,189,248,0.2)]"
                iconColor="text-[#a78bfa]"
                icon={
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                    </svg>
                }
            />

            <FeatureCard 
                title="Stripe Payments"
                description="Accept deposits on booking with Stripe. Track paid, unpaid, and refunded statuses with intent IDs."
                bgColor="bg-[rgba(56,189,248,0.2)]"
                iconColor="text-[#38bdf8]"
                icon={
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                            d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                        />
                    </svg>
                }
            />

            <FeatureCard 
                title="Email Notifications"
                description="Automatic confirmation emails via SendGrid, keeping customers in the loop."
                bgColor="bg-[rgba(52,211,153,0.2)]"
                iconColor="text-[#34d39]"
                icon={
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                            d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                    </svg>
                }
            />

            <FeatureCard 
                title="Role-Based Auth"
                description="Customers, Admins, and Super Admins each get tailored dashboards with JWT-secured routes."
                bgColor="bg-[rgba(248,113,113,0.2)]"
                iconColor="text-[#f87171]"
                icon={
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                            d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                    </svg>
                }
            />

            <FeatureCard 
                title="Reviews System"
                description="Post-appointment reviews linked to users build trust and credibility for your business."
                bgColor="bg-[rgba(108,99,255,0.2)]"
                iconColor="text-[#6c63ff]"
                icon={
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" 
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                        />
                    </svg>
                }
            />
        </div>
    )
}

export default LandingFeatureCards