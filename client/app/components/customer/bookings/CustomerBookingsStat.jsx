import React from 'react'

const CustomerBookingsStat = ({ title, stat, subtitle, colorClass = 'text-tx' }) => {
    return (
        <div className="glass2 rounded-2xl p-4">
            <p className="text-muted text-xs font-medium uppercase tracking-wide mb-1">{ title }</p>
            <p className={`text-2xl font-bold ${colorClass}`}>{ stat }</p>
            <p className="text-xs text-muted mt-1">{ subtitle }</p>
        </div>
    )
}

export default CustomerBookingsStat