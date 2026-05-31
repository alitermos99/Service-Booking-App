import React from 'react'
import Orb from '../ui/Orb'
import Link from 'next/link'
import LandingStatsCards from './LandingStatsCards'
import LandingFloatingCard from './LandingFloatingCard'

const LandingHero = () => {
    return (
        <>
            <Orb className="w-96 h-96 top-1/4 left-1/4 bg-accent opacity-[0.18]" />
            <Orb className="w-80 h-80 top-1/3 right-1/4 bg-accent-soft opacity-[0.13]" />
            <Orb className="w-64 h-64 bottom-1/4 left-1/3 bg-accent-sky opacity-[0.10]" />

            <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 text-center">
                <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8">
                    <span className="w-2 h-2 rounded-full bg-good animate-glow"></span>
                    <span className="text-sm text-muted">Now with Stripe payment integration</span>
                </div>

                <h1 className="text-5xl sm:text-7xl lg:text-8xl font-bold leading-none tracking-tight mb-6">
                    Bookings that
                    <span className="block gradient-text mt-2">just work.</span>
                </h1>

                <p className="text-muted text-lg sm:text-xl max-w-2xl mx-auto mb-10">
                    ReservEase lets businesses list their services and accept appointments with built-in payments, calendar management, and customer notifications — all in one place.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link
                        href="/register"
                        className="btn-primary text-white font-semibold px-8 py-4 rounded-2xl text-base w-full sm:w-auto transition-all shadow-[0_0_40px_rgba(108,99,255,0.3)]"
                    >
                        Start for free →
                    </Link>

                    <Link href="#how" className="btn-secondary text-tx font-medium px-8 py-4 rounded-2xl text-base transition-colors w-full sm:w-auto">
                        See how it works
                    </Link>
                </div>

                <LandingStatsCards />
            </div>

            <LandingFloatingCard />
        </>
    )
}

export default LandingHero