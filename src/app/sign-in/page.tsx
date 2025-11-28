import type {Metadata} from 'next';
import {Suspense} from 'react';
import { LoginForm } from "./login-form";

export const metadata: Metadata = {
    title: 'Sign In',
    description: 'Sign in to your account to access your orders, wishlist, and more.',
};

async function SignInContent({searchParams}: {searchParams: Promise<Record<string, string | string[] | undefined>>}) {
    const resolvedParams = await searchParams;
    const redirectTo = resolvedParams?.redirectTo as string | undefined;

    return <LoginForm redirectTo={redirectTo} />;
}

export default async function SignInPage({searchParams}: PageProps<'/sign-in'>) {
    return (
        <div className="flex min-h-screen items-center justify-center px-4">
            <div className="w-full max-w-md space-y-6">
                <div className="space-y-2 text-center">
                    <h1 className="text-3xl font-bold">Sign In</h1>
                    <p className="text-muted-foreground">
                        Enter your credentials to access your account
                    </p>
                </div>
                <Suspense fallback={<div>Loading...</div>}>
                    <SignInContent searchParams={searchParams} />
                </Suspense>
            </div>
        </div>
    );
}