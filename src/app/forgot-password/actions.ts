'use server';

import {requestPasswordReset} from '@/lib/swipall/rest-adapter';

export async function requestPasswordResetAction(prevState: { error?: string; success?: boolean } | undefined, formData: FormData) {
    const emailAddress = formData.get('emailAddress') as string;

    if (!emailAddress) {
        return {error: 'Email address is required'};
    }

    try {
        await requestPasswordReset(emailAddress);
        return {success: true};
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.';
        return {error: message};
    }
}
