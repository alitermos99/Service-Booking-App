import Link from 'next/link'
import React from 'react'

const LandingFooter = () => {
    return (
        <footer className="py-10 px-4 sm:px-6" style={{ borderTop: '1px solid rgba(255,255,255,0.094)' }}>
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
                <span className="text-sm font-medium text-tx">Reserv<span className="text-accent">Ease</span></span>

                <p className="text-xs text-muted">© { new Date().getFullYear() } ReservEase. All rights reserved.</p>

                <div className="flex gap-6 text-xs text-muted">
                    <Link href="#" className="hover:text-tx transition-colors">Privacy</Link>
                    <Link href="#" className="hover:text-tx transition-colors">Terms</Link>
                    <Link href="#" className="hover:text-tx transition-colors">Support</Link>
                </div>
            </div>
        </footer>
    )
}

export default LandingFooter