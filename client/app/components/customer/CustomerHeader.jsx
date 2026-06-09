'use client'

import React from 'react'
import Header from '../ui/Header'
import Logo from '../ui/Logo'
import Link from 'next/link'
import CustomerUserAvatar from './CustomerUserAvatar'
import { usePathname } from 'next/navigation'

const pages = [
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
    const currentPage = usePathname();

    return (
        <Header>
            <Logo spanClass="font-semibold text-tx text-lg tracking-tight" />

            <div className="md:flex items-center gap-8">
                {
                    pages.map((page, index) => (
                        <Link href={page.link} 
                            key={index}
                            className={`hover:text-tx text-sm transition-colors ${page.link === currentPage ? 'text-accent-soft' : 'text-muted' }`}
                        >
                            { page.label }
                        </Link>
                    ))
                }
            </div>

            <CustomerUserAvatar />
        </Header>
    )
}

export default CustomerHeader