import React from 'react'
import Header from '../ui/Header'
import Logo from '../ui/Logo'
import Link from 'next/link'

const LandingHeader = () => {
    return (
        <Header>
            <Logo spanClass="font-semibold text-tx text-lg tracking-tight" />

            <div className="hidden md:flex items-center gap-8">
                <Link href="#features" className="text-muted hover:text-tx text-sm transition-colors">
                    Features
                </Link>

                <Link href="#how" className="text-muted hover:text-tx text-sm transition-colors">
                    How it works
                </Link>
            </div>

            <div className="flex items-center gap-3">
                <Link href="/login" className="text-sm text-muted hover:text-tx transition-colors px-4 py-2">
                    Sign in
                </Link>

                <Link href="/login" className="btn-primary text-white text-sm font-medium px-4 py-2 rounded-xl transition-btn">
                    Get started
                </Link>
            </div>
        </Header>
    )
}

export default LandingHeader