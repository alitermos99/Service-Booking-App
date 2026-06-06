'use client';

import Card from "@/app/components/ui/Card";
import Main from "@/app/components/layouts/Main";
import LoginForm from "@/app/components/auth/LoginForm";
import AuthHeader from "@/app/components/auth/AuthHeader";
import AuthFooter from "@/app/components/auth/AuthFooter";
import { useUser } from "@/app/features/auth/hooks/useUser";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Orb from "@/app/components/ui/Orb";

export default function LoginPage() {
    const router = useRouter();
    const { data: user, isPending } = useUser();

    useEffect(() => {
        if (user) router.push("/");
    }, [user, router]);

    if (isPending) return null;

    return (
        <Main className={'animate-fade-up'}>
            <Orb size="w-96 h-96" opacity={0.20} className="top-0 left-0 -translate-x-1/3 -translate-y-1/3 text-accent" />
            <Orb size="w-80 h-80" opacity={0.10} className="bottom-0 right-0 translate-x-1/3 translate-y-1/3 text-accent-soft" />

            <div className="relative z-10 w-full max-w-md">
                <AuthHeader 
                    title="Welcome back"
                    subtitle="Sign in to your account to continue"
                />

                <Card>
                    <LoginForm />

                    <AuthFooter 
                        text="Don&apos;t have an account?"
                        linkText="Create one →"
                        link="/register"
                    />
                </Card>
            </div>
        </Main>
    );
}