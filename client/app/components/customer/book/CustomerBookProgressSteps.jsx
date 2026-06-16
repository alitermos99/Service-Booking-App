import React from 'react';
import ProgressStep from '../../ui/ProgressStep';

const STEPS = [
    {label: 'Service', value: 'service'},
    {label: 'Details', value: 'details'},
    {label: 'Payment', value: 'payment'},
]

const CustomerBookProgressSteps = () => {
    return (
        <div className="flex items-center gap-2 sm:gap-3 mb-8">
            {
                STEPS.map((step, index) => (
                    <ProgressStep key={step.value} label={step.label} 
                        stepNumber={index + 1}
                    />
                ))
            }
        </div>
    )
}

export default CustomerBookProgressSteps