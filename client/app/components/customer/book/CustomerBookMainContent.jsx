'use client'

import React, { useState } from 'react'
import CustomerBookDetails from './CustomerBookDetails'
import CustomerBookSummary from './CustomerBookSummary'
import CustomerBookPayment from './CustomerBookPayment'
import CustomerBookProgressSteps from './CustomerBookProgressSteps';

const CustomerBookMainContent = () => {
    const [activeStep, setActiveStep] = useState(2);
    const [completedSteps, setCompletedSteps] = useState([1]);
    
    return (
        <>
            <CustomerBookProgressSteps activeStep={activeStep} completedSteps={completedSteps} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-5">
                    { 
                        activeStep === 2 && 
                        <CustomerBookDetails activeStep={activeStep} setActiveStep={setActiveStep} 
                            setCompletedSteps={setCompletedSteps}
                        /> 
                    }

                    { 
                        activeStep === 3 && 
                        <CustomerBookPayment 
                            activeStep={activeStep} setActiveStep={setActiveStep} 
                            setCompletedSteps={setCompletedSteps} 
                        /> 
                    }
                </div>

                <CustomerBookSummary />
            </div>
        </>
    )
}

export default CustomerBookMainContent