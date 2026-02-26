import { getCurrentCart } from '@/lib/swipall/rest-adapter';
import { cacheLife, cacheTag } from 'next/cache';
import { CartIcon } from './cart-icon';

export async function NavbarCart() {
    'use cache: private';
    cacheLife('minutes');
    cacheTag('cart');
    cacheTag('active-order');

    try {
        const order = await getCurrentCart({ useAuthToken: true });        
        const cartItemCount = order?.count_items.count || 0;
        return <CartIcon cartItemCount={cartItemCount} />;
    } catch (error) {
        // During build or when API is unavailable, show cart with 0 items
        return <CartIcon cartItemCount={0} />;
    }
}
