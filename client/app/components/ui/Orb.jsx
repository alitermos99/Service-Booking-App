import React from 'react'

const Orb = ({ className = '' }) => (
    <div
        className={`absolute pointer-events-none rounded-full blur-[80px] ${className}`}
    />
);

export default Orb