import { usePathname } from 'next/navigation';
import { createPortal } from 'react-dom';
import Button from './Button';
import Link from 'next/link';

const HeaderLinks = ({ pages, isMobileNavOpen, setIsMobileNavOpen }) => {
    const currentPage = usePathname();

    const mobileNav = (
        <>
            <div 
                className={`fixed inset-0 bg-[rgba(0,0,0,0.7)] z-40 ${isMobileNavOpen ? 'block' : 'hidden'}`}
                onClick={() => setIsMobileNavOpen(false)}
            />

            <div className="glass fixed inset-y-0 right-0 w-64 z-50 p-6 flex flex-col gap-2 md:hidden" 
                style={{ transform: `${isMobileNavOpen ? 'translateX(0)' : 'translateX(100%)'}`, transition: 'transform 0.3s ease' }}
            >
                <div className="flex items-center justify-between mb-4">
                    <span className="font-semibold">Menu</span>
                    <Button 
                        className="w-8 h-8 rounded-lg flex items-center justify-center bg-[rgba(255,255,255,0.05)]"
                        label={
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        }
                        onClick={() => setIsMobileNavOpen(false)}
                    />
                </div>

                {pages?.map((page, index) => (
                    <Link href={page.link} 
                        key={index}
                        onClick={() => setIsMobileNavOpen(false)}
                        className={`text-sm transition-colors rounded-xl py-2 px-3.5
                            ${page.link === currentPage ? 'text-accent-soft bg-[rgba(108,99,255,0.18)]' : 'text-muted hover:text-tx'}
                            flex items-center gap-2
                        `}
                    >
                        {page.label}
                    </Link>
                ))}

                <div className="mt-auto pt-4 border-t border-[rgba(255,255,255,0.094)]">
                    <a href="/login" className="flex items-center gap-2 text-weak py-2 px-3.5 text-sm">Sign Out</a>
                </div>
            </div>
        </>
    );

    return (
        <>
            {/* desktop links */}
            <div className="hidden md:flex items-center gap-8">
                {pages?.map((page, index) => (
                    <Link href={page.link} 
                        key={index}
                        className={`text-sm transition-colors ${page.link === currentPage ? 'text-accent-soft' : 'text-muted hover:text-tx'}`}
                    >
                        {page.label}
                    </Link>
                ))}
            </div>

            {/* portal renders at document.body level, outside header DOM */}
            {typeof window !== 'undefined' && createPortal(mobileNav, document.body)}
        </>
    );
}

export default HeaderLinks;