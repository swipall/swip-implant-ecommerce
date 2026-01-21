import {CartItems} from "@/app/cart/cart-items";
import {OrderSummary} from "@/app/cart/order-summary";
import {PromotionCode} from "@/app/cart/promotion-code";
import { getActiveOrder } from '@/lib/swipall/rest-adapter';

export async function Cart() {
    "use cache: private"

    const result = await getActiveOrder({ useAuthToken: true });
    const activeOrder = result.data;

    // Handle empty cart case
    if (!activeOrder || activeOrder.lines.length === 0) {
        return <CartItems activeOrder={null}/>;
    }

    return (
        <div className="grid lg:grid-cols-3 gap-8">
            <CartItems activeOrder={activeOrder as any}/>

            <div className="lg:col-span-1">
                <OrderSummary activeOrder={activeOrder as any}/>
                <PromotionCode activeOrder={activeOrder as any}/>
            </div>
        </div>
    )
}