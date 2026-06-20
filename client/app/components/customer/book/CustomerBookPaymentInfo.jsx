import React from 'react'

const CustomerBookPaymentInfo = ({ title, value, valueClass = '' }) => {
    return (
        <div className="flex justify-between">
            <span className="text-muted">{ title }</span>
            <span className={`${valueClass} text-tx`}>{ value }</span>
        </div>
    )
}

export default CustomerBookPaymentInfo