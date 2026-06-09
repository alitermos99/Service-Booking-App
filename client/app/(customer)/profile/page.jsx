'use client'

import React from 'react';
import Link from 'next/link';
import Logo from '@/app/components/ui/Logo';
import Header from '@/app/components/ui/Header';
import CustomerUserAvatar from '@/app/components/customer/CustomerUserAvatar';
import CustomerProfileHero from '@/app/components/customer/profile/CustomerProfileHero';
import CustomerProfileTabs from '@/app/components/customer/profile/CustomerProfileTabs';
import CustomerHeader from '@/app/components/customer/CustomerHeader';

const CustomerProfilePage = () => {
    return (
        <>
            <CustomerHeader />

            <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
                <CustomerProfileHero />
                <CustomerProfileTabs />
            </div>
        </>
    )
}

export default CustomerProfilePage