'use server';

import {verifyCustomerAccount} from '@/lib/swipall/rest-adapter';
import {setAuthToken} from '@/lib/auth';

export async function verifyAccountAction(token: string, password?: string) {
    if (!token) {
        return {error: 'Verification token is required'};
    }

    try {
        const result = await verifyCustomerAccount(token);

        // Store the token in a cookie if returned
        if (result.token) {
            await setAuthToken(result.token);
        }

        return {success: true};
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'An unexpected error occurred. Please try again.';
        return {error: message};
    }
}
