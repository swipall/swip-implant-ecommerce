'use client';

import {createContext, ReactNode, useContext} from 'react';

interface CurrentUser {
    id: string;
    emailAddress: string;
    firstName: string;
    lastName: string;
}

type ActiveCustomer = CurrentUser | null;

interface AuthContextType {
    activeCustomer: Promise<ActiveCustomer>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
    initialActiveCustomerPromise: Promise<ActiveCustomer>;
}

export function AuthProvider({children, initialActiveCustomerPromise}: AuthProviderProps) {

    return (
        <AuthContext.Provider value={{activeCustomer: initialActiveCustomerPromise}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}
