import React from 'react'
import Button from './Button'

const Chip = ({ chipLabel, chipName, onSelect, isActive = false }) => {
    return (
        <Button className={`cat-chip ${isActive ? 'active' : 'hover:border-accent border border-solid border-card'}`} 
            label={chipLabel} 
            name={chipName} 
            onClick={onSelect} 
        />
    )
}

export default Chip