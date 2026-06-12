import React, { useEffect, useState } from 'react'
import Button from '../../ui/Button'
import CustomerServicesGridModal from './CustomerServicesServiceModal'

const CustomerServicesService = ({ serviceId, adminId, icon, title, short, description, price, duration, isActive, 
    avgRating = 0, totalReviews = 0
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const stars = Array.from({ length: Math.round(avgRating) }, (_, i) => i + 1);

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <div className="service-card">
                <div className="flex items-start justify-between mb-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center 
                        bg-[linear-gradient(135deg,rgba(108,99,255,0.2),rgba(167,139,250,0.2))]`}
                    >
                        <span className="text-xl">{ icon }</span>
                    </div>

                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium
                        ${isActive ? 'bg-[rgba(52,211,153,0.15)] text-good' : 'bg-[rgba(248,113,113,0.15)] text-weak'}    
                    `}>
                        {isActive ? 'Available' : 'Unavailable'}
                    </span>
                </div>

                <h3 className="font-semibold text-tx mb-1">{ title }</h3>
                <p className="text-xs text-muted mb-3 leading-relaxed">{ short }</p>

                <div className="flex items-center gap-1 mb-3">
                    {
                        stars.map(star => (
                            <span key={star} className="text-fair text-xs">★</span>
                        ))
                    }

                    <span className="text-xs text-muted ml-1">{ avgRating } ({ totalReviews })</span>
                </div>

                <div className="flex items-center justify-between">
                    <div>
                        <p className="text-lg font-bold text-tx">${price}</p>
                        <p className="text-xs text-muted">{duration} min</p>
                    </div>

                    <Button 
                        onClick={() => setIsOpen(!isOpen)}
                        label="Book Now"
                        className="btn-primary text-white rounded-xl px-4 py-2 text-sm font-medium"
                    />
                </div>
            </div>

            { isOpen && 
                <CustomerServicesGridModal 
                    serviceId={serviceId} 
                    price={price} 
                    duration={duration} 
                    description={description} 
                    stars={stars}
                    avgRating={avgRating}
                    totalReviews={totalReviews}
                    adminId={adminId}
                    setIsOpen={setIsOpen} 
                /> 
            }
        </div>
    )
}

export default CustomerServicesService