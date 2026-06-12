'use client'

import React, { useState } from 'react'
import Header from '../ui/Header'
import Logo from '../ui/Logo'
import Link from 'next/link'
import CustomerUserAvatar from './CustomerUserAvatar'
import { usePathname } from 'next/navigation'
import Button from '../ui/Button'
import HeaderLinks from '../ui/HeaderLinks'

const PAGES = [
    {
        label: 'Services',
        link: '/services'
    },
    {
        label: 'My Bookings',
        link: '/bookings'
    },
    {
        label: 'Reviews',
        link: '/reviews'
    }
];

const CustomerHeader = () => {
    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);

    return (
        <Header>
            <Logo spanClass="font-semibold text-tx text-lg tracking-tight" />
            <HeaderLinks pages={PAGES} isMobileNavOpen={isMobileNavOpen} setIsMobileNavOpen={setIsMobileNavOpen} />

            <div className="flex items-center gap-3">
                <CustomerUserAvatar />

                <Button className={`md:hidden w-9 h-9 rounded-xl flex items-center justify-center bg-[rgba(255,255,255,0.05)]
                        border-[rgba(255,255,255,0.094)] border-solid border
                    `}
                    label={
                        <svg className="w-4 h-4 text-tx" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/>
                        </svg>
                    }
                    onClick={() => setIsMobileNavOpen(!isMobileNavOpen)}
                />
            </div>
        </Header>
    )
}

export default CustomerHeader