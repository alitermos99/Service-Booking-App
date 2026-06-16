import React from 'react'

const ProgressStep = ({ label, stepNumber, isActive = false, isCompleted = false, isLast = false }) => {
    return (
        <>
            <div className="step-item">
                <div className={`step-num 
                    ${isCompleted ? 'done' : isActive ? 'active' : 'pending'}
                `}>
                    {isCompleted ? '✓' : stepNumber}
                </div>

                <span className={`text-xs font-medium hidden sm:block
                    ${isCompleted ? 'text-accent-soft' : isActive ? 'text-tx' : ''}
                `}
                >
                    { label }
                </span>
            </div>

            {
                !isLast &&
                <div className={`step-line
                    ${isCompleted ? 'done' : 'pending'}
                `}></div>
            }
        </>
    )
}

export default ProgressStep