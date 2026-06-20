'use client'

import React from 'react'
import { useSearchParams } from 'next/navigation';
import Logo from '@/app/components/ui/Logo'
import Header from '@/app/components/ui/Header'
import Section from '@/app/components/layouts/Section'
import CustomerBookMainContent from '@/app/components/customer/book/CustomerBookMainContent'

const CustomerBookPage = () => {
    const searchParams = useSearchParams();
    const title = searchParams.get('title');

    return (
        <>
            <Header>
                <Logo spanClass="font-semibold text-tx text-lg tracking-tight" />
                <p className="text-sm text-muted hidden sm:block">Booking · { title }</p>
            </Header>

            <Section maxWidth="max-w-4xl" padding="py-8">
                <CustomerBookMainContent />
            </Section>
        </>
    )
}

export default CustomerBookPage