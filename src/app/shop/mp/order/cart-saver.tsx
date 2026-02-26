'use client';

import { useEffect } from 'react';
import { saveCartIdAction } from './actions';

interface CartSaverProps {
    cartId: string;
}

export function CartSaver({ cartId }: CartSaverProps) {
    useEffect(() => {
        saveCartIdAction(cartId).catch(error => {
            console.error('Failed to save cart ID:', error);
        });
    }, [cartId]);

    return null;
}
