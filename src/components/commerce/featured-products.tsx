import {ProductCarousel} from "@/components/commerce/product-carousel";
import {cacheLife} from "next/cache";
import { searchProducts } from "@/lib/swipall/rest-adapter";

async function getFeaturedCollectionProducts() {
    'use cache'
    cacheLife('days')

    // Fetch featured products via REST search
    const result = await searchProducts({ take: 12, skip: 0, sort: 'name:ASC' });
    return result.data.items;
}


export async function FeaturedProducts() {
    const products = await getFeaturedCollectionProducts();

    return (
        <ProductCarousel
            title="Featured Products"
            products={products}
        />
    )
}