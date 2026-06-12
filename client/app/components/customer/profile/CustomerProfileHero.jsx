import React from 'react'
import UserAvatar from '../../ui/UserAvatar'
import LoadingOverlay from '../../ui/LoadingOverlay';
import { useUser } from '@/app/features/auth/hooks/useUser';
import StatsCard from '../../ui/StatsCard';

const CustomerProfileHero = () => {
    const { data: userObject, isPending } = useUser();
    const user = userObject?.user;

    if(isPending) {
        return <LoadingOverlay />
    }

    return (
        <div className="glass2 rounded-2xl p-6">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5">
                <div className="relative avatar-wrap shrink-0">
                    <div className="avatar-ring w-20 h-20">
                        <UserAvatar
                            name={user.name}
                            avatarSize="w-[74px] h-[74px]"
                            initialsSize="text-2xl"
                            borderRadius="rounded-full"
                            hideName
                        />
                    </div>

                    {/* <input id="avatar-input" type="file" accept="image/*" className="hidden"/> */}
                </div>

                <div className="text-center sm:text-left flex-1 min-w-0">
                    <h2 className="text-xl font-bold text-tx">{ user.name }</h2>
                    <p className="text-sm text-muted mt-0.5">{ user.email }</p>

                    <div className="flex items-center justify-center sm:justify-start gap-3 mt-3 flex-wrap">
                        <span className={`text-xs px-2.5 py-1 rounded-full bg-[rgba(52,211,153,0.12)] text-good 
                            border-[rgba(52,211,153,0.2)] border border-solid`
                        } 
                        >
                            ✓ Verified
                        </span>
                        {/* <span className="text-xs text-muted">Member since Jan 2024</span> */}
                    </div>
                </div>

                <div className="flex sm:flex-col gap-4 sm:gap-2 text-center shrink-0">
                    <StatsCard 
                        stat="12"
                        subtitle="Bookings"
                        statStyle="text-lg font-bold text-tx"
                        cardStyle=""
                        spacing="mt-0"
                    />

                    <div className="w-px sm:w-auto sm:h-px bg-white/10 sm:my-1"></div>

                    <StatsCard 
                        stat="$840"
                        subtitle="Spent"
                        statStyle="text-lg font-bold text-good"
                        cardStyle=""
                        spacing="mt-0"
                    />

                    <div className="w-px sm:w-auto sm:h-px bg-white/10 sm:my-1"></div>

                    <StatsCard 
                        stat="4.9★"
                        subtitle="Avg rating"
                        statStyle="text-lg font-bold text-fair"
                        cardStyle=""
                        spacing="mt-0"
                    />
                </div>
            </div>
        </div>
    )
}

export default CustomerProfileHero