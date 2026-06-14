import React from 'react'
import Button from './Button'

const DataTable = ({ columns = [], data = [], className = 'overflow-x-auto', tableClass = '' }) => {
    const resolveObject = (obj = {}, row, context = {}) => {
        return Object.fromEntries(
            Object.entries(obj).map(([key, value]) => {
                if (typeof value !== 'function') {
                    return [key, value];
                }

                if (key.startsWith('on')) {
                    return [
                        key,
                        (event) => value(event, row, context)
                    ];
                }

                return [
                    key,
                    value(row, context)
                ];
            })
        );
    };

    const resolveColumn = (column, row, context) => {
        return resolveObject(column.typeAttributes, row, context);
    };

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
                    {data.map(row => {
                        return (
                            <tr key={row._id} className="cursor-pointer">
                                {columns.map(column => {
                                    const resolvedAttributes = resolveColumn(column, row, {
                                        column
                                    });

                                    return (
                                        <td key={column.fieldName} className={column.className}>
                                            { !column.type && <span { ...resolvedAttributes }>{ row[column.fieldName] }</span> }

                                            { column.type?.toLowerCase() === 'button' && 
                                                <Button 
                                                    { ...resolvedAttributes }
                                                />
                                            }

                                            {
                                                column.type?.toLowerCase() === 'custom' &&
                                                column.render(row)
                                            }

                                            {
                                                column.type?.toLowerCase() === 'formula' &&
                                                <span { ...resolvedAttributes }>{ column.formula(row) }</span>
                                            }
                                        </td>
                                    )
                                })}
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default DataTable