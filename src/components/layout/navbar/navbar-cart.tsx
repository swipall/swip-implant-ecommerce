import {cacheLife, cacheTag} from 'next/cache';
import {CartIcon} from './cart-icon';
import { getActiveOrder } from '@/lib/swipall/rest-adapter';

export async function NavbarCart() {
    'use cache: private';
    cacheLife('minutes');
    cacheTag('cart');
    cacheTag('active-order');

    const order = await getActiveOrder({ useAuthToken: true });

    const cartItemCount = order?.data?.totalQuantity || 0;

    return <CartIcon cartItemCount={cartItemCount} />;
}
