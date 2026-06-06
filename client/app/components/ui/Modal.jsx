import React from 'react'

const Modal = ({ children, className = '' }) => {
    return (
        <div className={`fixed flex inset-0 bg-[rgba(0,0,0,0.7)] backdrop-blur-xs z-100 items-center justify-center p-4 ${className}`}>
            { children }
        </div>
    )
}

export default Modal