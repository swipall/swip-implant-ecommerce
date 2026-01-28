import { ProductCarousel } from "@/components/commerce/product-carousel";
import { searchProducts } from "@/lib/swipall/rest-adapter";
import { ProductKind } from "@/lib/swipall/types/types";
import { cacheLife } from "next/cache";

async function getFeaturedCollectionProducts() {
    'use cache'
    cacheLife('days')

    try {
        const params = {
            limit: 10,
            offset: 0,
        };     
        // Fetch featured products via REST search
        const result = await searchProducts(params);
        return result.results.filter(product => product.kind !== ProductKind.Service);
    } catch (error) {
        // Return empty array during build or when API is unavailable
        return [];
    }
}


export async function FeaturedProducts() {
    const products = await getFeaturedCollectionProducts();    
    if (products?.length === 0) {
        return null;
    }

    return (
        <ProductCarousel
            title="Productos Destacados"
            products={products}
        />
    )
}