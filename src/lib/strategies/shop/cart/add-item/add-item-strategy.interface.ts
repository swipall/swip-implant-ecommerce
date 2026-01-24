import { AddItemToCartParams } from "@/models/shop/shop.types";
import { InterfaceApiDetailResponse } from "@/services/http-client/http-client.types";
import { InterfaceInventoryItem } from "@/services/http-client/inventory/inventory.types";
import { ShopCartItem } from "@/services/http-client/shop/shop.types";

export interface AddItemToCartStrategy {
    addItemToCart(cartId: string, itemId: string, body: AddItemToCartParams): Promise<InterfaceApiDetailResponse<ShopCartItem>>;
    canHandle(item: InterfaceInventoryItem): boolean;
}