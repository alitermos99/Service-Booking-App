import React from 'react'

const Section = ({ id, children, padding = 'py-24 px-4', className = '', maxWidth = 'max-w-7xl', style }) => {
    return (
        <section
            id={id}
            style={style}
            className={`${padding} sm:px-6 ${maxWidth} mx-auto ${className}`}
        >
            {children}
        </section>
    );
}

export default Section