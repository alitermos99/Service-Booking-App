import React, { useState } from 'react'
import Header from '../ui/Header'
import Logo from '../ui/Logo'
import Link from 'next/link'
import UserAvatar from '../ui/UserAvatar';
import { useLogout } from '@/app/features/auth/hooks/useLogout';
import LoadingOverlay from '../ui/LoadingOverlay';

const LandingHeader = ({ user }) => {
    const { mutate: logout, isPending } = useLogout();

    const handleLogout = () => {
        logout();
    }

    if(isPending) {
        <LoadingOverlay />
    }

    return (
        <Header>
            <Logo spanClass="font-semibold text-tx text-lg tracking-tight" />

            <div className="md:flex items-center gap-8">
                <Link href="#features" className="text-muted hover:text-tx text-sm transition-colors">
                    Features
                </Link>

                <Link href="#how" className="text-muted hover:text-tx text-sm transition-colors">
                    How it works
                </Link>
            </div>

            {
                !user &&
                (
                    <div className="flex items-center gap-3">
                        <Link href="/login" className="text-sm text-muted hover:text-tx transition-colors px-4 py-2">
                            Sign in
                        </Link>

                        <Link href="/register" className="btn-primary text-white text-sm font-medium px-4 py-2 rounded-xl transition-btn">
                            Get started
                        </Link>
                    </div>
                )
            }

            { 
                user && 
                (
                    <UserAvatar user={user} showDropdown>
                        <span onClick={handleLogout}>
                            Log out
                        </span>
                    </UserAvatar>
                )
            }
        </Header>
    )
}

export default LandingHeader