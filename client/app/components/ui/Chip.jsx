import React from 'react'
import Button from './Button'

const Chip = ({ chipLabel, chipName, onSelect, isActive = false }) => {
    return (
        <Button className={`cat-chip ${isActive ? 'active' : ''}`} 
            label={chipLabel} 
            name={chipName} 
            onClick={onSelect} 
        />
    )
}

export default Chip