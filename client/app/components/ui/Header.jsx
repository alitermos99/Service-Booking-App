import React from 'react'

const Header = ({ children, className = '' }) => {
    return (
        <nav className={className + ' fixed top-0 inset-x-0 z-50 glass'}>
            <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
                { children }
            </div>
        </nav>
    )
}

export default Header