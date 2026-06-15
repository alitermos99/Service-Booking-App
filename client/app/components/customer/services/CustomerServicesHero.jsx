import React from 'react'
import Orb from '../../ui/Orb'
import Section from '../../layouts/Section'
import Input from '../../forms/Input'
import SearchInputField from '../../forms/SearchInputField'

const CustomerServicesHero = ({ onChange }) => {
    return (
        <Section maxWidth="" className="relative overflow-hidden px-4 lg:px-8 py-16 text-center">
            <Orb className="w-96 h-96 -top-32 left-1/2 -translate-x-1/2 bg-[rgba(108,99,255,0.15)]" />

            <h1 className="text-3xl sm:text-4xl font-bold text-tx mb-3">
                Book a <span className="gradient-text">Service</span>
            </h1>

            <p className="text-muted max-w-md mx-auto mb-6">
                Choose from our curated services and book your appointment in seconds.
            </p>

            <SearchInputField 
                onChange={onChange}
                className="max-w-lg mx-auto" 
                inputClass="w-full pl-10! pr-4! py-2.5! rounded-xl text-sm outline-none" 
            />
        </Section>
    )
}

export default CustomerServicesHero