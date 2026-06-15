import React, { useState } from 'react'
import Button from '../../ui/Button'
import CustomerServicesGridModal from './CustomerServicesServiceModal'

const DEFAULT_ICON_BG = 'linear-gradient(135deg,rgba(108,99,255,0.2),rgba(167,139,250,0.2))';

const CustomerServicesService = ({ serviceId, adminId, icon, iconBg, title, short, description, price, duration, isActive, 
    avgRating = 0, totalReviews = 0
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const stars = Array.from({ length: Math.round(avgRating) }, (_, i) => i + 1);

    return (
        <>
            <div className="service-card flex flex-col justify-between">
                <div className="flex items-start justify-between mb-3">
                    <div className="w-11 h-11 rounded-xl flex items-center justify-center"
                        style={{ background: iconBg ?? DEFAULT_ICON_BG }}
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
                    {!stars?.length
                        ? <p className="text-xs text-muted">No rating available</p>
                        : <>
                            {stars.map(star => (
                                <span key={star} className="text-fair text-xs">★</span>
                            ))}

                            <span className="text-sm text-muted ml-1">{avgRating} · {totalReviews} review(s)</span>
                        </>
                    }
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
                    title={title}
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
        </>
    )
}

export default CustomerServicesService