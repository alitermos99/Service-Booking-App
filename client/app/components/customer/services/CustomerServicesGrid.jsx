'use client'

import React from 'react'
import CustomerServicesService from './CustomerServicesService';

const CustomerServicesGrid = ({ services }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            { (!services || !services.length) && <p>There are no available services.</p> }

            { !!services?.length && services.map(service => (
                <CustomerServicesService
                    key={service._id}
                    iconBg={service.iconBg}
                    icon={service.icon}
                    serviceId={service._id}
                    adminId={service.admin_id}
                    title={service.title}
                    short={service.short}
                    description={service.description}
                    duration={service.duration}
                    price={service.price}
                    isActive={service.isActive}
                    avgRating={service.averageRating}
                    totalReviews={service.totalReviews}
                />
            ))}
        </div>
    )
}

export default CustomerServicesGrid