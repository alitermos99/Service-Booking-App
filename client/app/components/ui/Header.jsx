import React from 'react'

const Header = ({ children, className = '' }) => {
    return (
        <nav className={className + ' glass sticky top-0 z-30 h-14 flex items-center px-4 sm:px-6 gap-4'}>
            <div className="px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 flex-1">
                { children }
            </div>
        </nav>
    )
}

export default Header