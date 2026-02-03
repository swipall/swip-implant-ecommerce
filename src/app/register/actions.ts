'use server';

import { registerCustomer } from '@/lib/swipall/rest-adapter';
import { createAddress, createCustomerInfo } from '@/lib/swipall/users';
import { redirect } from 'next/navigation';

export async function registerAction(prevState: { error?: string } | undefined, formData: FormData) {
    const email = formData.get('email') as string;
    const username = formData.get('username') as string;
    const first_name = formData.get('first_name') as string;
    const last_name = formData.get('last_name') as string;
    const password1 = formData.get('password1') as string;
    const password2 = formData.get('password2') as string;
    const redirectTo = formData.get('redirectTo') as string | null;
    
    // Address fields
    const address = formData.get('address') as string;
    const suburb = formData.get('suburb') as string;
    const postal_code = formData.get('postal_code') as string;
    const city = formData.get('city') as string;
    const state = formData.get('state') as string;
    const country = formData.get('country') as string;
    const mobile = formData.get('mobile') as string;

    if (!email || !first_name || !last_name || !password1 || !password2 || !address || !suburb || !postal_code || !city || !state || !mobile) {
        return { error: 'Todos los campos son requeridos' };
    }

    if (password1 !== password2) {
        return { error: 'Las contraseñas no coinciden' };
    }

    try {
        await registerCustomer({
            email,
            username,
            first_name,
            last_name,
            password1,
            password2,
        });

        // Register customer info and address with auth token from the session
        try {
            const customerInfo = {
                receiver: `${first_name} ${last_name}`,
                address,
                suburb,
                postal_code,
                city,
                state,
                country,
                mobile,
            };
            
            await createCustomerInfo(customerInfo, { useAuthToken: true });
            await createAddress(customerInfo, { useAuthToken: true });
        } catch (addressError) {
            // Log address creation error but don't fail the registration
            console.error('Error creating customer info/address:', addressError);
        }

        // Redirect to sign-in
        const signInHref = redirectTo
            ? `/sign-in?redirectTo=${encodeURIComponent(redirectTo)}`
            : '/sign-in';

        redirect(signInHref);
    } catch (error: unknown) {
        // Don't catch redirect errors
        if (error instanceof Error && error.message === 'NEXT_REDIRECT') {
            throw error;
        }
        const message = error instanceof Error ? error.message : 'El registro falló';
        return { error: message };
    }
}
