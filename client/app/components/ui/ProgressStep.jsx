import React from 'react'

const ProgressStep = ({ title }) => {
    return (
        <>
            <div className="step-item">
                <div className="step-num done">✓</div>
                <span className="text-xs font-medium hidden sm:block text-accent-soft">{ title }</span>
            </div>

            <div className="step-line done"></div>
        </>
    )
}

export default ProgressStep