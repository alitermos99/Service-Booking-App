import React from 'react'

const CustomerBookPaymentInfo = ({ title, value, className = '', valueClass = '' }) => {
    return (
        <div className={`${className} flex justify-between`}>
            <span className="text-muted">{ title }</span>
            <span className={`${valueClass} text-tx`}>{ value }</span>
        </div>
    )
}

export default CustomerBookPaymentInfo