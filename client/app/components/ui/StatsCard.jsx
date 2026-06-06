import React from 'react'

const StatsCard = ({ stat, subtitle, statStyle = 'text-2xl font-bold gradient-text', 
    cardStyle = 'rounded-2xl p-4 text-center bg-[rgba(26,26,36,0.6)] border border-solid border-[rgba(255,255,255,0.094)]',
    spacing = 'mt-1'
}) => {
    return (
        <div className={cardStyle}>
            <div className={statStyle}>
                { stat }
            </div>

            <div className={`text-xs text-muted ${spacing}`}>
                { subtitle }
            </div>
        </div>
    )
}

export default StatsCard