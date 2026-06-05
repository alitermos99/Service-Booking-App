'use client'

import CustomerUserAvatar from '@/app/components/customer/CustomerUserAvatar';
import CustomerProfileTabs from '@/app/components/customer/profile/CustomerProfileTabs';
import Header from '@/app/components/ui/Header';
import Logo from '@/app/components/ui/Logo';
import Tab from '@/app/components/ui/Tab';
import UserAvatar from '@/app/components/ui/UserAvatar';
import Link from 'next/link';
import React from 'react';

const CustomerProfilePage = () => {
    return (
        <>
            <Header>
                <Logo spanClass="font-semibold text-tx text-lg tracking-tight" />

                <div className="md:flex items-center gap-8">
                    <Link href="/services" className="text-muted hover:text-tx text-sm transition-colors">
                        Browse
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
                <div className="glass2 rounded-2xl p-6">
                    <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                        <div className="relative avatar-wrap shrink-0">
                            <div className="avatar-ring" style={{ width: '80px', height: '80px', borderRadius: '50%' }}>
                                <div className="avatar-inner h- w-full h-full flex items-center justify-center" style={{ width: '74px', height: '74px' }}>
                                    <UserAvatar
                                        avatarSize="w-[74px] h-[74px]"
                                        initialsSize="text-2xl"
                                        hideName
                                    />
                                </div>
                            </div>

                            <input id="avatar-input" type="file" accept="image/*" className="hidden"/>
                        </div>

                        <div className="text-center sm:text-left flex-1 min-w-0">
                        <h2 className="text-xl font-bold text-tx">Jane Doe</h2>
                        <p className="text-sm text-muted mt-0.5">jane.doe@gmail.com</p>
                        <div className="flex items-center justify-center sm:justify-start gap-3 mt-3 flex-wrap">
                            <span className="text-xs px-2.5 py-1 rounded-full" style={{ background: 'rgba(52,211,153,0.12)', color: '#34d399', border: '1px solid rgba(52,211,153,0.2)' }}>✓ Verified</span>
                            <span className="text-xs text-muted">Member since Jan 2024</span>
                        </div>
                        </div>

                        <div className="flex sm:flex-col gap-4 sm:gap-2 text-center shrink-0">
                        <div>
                            <p className="text-lg font-bold text-tx">12</p>
                            <p className="text-xs text-muted">Bookings</p>
                        </div>
                        <div className="w-px sm:w-auto sm:h-px bg-white/10 sm:my-1"></div>
                        <div>
                            <p className="text-lg font-bold" style={{ color: '#34d399' }}>$840</p>
                            <p className="text-xs text-muted">Spent</p>
                        </div>
                        <div className="w-px sm:w-auto sm:h-px bg-white/10 sm:my-1"></div>
                        <div>
                            <p className="text-lg font-bold" style={{ color: '#fbbf24' }}>4.9★</p>
                            <p className="text-xs text-muted">Avg rating</p>
                        </div>
                        </div>
                    </div>
                </div>

                <CustomerProfileTabs />
            </div>
        </>
    )
}

export default CustomerProfilePage