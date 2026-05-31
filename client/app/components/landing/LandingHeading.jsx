import React from 'react'

const LandingHeading = ({ title, description }) => {
    return (
        <div className="text-center mb-16">
            <div className="text-sm font-mono font-medium mb-3 text-accent uppercase">{ title }</div>
            <h2 className="text-4xl sm:text-5xl font-bold text-tx">{ description }</h2>
        </div>
    )
}

export default LandingHeading