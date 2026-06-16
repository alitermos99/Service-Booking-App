import React from 'react'
import CustomerBookDetails from './CustomerBookDetails'
import CustomerBookSummary from './CustomerBookSummary'

const CustomerBookMainContent = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-5">
                <CustomerBookDetails />
            </div>

            <CustomerBookSummary />
        </div>
    )
}

export default CustomerBookMainContent