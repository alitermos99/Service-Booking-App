import React, { useState } from 'react';

const hashString = (str) => {
    let hash = 0;

    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    return hash;
};

const getUserGradient = (name) => {
    const hash = Math.abs(hashString(name));

    const color1 = `hsl(${hash % 360}, 70%, 50%)`;
    const color2 = `hsl(${(hash + 120) % 360}, 70%, 50%)`;

    return `linear-gradient(135deg, ${color1}, ${color2})`;
};

const UserAvatar = ({ name, children, hideName = false, showDropdown = false, avatarSize = 'w-8 h-8', initialsSize = 'text-xs' }) => {
    const [active, setActive] = useState(false);
    const [gradient] = useState(() => getUserGradient(name ?? 'guest'));
    const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'AN';

    const handleDropdown = () => {
        setActive((e) => !e);
    }

    return (
        <div className="relative cursor-pointer">
            <div className="flex items-center gap-2" onClick={handleDropdown}>
                <div className={`${avatarSize} rounded-full flex items-center justify-center text-white ${initialsSize} font-bold`}
                    style={{ background: gradient }}
                >
                    { initials }
                </div>

                { !hideName && <div className="hidden sm:block text-sm text-tx">{ name }</div> }
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