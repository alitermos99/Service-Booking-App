import CustomerBookProgressSteps from '@/app/components/customer/book/CustomerBookProgressSteps'
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

            <div className="max-w-4xl mx-auto py-8">
                <CustomerBookProgressSteps />
            </div>
        </>
    )
}

export default CustomerBookPage