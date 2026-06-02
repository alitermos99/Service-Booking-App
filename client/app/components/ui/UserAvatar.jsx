import React, { useState } from 'react';

const getRandomColor = () => {
    const randomHex = Math.floor(Math.random() * 0xffffff).toString(16);
    return `#${randomHex.padStart(6, "0")}`;
};

const getRandomLinearGradient = () => {
    const angle = Math.floor(Math.random() * 360); // Random angle between 0 and 359 degrees
    const color1 = getRandomColor();
    const color2 = getRandomColor();
    
    return `linear-gradient(${angle}deg, ${color1}, ${color2})`;
};

const gradientCache = new Map();

const getUserGradient = (userId) => {
    if (!gradientCache.has(userId)) {
        gradientCache.set(userId, getRandomLinearGradient());
    }
    
    return gradientCache.get(userId);
};

const UserAvatar = ({ name, children, showDropdown = false }) => {
    const [active, setActive] = useState(false);
    const [gradient] = useState(() => getUserGradient(name ?? 'guest'));
    const initials = name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'AN';

    const handleDropdown = () => {
        setActive((e) => !e);
    }

    return (
        <div className="relative cursor-pointer">
            <div className="flex items-center gap-2" onClick={handleDropdown}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    style={{ background: gradient }}
                >
                    { initials }
                </div>

                <div className="hidden sm:block text-sm text-tx">{ name }</div>
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