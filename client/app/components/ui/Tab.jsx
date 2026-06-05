import React from 'react'
import Button from './Button'

const Tab = ({ label, name }) => {

    return (
        <span name={name}>
            { label }
        </span>
    )
}

export default Tab