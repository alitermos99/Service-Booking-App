import React from 'react';

const Tab = ({ label, name }) => {

    return (
        <span name={name}>
            { label }
        </span>
    )
}

export default Tab