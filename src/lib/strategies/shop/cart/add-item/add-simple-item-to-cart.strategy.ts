import useShopModel from "@/models/shop/shop.model";
import { AddItemToCartParams } from "@/models/shop/shop.types";
import { InterfaceApiDetailResponse } from "@/services/http-client/http-client.types";
import { InterfaceInventoryItem } from "@/services/http-client/inventory/inventory.types";
import { ShopCartItem } from "@/services/http-client/shop/shop.types";
import { AddItemToCartStrategy } from "./add-item-strategy.interface";

export class AddSimpleItemToCartStrategy implements AddItemToCartStrategy {
    private shopModel: ReturnType<typeof useShopModel>;

    constructor(shopModel: ReturnType<typeof useShopModel>) {
        this.shopModel = shopModel;
    }
    async addItemToCart(cartId: string, itemId: string, body: AddItemToCartParams): Promise<InterfaceApiDetailResponse<ShopCartItem>> {
        const result = await this.shopModel.checkIfItemExistsInCart(itemId);
        if (result.data.count > 0) {
            const itemInCart = result.data.results[0];
            return this.shopModel.updateItemInCart(cartId, itemInCart.id, { quantity: itemInCart.quantity + body.quantity });
        }
        return this.shopModel.addItemToCart(cartId, { id: itemId } as InterfaceInventoryItem, body);
    }
    canHandle(item: InterfaceInventoryItem): boolean {
        return item.kind === 'product';
    }
}