
import useShopModel from "@/lib/models/shop.model";
import { AddCompoundItemToCartStrategy } from "./add-compound-item-to-cart.strategy";
import { AddSimpleItemToCartStrategy } from "./add-simple-item-to-cart.strategy";
import { InterfaceInventoryItem } from "@/lib/swipall/types/types";

export class AddItemStrategyFactory {
    private simpleProductStrategy: AddSimpleItemToCartStrategy;
    private compoundProductStrategy: AddCompoundItemToCartStrategy;
    constructor(shopModel: ReturnType<typeof useShopModel>) {
        this.simpleProductStrategy = new AddSimpleItemToCartStrategy(shopModel);
        this.compoundProductStrategy = new AddCompoundItemToCartStrategy(shopModel);
    }

    getStrategy(item: InterfaceInventoryItem): AddSimpleItemToCartStrategy | AddCompoundItemToCartStrategy {
        if (this.compoundProductStrategy.canHandle(item)) {
            return this.compoundProductStrategy;
        }
        if (this.simpleProductStrategy.canHandle(item)) {
            return this.simpleProductStrategy;
        }
        // Por defecto, usar estrategia simple
        console.warn(`Unknown product kind: ${item.kind}, using simple product strategy`);
        return this.simpleProductStrategy;
    }
}