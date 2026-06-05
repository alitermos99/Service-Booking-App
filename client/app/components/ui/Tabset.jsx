import React, { useState } from 'react'

const Tabset = ({ children, defaultTab = null }) => {
    const tabs = React.Children.toArray(children);
    const [activeTab, setActiveTab] = useState(defaultTab ?? tabs[0]?.props?.name);

    return (
        <>
            <div className="flex border-b overflow-x-auto" style={{ borderColor: 'rgba(255,255,255,0.07)' }}>
                {
                    tabs.map((tab, index) => {
                        return (
                            <button key={index} onClick={() => setActiveTab(tab.props.name)}
                                className={`py-2.5 px-4 text-sm text-tx border-b-2 transition-all whitespace-nowrap rounded-none cursor-pointer
                                    ${activeTab === tab.props.name ? 'text-accent-soft border-b-accent' 
                                        : 'border-transparent text-muted hover:text-[#f0f0f8] transition-colors'}
                                `}
                            >
                                { tab }
                            </button>
                        );
                    })
                }
            </div>

            {
                tabs.map((tab, index) => {
                    if (activeTab === tab?.props?.name) {
                        return (
                            <div key={index} className="p-5 sm:p-6 space-y-5">
                                { tab.props.children }
                            </div>
                        );
                    }

                    return null;
                })
            }
        </>
    )
}

export default Tabset