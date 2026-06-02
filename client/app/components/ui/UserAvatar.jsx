import React from 'react'

const UserAvatar = ({ user }) => {
    const initials = user ? user.name?.split(' ').map(n => n[0]).join('').toUpperCase() : 'AN';

    return (
        <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full btn-primary flex items-center justify-center text-white text-xs font-bold">
                { initials }
            </div>
            <div className="hidden sm:block text-sm text-tx">{ user?.name }</div>
        </div>
    )
}

export default UserAvatar