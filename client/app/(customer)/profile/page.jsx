'use client'

import React from 'react';
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