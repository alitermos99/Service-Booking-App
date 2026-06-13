'use client'

import React from 'react'

const SelectField = ({ onChange, className = 'bg-transparent outline-none text-muted text-xs', options = [] }) => {
    return (
        <>
            {
                !!options?.length &&
                (
                    <select className={className} onChange={onChange}>
                        {
                            options.map(option => (
                                <option key={option.value} value={option?.value}>{ option.label }</option>
                            ))
                        }
                    </select>
                )
            }
        </>
    )
}

export default SelectField