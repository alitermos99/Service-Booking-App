import React from 'react'
import Orb from '../ui/Orb'
import Link from 'next/link'

const LandingCTASection = ({ user }) => {
    const title = user ? 'Welcome back! Ready to manage your bookings?' : 'Ready to streamline your bookings?';
    const text = user ? 'View your dashboard or create a new reservation.' : 'Join hundreds of businesses already using ReservEase.';
    return (
        <div className="max-w-3xl mx-auto text-center glass rounded-3xl p-12 relative overflow-hidden">
            <Orb
                size="w-64 h-64"
                color="#6c63ff"
                opacity={0.18}
                className="-top-16 -left-16"
            />

            <Orb
                size="w-48 h-48"
                color="#a78bfa"
                opacity={0.13}
                className="-bottom-12 -right-12"
            />

            <div className="relative z-10">
                <h2 className="text-4xl sm:text-5xl font-bold text-tx mb-4">{ title }</h2>
                <p className="text-muted text-lg mb-8">{ text }</p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    {
                        !user &&
                        (
                            <>
                                <Link href="/register"
                                    className="btn-primary text-white font-semibold px-8 py-4 rounded-2xl transition-btn shadow-[0 0 40px rgba(108,99,255,0.3)]" 
                                >
                                    Create free account
                                </Link>

                                <Link href="/login" 
                                    className="glass text-tx font-medium px-8 py-4 rounded-2xl btn-secondary transition-colors"
                                >
                                    Sign in
                                </Link>
                            </>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default LandingCTASection