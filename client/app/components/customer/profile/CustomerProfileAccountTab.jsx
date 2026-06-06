import React, { useState } from 'react'
import Button from '../../ui/Button'
import { useDeactivateUser } from '@/app/features/user/hooks/useDeactivateUser';
import LoadingOverlay from '../../ui/LoadingOverlay';
import Modal from '../../ui/Modal';

const CustomerProfileAccountTab = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { mutate: deactivateUser, isPending } = useDeactivateUser();

    const handleOpenModal = () => {
        setIsOpen(!isOpen);
    }

    const handleDeactivation = () => {
        deactivateUser();
    }

    if(isPending) {
        return <LoadingOverlay />
    }

    return (
        <div className="border-[rgba(248,113,113,0.25)] border border-solid bg-[rgba(248,113,113,0.04)] rounded-xl p-5 space-y-4">
            <div>
                <p className="font-semibold text-tx mb-0 text-weak">Danger zone</p>
                <p className="text-muted mt-0.5 text-xs">These actions are permanent and cannot be undone.</p>
            </div>

            <Button 
                label={'Deactivate Account'}
                className={`border-[rgba(248,113,113,0.25)] border border-solid bg-[rgba(248,113,113,0.1)] text-weak py-2.5 
                    rounded-xl text-sm font-medium w-full`
                }
                onClick={handleOpenModal}
                disabled={isPending}
            />

            { 
                isOpen &&
                (
                    <Modal>
                        <div className="glass rounded-2xl w-full max-w-sm p-6 space-y-4 border-[rgba(248,113,113,0.2)] border border-solid">
                            <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto bg-[rgba(248,113,113,0.15)]">
                                <svg className="w-5 h-5 text-fair" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                            </div>

                            <div className="text-center">
                                <h3 className="font-semibold text-tx">Deactivate account?</h3>

                                <p className="text-sm text-muted mt-1.5">
                                    Your account will be hidden and you won&apos;t be able to log in. You can reactivate anytime by signing back in.
                                </p>
                            </div>

                            <div className="flex gap-3 pt-1">
                                <Button 
                                    label="Cancel"
                                    className={`flex-1 py-2.5 rounded-xl text-sm bg-[rgba(255,255,255,0.05)] border border-solid 
                                        border-[rgba(255,255,255,0.094)] text-muted`
                                    }
                                    onClick={handleOpenModal}
                                />

                                <Button 
                                    label="Deactivate"
                                    className={`flex-1 py-2.5 rounded-xl text-sm font-medium bg-[rgba(251,191,36,0.15)] border border-solid 
                                        border-[rgba(251,191,36,0.25)] text-fair`
                                    }
                                    onClick={handleDeactivation}
                                />
                            </div>
                        </div>
                    </Modal>
                )            
            }
        </div>
    )
}

export default CustomerProfileAccountTab