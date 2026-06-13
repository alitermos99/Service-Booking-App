import React from 'react'

const DataTable = ({ columns = [], data = [], className = 'overflow-x-auto', tableClass = '' }) => {
    return (
        <div className={className}>
            <table className={tableClass}>
                <thead>
                    <tr>
                        {
                            !!columns?.length &&
                            columns.map((column, index) => (
                                <th key={index} className={column.className + ' ' + 'text-left'}>{ column.label }</th>
                            ))
                        }
                    </tr>
                </thead>

                <tbody>
                    {data.map(row => (
                        <tr key={row._id} className="cursor-pointer">
                            {columns.map(column => (
                                <td key={column.fieldName} className={column.className}>
                                    <span>{row[column.fieldName]}</span>
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default DataTable