import React from 'react'
import Orb from '../../ui/Orb'
import Section from '../../layouts/Section'
import Input from '../../forms/Input'

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

            <div className="relative max-w-lg mx-auto">
                <svg className="w-5 h-5 absolute left-4 top-1/2 -translate-y-1/2 text-muted" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
                </svg>

                <Input type="text" placeholder="Search services..." className={`w-full pl-12 pr-4 py-3.5 rounded-2xl 
                    text-sm text-tx outline-none bg-[:rgba(26,26,36,0.9)] border border-solid border-[rgba(255,255,255,0.094)]`}
                    onChange={onChange}
                />
            </div>
        </Section>
    )
}

export default CustomerServicesHero