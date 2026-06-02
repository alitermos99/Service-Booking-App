import React, { useState } from 'react'

const UserAvatar = ({ user, children, showDropdown = false }) => {
    const [active, setActive] = useState(false);
    const initials = user ? user.name?.split(' ').map(n => n[0]).join('').toUpperCase() : 'AN';

    const handleDropdown = () => {
        setActive((e) => !e);
    }

    return (
        <div className="relative cursor-pointer">
            <div className="flex items-center gap-2" onClick={handleDropdown}>
                <div className="w-8 h-8 rounded-full btn-primary flex items-center justify-center text-white text-xs font-bold">
                    { initials }
                </div>

                <div className="hidden sm:block text-sm text-tx">{ user?.name }</div>
            </div>

            {
                showDropdown &&
                (
                    <div className={`absolute glass top-0 left-0 mt-10 w-32 p-2 rounded-lg transition-opacity text-sm text-tx 
                        ${active ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
                    >
                        { children }
                    </div>
                )
            }
        </div>
    )
}

export default UserAvatar