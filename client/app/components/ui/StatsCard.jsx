import React from 'react'

const StatsCard = ({ stat, subtitle, className = '' }) => {
    return (
        <div className={className + ' rounded-2xl p-4 text-center bg-[rgba(26,26,36,0.6)] border border-solid border-[rgba(255,255,255,0.094)]'}>
            <div className="text-2xl font-bold gradient-text">
                { stat }
            </div>

            <div className="text-xs text-muted mt-1">
                { subtitle }
            </div>
        </div>
    )
}

export default StatsCard