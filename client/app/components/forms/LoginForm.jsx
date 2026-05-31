import React, { useState } from 'react'
import FormField from '../ui/FormField'
import PasswordField from '../ui/PasswordField'
import Button from '../ui/Button'
import LoadingOverlay from '../ui/LoadingOverlay';
import { useLogin } from '@/app/features/auth/hooks/useLogin';

const LoginForm = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
        remember: false
    });
    const { mutate: loginUser, isPending } = useLogin();

    const handleChange = (event) => {
        const{ name, value, type, checked } = event.target;

        setForm((prev) => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        loginUser(form);
    };

    return (
        <>
            {/* {
                isError && (
                    <span className='text-rose-500 text-sm'>{ errorMessage }</span>
                )
            } */}

            <form className="space-y-4" onSubmit={handleSubmit}>
                <FormField
                    required
                    label={'Email address'}
                    type="email"
                    name="email"
                    value={form.email}
                    className="input-field"
                    placeholder="you@example.com"
                    onChange={handleChange}
                />

                <PasswordField
                    required
                    className="input-field"
                    name="password"
                    value={form.password}
                    placeholder="••••••••"
                    onChange={handleChange}
                />

                <div className="flex items-center gap-2">
                    <FormField
                        name="remember"
                        type="checkbox"
                        checked={form.remember}
                        className="accent-[#6c63ff]"
                        onChange={handleChange}
                    />

                    <span className="text-sm text-muted">
                        Remember me for 30 days
                    </span>
                </div>

                <Button 
                    label={'Sign in'}
                    className={'block text-center btn-primary text-white font-semibold py-3 rounded-xl mt-2 w-full'}
                    type="submit"
                    disabled={isPending}
                />

                { isPending && <LoadingOverlay /> }
            </form>
        </>
    )
}

export default LoginForm