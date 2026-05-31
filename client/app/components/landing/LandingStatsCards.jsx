import React from 'react'
import StatsCard from '../ui/StatsCard'

const LandingStatsCards = () => {
    return (
        <div className="grid grid-cols-3 gap-4 mt-20 max-w-lg mx-auto">
            <StatsCard 
                stat="12k+"
                subtitle="Bookings/mo"
            />

            <StatsCard 
                stat="98%"
                subtitle="Uptime"
            />

            <StatsCard 
                stat="4.9★"
                subtitle="Rating"
            />
        </div>
    )
}

export default LandingStatsCards