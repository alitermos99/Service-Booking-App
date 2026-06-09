import React from 'react'
import Button from '../../ui/Button'

const CustomerServicesFilterSection = () => {
    return (
        <div className="px-4 lg:px-8 pb-16 max-w-7xl mx-auto">
            <div className="flex gap-2 overflow-x-auto pb-2 mb-6 hide-scrollbar">
                <Button className="cat-chip active" label="All" />
                <Button className="cat-chip" label="Massage" />
                <Button className="cat-chip" label="Hair & Beauty" />
                <Button className="cat-chip" label="Skincare" />
                <Button className="cat-chip" label="Consulting" />
                <Button className="cat-chip" label="Fitness" />
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <p className="text-sm text-muted"><span class="text-tx font-medium">{'12'}</span> services available</p>

                <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1.5 text-xs glass2 rounded-xl px-3 py-2">
                        <svg className="w-3.5 h-3.5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0014 13.828V19a1 1 0 01-1.447.894l-4-2A1 1 0 018 17v-3.172a1 1 0 00-.293-.707L1.293 6.707A1 1 0 011 6V4z"
                            />
                        </svg>

                        <select className="bg-transparent outline-none text-muted text-xs">
                            <option>Sort: Popular</option>
                            <option>Price: Low to High</option>
                            <option>Price: High to Low</option>
                            <option>Duration</option>
                            <option>Rating</option>
                        </select>
                    </div>

                    <div className="flex gap-1 glass2 rounded-xl p-1">
                        <Button 
                            className="w-7 h-7 rounded-lg flex items-center justify-center btn-primary text-white"
                            label={
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                                    />
                                </svg>
                            }
                        />

                        <Button 
                            className="w-7 h-7 rounded-lg flex items-center justify-center btn-primary text-white"
                            label={
                                <svg class="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                    />
                                </svg>
                            }
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CustomerServicesFilterSection