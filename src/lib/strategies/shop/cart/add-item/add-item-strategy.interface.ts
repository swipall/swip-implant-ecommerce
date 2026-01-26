import { AddItemToCartParams, InterfaceApiDetailResponse, InterfaceInventoryItem, ShopCartItem } from "@/lib/swipall/types/types";


export interface AddItemToCartStrategy {
    addItemToCart(cartId: string, itemId: string, body: AddItemToCartParams): Promise<InterfaceApiDetailResponse<ShopCartItem>>;
    canHandle(item: InterfaceInventoryItem): boolean;
}