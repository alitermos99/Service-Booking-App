import React from 'react'
import UserAvatar from '../ui/UserAvatar'
import Link from 'next/link'
import { useLogout } from '@/app/features/auth/hooks/useLogout';
import LoadingOverlay from '../ui/LoadingOverlay';
import { useUser } from '@/app/features/auth/hooks/useUser';

const CustomerUserAvatar = () => {
    const { data: userObject, isPending } = useUser();
	const user = userObject?.user;

    const { mutate: logout } = useLogout();

    const handleLogout = () => {
        logout();
    }

    if (isPending) {
        return <LoadingOverlay />
    }

    return (
        <UserAvatar name={user?.name} showDropdown>
            <span className="inline-block hover:underline px-3 pt-2">
                <Link href="/services">Book now</Link>
            </span>

            <span className="inline-block hover:underline px-3 pt-2">
                <Link href="/profile">Preferences</Link>
            </span>

            <div className="mt-2" style={{ borderTop: '1px solid rgba(255,255,255,0.5)' }} />

            <span className="inline-block hover:underline px-3 pt-2" onClick={handleLogout}>
                Log out
            </span>
        </UserAvatar>
    )
}

export default CustomerUserAvatar