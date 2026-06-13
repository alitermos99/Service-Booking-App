import React from 'react'
import Input from './Input'

const SearchInputField = ({ placeholder = 'Search', className = '', inputClass = '', ...rest }) => {
    return (
        <div className={`${className} relative`}>
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>

            <Input type="text" placeholder={placeholder} { ...rest } 
                className={inputClass}
            />
        </div>
    )
}

export default SearchInputField