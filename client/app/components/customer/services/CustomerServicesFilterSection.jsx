import React from 'react'
import Button from '../../ui/Button'
import Chip from '../../ui/Chip'
import SelectField from '../../forms/SelectField';

const TAGS = [{name: 'all', label: 'All'},
    {name: 'massage', label: 'Massage'},
    {name: 'hair and beauty',label: 'Hair & Beauty'},
    {name: 'skincare',label: 'Skincare'},
    {name: 'consulting',label: 'Consulting'},
    {name: 'fitness',label: 'Fitness'},
]

const SORT_OPTIONS = [
    {
        value: 'createdAt;desc',
        label: 'Sort: Newest to Oldest'
    },
    {
        value: 'createdAt;asc',
        label: 'Sort: Oldest to Newest'
    },
    {
        value: 'title;desc',
        label: 'Title: Z - A'
    },
    {
        value: 'title;asc',
        label: 'Title: A - Z'
    },
    {
        value: 'price;desc',
        label: 'Price: High to Low'
    },
    {
        value: 'price;asc',
        label: 'Price: Low to High'
    }
];

const CustomerServicesFilterSection = ({ selectedtTag, onSelect, onSort, availableServices = 0 }) => {
    return (
        <>
            <div className="flex gap-2 overflow-x-auto pb-2 mb-6 hide-scrollbar">
                {
                    TAGS.map((tag, index) => (
                        <Chip key={index} 
                            chipLabel={tag.label}
                            chipName={tag.name}
                            onSelect={onSelect}
                            isActive={tag.name === selectedtTag}
                        />
                    ))
                }
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
                <p className="text-sm text-muted"><span className="text-tx font-medium">{ availableServices }</span> service(s) available</p>

                <div className="flex items-center gap-2">
                    <SelectField onChange={onSort} options={SORT_OPTIONS} showIcon />

                    <div className="flex gap-1 glass2 rounded-xl p-1">
                        <Button 
                            className="w-7 h-7 rounded-lg flex items-center justify-center btn-primary text-white"
                            label={
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                        d="M4 6h16M4 10h16M4 14h16M4 18h16"
                                    />
                                </svg>
                            }
                        />

                        <Button 
                            className="w-7 h-7 rounded-lg flex items-center justify-center btn-primary text-white"
                            label={
                                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                        d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                                    />
                                </svg>
                            }
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default CustomerServicesFilterSection