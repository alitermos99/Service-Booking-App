import React from 'react'

const ProcessStep = ({ step, heading, description, className = ''}) => {
    return (
        <div className="text-center">
            <div className={`w-16 h-16 rounded-2xl mx-auto flex items-center justify-center mb-5 ${className}`}>
                <span className="text-2xl font-bold text-white">
                    { step }
                </span>
            </div>

            <h3 className="text-xl font-semibold text-tx mb-3">{ heading }</h3>

            <p className="text-muted text-sm leading-relaxed">
                { description }
            </p>
        </div>
    )
}

export default ProcessStep