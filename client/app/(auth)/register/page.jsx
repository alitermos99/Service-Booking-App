'use client'

import React, { useEffect } from 'react'
import Main from '@/app/components/layouts/Main'
import AuthHeader from '@/app/components/auth/AuthHeader';
import Card from '@/app/components/ui/Card';
import RegisterForm from '@/app/components/forms/RegisterForm';
import AuthFooter from '@/app/components/auth/AuthFooter';
import Orb from '@/app/components/ui/Orb';
import { useRouter } from 'next/navigation';
import { useUser } from '@/app/features/auth/hooks/useUser';

const RegisterPage = () => {
    const router = useRouter();
    const { data: user, isPending } = useUser();

    useEffect(() => {
        if (user) router.push("/");
    }, [user, router]);

    if (isPending) return null;

    return (
        <Main className={'animate-fade-up'}>
            <Orb size="w-96 h-96" opacity={0.20} className="top-0 right-0 translate-x-1/3 -translate-y-1/3 text-accent-soft" />
            <Orb size="w-64 h-64" opacity={0.10} className="bottom-0 left-0 -translate-x-1/3 translate-y-1/3 text-accent-sky" />

            <div className="relative z-10 w-full max-w-lg">
                <AuthHeader 
                    title="Create your account"
                    subtitle="Start booking or managing services today"
                />

                <Card>
                    <p className='text-sm font-medium text-tx mb-3'>I want to...</p>

                    <RegisterForm />

                    <AuthFooter 
                        text="Already have an account?"
                        linkText="Sign in →"
                        link="/login"
                    />
                </Card>
            </div>
        </Main>
    )
}

export default RegisterPage