'use server';

import {login, logout} from '@/lib/swipall/rest-adapter';
import {removeAuthToken, setAuthToken} from '@/lib/auth';
import {redirect} from "next/navigation";
import {revalidatePath} from "next/cache";

export async function loginAction(prevState: { error?: string } | undefined, formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;
    const redirectTo = formData.get('redirectTo') as string | null;

    try {
        const result = await login({
            username,
            password,
        });

        // Store the token in a cookie if returned
        if (result.token) {
            await setAuthToken(result.token);
        }

        revalidatePath('/', 'layout');

        // Validate redirectTo is a safe internal path
        const safeRedirect = redirectTo?.startsWith('/') && !redirectTo.startsWith('//')
            ? redirectTo
            : '/';

        redirect(safeRedirect);
    } catch (error: unknown) {
        const message = error instanceof Error ? error.message : 'Invalid email or password.';
        return { error: message };
    }
}

export async function logoutAction() {
    try {
        await logout({ useAuthToken: true });
    } catch (error) {
        // Continue with logout even if API call fails
        console.error('Logout error:', error);
    }
    
    await removeAuthToken();
    redirect('/')
}
