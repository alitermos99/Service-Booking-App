import React from 'react'

const FeatureCard = ({ icon, title, description, bgColor = '', iconColor = '' }) => {
    return (
        <div className="glass rounded-2xl p-6 card-hover">
            <div className={'w-12 h-12 rounded-xl flex items-center justify-center mb-4 ' + bgColor}>
                <div className={'w-6 h-6 ' + iconColor}>
                    { icon }
                </div>
            </div>

            <h3 className="text-lg font-semibold text-tx mb-2">{ title }</h3>
            <p className="text-muted text-sm leading-relaxed">{ description }</p>
        </div>
    )
}

export default FeatureCard