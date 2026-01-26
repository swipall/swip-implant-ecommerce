
import useShopModel from "@/lib/models/shop.model";
import { AddItemToCartParams, InterfaceApiDetailResponse, InterfaceInventoryItem, ShopCartItem } from "@/lib/swipall/types/types";
import { AddItemToCartStrategy } from "./add-item-strategy.interface";

export class AddSimpleItemToCartStrategy implements AddItemToCartStrategy {
    private shopModel: ReturnType<typeof useShopModel>;

    constructor(shopModel: ReturnType<typeof useShopModel>) {
        this.shopModel = shopModel;
    }
    async addItemToCart(cartId: string, itemId: string, body: AddItemToCartParams): Promise<InterfaceApiDetailResponse<ShopCartItem>> {
        const result = await this.shopModel.checkIfItemExistsInCart(itemId);
        if (result.count > 0) {
            const itemInCart = result.results[0];
            return this.shopModel.updateItemInCart(cartId, itemInCart.id, { quantity: itemInCart.quantity + body.quantity });
        }
        return this.shopModel.addItemToCart(cartId, { id: itemId } as InterfaceInventoryItem, body);
    }
    canHandle(item: InterfaceInventoryItem): boolean {
        return item.kind === 'product';
    }
}