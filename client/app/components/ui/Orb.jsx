import React from 'react'

const Orb = ({ className = '', color = "#6c63ff", size = "w-64 h-64", opacity = 0.15, }) => (
    <div
        className={`absolute pointer-events-none rounded-full blur-[80px] ${size} ${className}`}
        style={{
            backgroundColor: color,
            opacity,
        }}
    />
);

export default Orb