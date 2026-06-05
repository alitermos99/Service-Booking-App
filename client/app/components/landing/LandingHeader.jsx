import React, { useEffect } from 'react'
import Header from '../ui/Header'
import Logo from '../ui/Logo'
import Link from 'next/link'
import LoadingOverlay from '../ui/LoadingOverlay';
import CustomerUserAvatar from '../customer/CustomerUserAvatar';
import { useUser } from '@/app/features/user/hooks/useUser';

const LandingHeader = () => {
    const { data: userObject, isPending } = useUser();
    const user = userObject?.user;

    if (isPending) {
        return <LoadingOverlay />
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
                    <CustomerUserAvatar />
                )
            }
        </Header>
    )
}

export default LandingHeader