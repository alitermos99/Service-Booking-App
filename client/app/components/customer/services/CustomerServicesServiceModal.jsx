import React from 'react'
import Modal from '../../ui/Modal'
import Button from '../../ui/Button'
import Link from 'next/link'

const CustomerServicesServiceModal = ({ serviceId, title, price, duration, description, stars, avgRating, 
    totalReviews, setIsOpen 
}) => {
    return (
        <Modal>
            {/* example */ }
            <div className="glass rounded-2xl w-full max-w-lg overflow-y-auto max-h-[90vh]">
                <div className="p-6 space-y-4">
                    <div className="flex items-start justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-tx">{ title }</h3>
                            <p className="text-muted text-sm mt-0.5">{ duration } min · ${ price }</p>
                        </div>

                        <Button 
                            label={
                                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            }
                            className="text-muted hover:text-tx transition-colors mt-1"
                            onClick={() => setIsOpen(false)}
                        />
                    </div>

                    <div className="flex items-center gap-1">
                        {
                            stars?.map(star => (
                                <span key={star} className="text-fair text-xs">★</span>
                            ))
                        }

                        <span className="text-sm text-muted ml-1">{ avgRating } · { totalReviews } reviews</span>
                    </div>

                    <p className="text-sm text-muted leading-relaxed">
                        { description }
                    </p>
                    
                    <div className="grid grid-cols-3 gap-3">
                        <div className="glass2 rounded-xl p-3 text-center">
                            <p className="text-xs text-muted">Duration</p>
                            <p className="text-sm font-semibold text-tx mt-0.5">{ duration } min</p>
                        </div>

                        <div className="glass2 rounded-xl p-3 text-center">
                            <p className="text-xs text-muted">Price</p>
                            <p className="text-sm font-semibold text-tx mt-0.5">${ price }</p>
                        </div>

                        {/* <div className="glass2 rounded-xl p-3 text-center">
                            <p className="text-xs text-muted">Deposit</p>
                            <p className="text-sm font-semibold text-success mt-0.5">$20</p>
                        </div> */}
                    </div>

                    <div>
                        <p className="text-sm font-medium text-tx mb-2">Available Today</p>

                        <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
                            <Button className="glass2 rounded-xl py-2 text-xs text-tx hover:border-accent transition-colors border-[rgba(108,99,255,0.4)]!" 
                                label="9:00 AM" 
                            />

                            <Button className="glass2 rounded-xl py-2 text-xs text-tx hover:border-accent transition-colors" 
                                label="11:00 AM" 
                            />

                            <Button className="glass2 rounded-xl py-2 text-xs text-muted line-through" 
                                label="1:00 PM"
                                disabled 
                            />

                            <Button className="glass2 rounded-xl py-2 text-xs text-tx hover:border-accent transition-colors" 
                                label="3:00 PM" 
                            />

                            <Button className="glass2 rounded-xl py-2 text-xs text-tx hover:border-accent transition-colors" 
                                label="4:30 PM" 
                            />

                            <Button className="glass2 rounded-xl py-2 text-xs text-muted line-through" 
                                label="5:00 PM" 
                                disabled
                            />
                        </div>

                    </div>

                    <Link href="/book" className="btn-primary text-white rounded-xl py-3 text-sm font-medium w-full flex items-center justify-center gap-2">
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            Continue to Book
                    </Link>
                </div>
            </div>
        </Modal>
    )
}

export default CustomerServicesServiceModal