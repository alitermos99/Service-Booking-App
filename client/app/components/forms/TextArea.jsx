import React from 'react'

const TextArea = ({ className, label, showCount = false, value = '', labelClass = '', rows = 3, maxLength = 5000, ...rest }) => {
    return (
        <div>
            <div className="m-0">
                <label className={`text-sm mb-1 ${labelClass}`}>{ label }</label>
            </div>

            <textarea value={value} maxLength={maxLength} className={`${className} input-field`} style={{ resize: 'vertical' }} 
                rows={rows} { ...rest } >
            </textarea>

            {
                showCount &&
                (
                    <div>
                        <span className="text-xs text-muted mt-1.5 text-right block">{ value.length } / { maxLength }</span>
                    </div>
                )
            }
        </div>
    )
}

export default TextArea