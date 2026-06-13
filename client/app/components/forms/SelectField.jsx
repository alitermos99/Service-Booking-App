'use client'

import React from 'react'

const SelectField = ({ onChange, showIcon = false, className = 'bg-transparent outline-none text-muted text-xs', options = [] }) => {
    return (
        <>
            {
                !!options?.length &&
                (
                    <div className="flex items-center gap-1.5 text-xs glass2 rounded-xl px-3 py-2">
                        {
                            showIcon &&
                            (
                                <svg className="w-3.5 h-3.5 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                        d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-6.414 6.414A1 1 0 0014 13.828V19a1 
                                        1 0 01-1.447.894l-4-2A1 1 0 018 17v-3.172a1 1 0 00-.293-.707L1.293 6.707A1 1 0 011 6V4z"
                                    />
                                </svg>
                            )
                        }

                        <select className={className} onChange={onChange}>
                            {
                                options.map(option => (
                                    <option key={option.value} value={option?.value}>{ option.label }</option>
                                ))
                            }
                        </select>
                    </div>
                )
            }
        </>
    )
}

export default SelectField