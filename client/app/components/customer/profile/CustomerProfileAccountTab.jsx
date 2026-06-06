import React from 'react'
import Button from '../../ui/Button'
import { useDeactivateUser } from '@/app/features/user/hooks/useDeactivateUser';
import LoadingOverlay from '../../ui/LoadingOverlay';

const CustomerProfileAccountTab = () => {
    const { mutate: deactivateUser, isPending } = useDeactivateUser();

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
                onClick={handleDeactivation}
                disabled={isPending}
            />
        </div>
    )
}

export default CustomerProfileAccountTab