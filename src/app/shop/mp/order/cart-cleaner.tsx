'use client';

import { useEffect } from 'react';
import { clearCartIdAction } from './actions';

export function CartCleaner() {
    useEffect(() => {
        clearCartIdAction().catch(error => {
            console.error('Failed to clear cart ID:', error);
        });
    }, []);

    return null;
}
