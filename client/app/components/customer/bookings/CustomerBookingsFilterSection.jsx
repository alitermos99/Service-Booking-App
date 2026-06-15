import React from 'react'
import SearchInputField from '../../forms/SearchInputField';
import Chip from '../../ui/Chip';
import SelectField from '../../forms/SelectField';

const TAGS = [{name: 'all', label: 'All'},
    {name: 'upcoming', label: 'Upcoming'},
    {name: 'completed',label: 'Completed'},
    {name: 'cancelled',label: 'Cancelled'},
    {name: 'pending',label: 'Pending'}
]

const SORT_OPTIONS = [
    {
        value: 'createdAt;desc',
        label: 'Newest First'
    },
    {
        value: 'createdAt;asc',
        label: 'Oldest First'
    }
]

const CustomerBookingsFilterSection = ({ selectedTag, onChange, onSelect, onSort }) => {
    return (
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <SearchInputField inputClass="w-full pl-10! pr-4! py-2.5! rounded-xl text-sm outline-none" 
                className="flex-1" placeholder="Search by service or provider..." onChange={onChange}
            />

            <div className="flex items-center gap-2 flex-wrap">
                {
                    TAGS.map((tag, index) => (
                        <Chip key={index} 
                            chipLabel={tag.label}
                            chipName={tag.name}
                            onSelect={onSelect}
                            isActive={tag.name === selectedTag}
                        />
                    ))
                }
            </div>

            <SelectField options={SORT_OPTIONS} onChange={onSort} showIcon />
        </div>
    )
}

export default CustomerBookingsFilterSection