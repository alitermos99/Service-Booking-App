import CustomerBookMainContent from '@/app/components/customer/book/CustomerBookMainContent'
import CustomerBookProgressSteps from '@/app/components/customer/book/CustomerBookProgressSteps'
import Section from '@/app/components/layouts/Section'
import Header from '@/app/components/ui/Header'
import Logo from '@/app/components/ui/Logo'
import React from 'react'

const CustomerBookPage = () => {
    return (
        <>
            <Header>
                <Logo spanClass="font-semibold text-tx text-lg tracking-tight" />
                <p className="text-sm text-muted hidden sm:block">Booking · Deep Tissue Massage</p>
            </Header>

            <Section maxWidth="max-w-4xl" padding="py-8">
                <CustomerBookMainContent />
            </Section>
        </>
    )
}

export default CustomerBookPage