import React, { useEffect, useState } from 'react'
import Button from '../../ui/Button'
import { useUser } from '@/app/features/auth/hooks/useUser';
import LoadingOverlay from '../../ui/LoadingOverlay';
import { useUpdateProfile } from '@/app/features/user/hooks/useUpdateProfile';
import validatePhone from '@/app/validators/phoneValidator';
import FormField from '../../forms/FormField';
import TextArea from '../../forms/TextArea';

const CustomerProfilePersonalTab = () => {
    const { data: userObject, isPending } = useUser();
    const user = userObject?.user;
    const { mutate: updateUser, isPending: isUserUpdating } = useUpdateProfile();

    const [error, setError] = useState(null);
    const [form, setForm] = useState({
        name: '',
        email: '',
        phone: '',
        bio: ''
    });

    useEffect(() => {
        function handleInput() {
            if(user) {
                setForm({
                    name: user.name,
                    email: user.email,
                    phone: user.phone,
                    bio: user.bio
                });
            }
        }

        handleInput();
    }, [user]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        
        setForm((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(form.name < 3) {
            setError('Name must be at least 3 characters');
            return;
        }

        if(!validatePhone(form.phone)) {
            setError('Enter a valid phone number (e.g. +14155552671)');
            return;
        }

        if(form.email === user.email && 
            form.name === user.name && 
            form.phone === user.phone && 
            form.bio === user.bio
        ) {
            return;
        }

        updateUser(form);
    }

    if(isPending) {
        return <LoadingOverlay />
    }
    
    return (
        <>
            <form className='space-y-4' onSubmit={handleSubmit}>
                <FormField
                    label={'Name'}
                    type="text"
                    name="name"
                    value={form?.name}
                    placeholder="John Doe"
                    labelClass="text-xs! text-muted mb-1.5 block"
                    onChange={handleChange}
                />

                <FormField
                    label={'Email address'}
                    type="email"
                    name="email"
                    value={form?.email}
                    placeholder="you@example.com"
                    labelClass="text-xs! text-muted mb-1.5 block"
                    onChange={handleChange}
                />

                <FormField
                    label={'Phone'}
                    type="text"
                    name="phone"
                    value={form?.phone}
                    placeholder="+123456789"
                    labelClass="text-xs! text-muted mb-1.5 block"
                    onChange={handleChange}
                />

                <TextArea 
                    label={'Bio (optional)'}
                    name="bio"
                    value={form?.bio}
                    placeholder="Personal Information"
                    labelClass="text-xs! text-muted mb-1.5 block"
                    onChange={handleChange}
                    showCount
                />

                <Button
                    label={'Save changes'}
                    className={'block text-center btn-primary text-white font-semibold py-2.5 px-5 mt-2 ml-auto text-sm'}
                    type="submit"
                    disabled={isUserUpdating}
                />
            </form>

            { error && <span className='text-rose-500 text-sm'>{ error }</span> }
        </>
    )
}

export default CustomerProfilePersonalTab