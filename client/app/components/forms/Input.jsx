import React from 'react'

const Input = ({ className = '', ...rest }) => {
    return (
        <input
            className={`${className} input-field`}
            { ...rest }
        />
    )
}

export default Input