import React from 'react';
import ProgressStep from '../../ui/ProgressStep';

const STEPS = [
    {label: 'Service', value: 1},
    {label: 'Details', value: 2},
    {label: 'Payment', value: 3},
]

const CustomerBookProgressSteps = ({ activeStep, completedSteps = [] }) => {
    return (
        <div className="flex items-center gap-2 sm:gap-3 mb-8">
            {
                STEPS.map(step => (
                    <ProgressStep key={step.value} label={step.label} 
                        stepNumber={step.value} isActive={activeStep === step.value}
                        isCompleted={completedSteps?.includes(step.value)}
                        isLast={step.value === STEPS.length }
                    />
                ))
            }
        </div>
    )
}

export default CustomerBookProgressSteps