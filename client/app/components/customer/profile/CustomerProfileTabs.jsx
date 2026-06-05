'use client'

import React, { useState } from 'react'
import Tab from '../../ui/Tab'
import Tabset from '../../ui/Tabset';
import CustomerProfilePersonalTab from './CustomerProfilePersonalTab';
import CustomerProfileSecurityTab from './CustomerProfileSecurityTab';

const CustomerProfileTabs = () => {

    return (
        <div className="glass2 rounded-2xl overflow-hidden">
            <Tabset>
                <Tab label="Personal Information" name="personalInfo">
                    <CustomerProfilePersonalTab />
                </Tab>

                <Tab label="Security" name="security"
                >
                    <CustomerProfileSecurityTab />
                </Tab>

                <Tab label="Notifications" name="notifications"
                />

                <Tab label="Account" name="account"
                />
            </Tabset>
        </div>
    )
}

export default CustomerProfileTabs