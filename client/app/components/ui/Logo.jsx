import Link from 'next/link'
import React from 'react'

const Logo = ({ className = '' }) => {
    return (
        <Link href="/" className={className + ' inline-flex items-center gap-2'}>
            <div className="w-8 h-8 rounded-lg btn-primary flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                </svg>
            </div>

            <span className="font-bold text-xl">
                Reserv<span style={{ color: "#6c63ff" }}>Ease</span>
            </span>
        </Link>
    )
}

export default Logo