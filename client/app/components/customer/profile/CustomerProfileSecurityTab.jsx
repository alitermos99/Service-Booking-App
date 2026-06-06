import React, { useState } from 'react'
import PasswordField from '../../forms/PasswordField'
import LoadingOverlay from '../../ui/LoadingOverlay';
import Button from '../../ui/Button';
import { useChangePassword } from '@/app/features/user/hooks/useChangePassword';
import validatePassword from '@/app/validators/passwordValidator';

const CustomerProfileSecurityTab = () => {
    const [form, setForm] = useState({
        currentPassword: '',
        newPassword: '',
        repeatPassword: ''
    });
    const [error, setError] = useState(null);
    const { mutate: changePassword, isPending } = useChangePassword();

    const handleChange = (event) => {
        const { name, value } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(!validatePassword(form.newPassword)) {
            setError('Password must be at least 6 characters long and include uppercase, lowercase, number, and special character');
            return;
        }

        if(form.newPassword !== form.repeatPassword) {
            setError('Passwords must match');
            return;
        }
        
        changePassword(form);
    }
    
    return (
        <div className="space-y-4" onSubmit={handleSubmit}>
            <div>
                <p className="font-semibold text-tx mb-0">Change password</p>
                <p className="text-muted mt-0.5 text-xs">Use a strong password you don&apos;t use anywhere else.</p>
            </div>
            
            <form className="space-y-4">
                <PasswordField 
                    label={'Current password'}
                    labelClass="text-xs! text-muted mb-1.5 block"
                    placeholder="Current password"
                    name="currentPassword"
                    onChange={handleChange}
                />

                <PasswordField 
                    label={'New password'}
                    labelClass="text-xs! text-muted mb-1.5 block"
                    placeholder="At least 6 characters"
                    name="newPassword"
                    onChange={handleChange}
                    showStrength
                />

                <PasswordField 
                    label={'Repeat new password'}
                    labelClass="text-xs! text-muted mb-1.5 block"
                    placeholder="Repeat new password"
                    name="repeatPassword"
                    onChange={handleChange}
                />

                <Button
                    label={'Update password'}
                    className={'block text-center btn-primary text-white font-semibold py-2.5 px-5 mt-2 ml-auto text-sm'}
                    type="submit"
                    disabled={isPending}
                />
            </form>

            { isPending && <LoadingOverlay /> }
            { error && <span className='text-rose-500 text-sm'>{ error }</span> }
        </div>
    )
}

export default CustomerProfileSecurityTab