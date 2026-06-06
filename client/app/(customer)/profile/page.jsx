'use client'

import React from 'react';
import Link from 'next/link';
import Logo from '@/app/components/ui/Logo';
import Header from '@/app/components/ui/Header';
import CustomerUserAvatar from '@/app/components/customer/CustomerUserAvatar';
import CustomerProfileHero from '@/app/components/customer/profile/CustomerProfileHero';
import CustomerProfileTabs from '@/app/components/customer/profile/CustomerProfileTabs';

const CustomerProfilePage = () => {
    return (
        <>
            <Header>
                <Logo spanClass="font-semibold text-tx text-lg tracking-tight" />

                <div className="md:flex items-center gap-8">
                    <Link href="/services" className="text-muted hover:text-tx text-sm transition-colors">
                        Services
                    </Link>

                    <Link href="/my-bookings" className="text-muted hover:text-tx text-sm transition-colors">
                        My Bookings
                    </Link>

                    <Link href="/reviews" className="text-muted hover:text-tx text-sm transition-colors">
                        Reviews
                    </Link>
                </div>

                <CustomerUserAvatar />
            </Header>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
                <CustomerProfileHero />
                <CustomerProfileTabs />
            </div>
        </>
    )
}

export default CustomerProfilePage