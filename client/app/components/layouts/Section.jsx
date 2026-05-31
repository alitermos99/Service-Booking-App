import React from 'react'

const Section = ({ id, children, className = '', maxWidth = 'max-w-7xl', style }) => {
    return (
        <section
            id={id}
            style={style}
            className={`py-24 px-4 sm:px-6 ${maxWidth} mx-auto ${className}`}
            >
            {children}
        </section>
    );
}

export default Section