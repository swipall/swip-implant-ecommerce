import type {Metadata} from 'next';
import {Suspense} from 'react';
import { RegistrationForm } from "./registration-form";

export const metadata: Metadata = {
    title: 'Create Account',
    description: 'Create a new account to start shopping with us.',
};

async function RegisterContent({searchParams}: {searchParams: Promise<Record<string, string | string[] | undefined>>}) {
    const resolvedParams = await searchParams;
    const redirectTo = resolvedParams?.redirectTo as string | undefined;

    return <RegistrationForm redirectTo={redirectTo} />;
}

export default async function RegisterPage({searchParams}: PageProps<'/register'>) {
    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-md space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Create Account</h1>
                    <p className="text-muted-foreground">
                        Sign up to start shopping with us
                    </p>
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                    <RegisterContent searchParams={searchParams} />
                </Suspense>
            </div>
        </div>
    );
}