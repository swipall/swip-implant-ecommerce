'use client';

import { useEffect, useState } from 'react';
import { getAuthUser, removeAuthUser, AUTH_USER_CHANGED_EVENT } from '@/lib/auth-client';
import { CurrentUser } from '@/lib/swipall/types/types';

/**
 * Hook to get the authenticated user from localStorage
 * This hook manages client-side user state and provides methods to update it
 */
export function useAuthUser() {
    const [user, setUser] = useState<CurrentUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Get user from localStorage on mount
        const storedUser = getAuthUser();
        setUser(storedUser);
        setIsLoading(false);

        // Listen for auth user changes
        const handleAuthChange = (event: Event) => {
            const customEvent = event as CustomEvent<CurrentUser | null>;
            setUser(customEvent.detail);
        };

        window.addEventListener(AUTH_USER_CHANGED_EVENT, handleAuthChange);

        return () => {
            window.removeEventListener(AUTH_USER_CHANGED_EVENT, handleAuthChange);
        };
    }, []);

    const logout = () => {
        removeAuthUser();
        setUser(null);
    };

    return {
        user,
        isLoading,
        isAuthenticated: user !== null,
        logout,
    };
}
