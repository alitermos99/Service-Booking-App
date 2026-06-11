'use client'

import React from 'react'
import CustomerServicesService from './CustomerServicesService';

const CustomerServicesGrid = ({ services }) => {
    return (
        <>
            {
                services && services.length &&
                services.map(service => (
                    <CustomerServicesService
                        key={service._id}
                        icon={service.icon}
                        adminId={service.admin_id}
                        title={service.title}
                        short={service.short}
                        description={service.description}
                        duration={service.duration}
                        price={service.price}
                        isActive={service.isActive}
                    />
                ))
            }
        </>
    )
}

export default CustomerServicesGrid