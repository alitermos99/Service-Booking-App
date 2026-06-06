'use client'

import React, { useState } from 'react'
import Tab from '../../ui/Tab'
import Tabset from '../../ui/Tabset';
import CustomerProfilePersonalTab from './CustomerProfilePersonalTab';
import CustomerProfileSecurityTab from './CustomerProfileSecurityTab';
import CustomerProfileAccountTab from './CustomerProfileAccountTab';

const CustomerProfileTabs = () => {

    return (
        <div className="glass2 rounded-2xl overflow-hidden">
            <Tabset>
                <Tab label="Personal Info" name="personalInfo">
                    <CustomerProfilePersonalTab />
                </Tab>

                <Tab label="Security" name="security"
                >
                    <CustomerProfileSecurityTab />
                </Tab>

                {/* <Tab label="Notifications" name="notifications"
                /> */}

                <Tab label="Account" name="account"
                >
                    <CustomerProfileAccountTab />
                </Tab>
            </Tabset>
        </div>
    )
}

export default CustomerProfileTabs