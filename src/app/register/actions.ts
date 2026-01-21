'use server';

import {registerCustomer} from '@/lib/swipall/rest-adapter';
import {redirect} from 'next/navigation';

export async function registerAction(prevState: { error?: string } | undefined, formData: FormData) {
    const emailAddress = formData.get('emailAddress') as string;
    const firstName = formData.get('firstName') as string;
    const lastName = formData.get('lastName') as string;
    const password = formData.get('password') as string;
    const redirectTo = formData.get('redirectTo') as string | null;

    if (!emailAddress || !password) {
        return {error: 'Email address and password are required'};
    }

    try {
        await registerCustomer({
            emailAddress,
            firstName: firstName || '',
            lastName: lastName || '',
            password,
        });

        // Redirect to verification pending page, preserving redirectTo if present
        const verifyUrl = redirectTo
            ? `/verify-pending?redirectTo=${encodeURIComponent(redirectTo)}`
            : '/verify-pending';

        redirect(verifyUrl);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Registration failed';
        return {error: message};
    }
}
