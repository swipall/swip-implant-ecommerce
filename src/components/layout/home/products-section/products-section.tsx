import { getCatalogs } from "@/lib/swipall/cached";
import { cacheLife } from "next/cache";
import { ProductsSection } from "./products";

export async function ProductsSection() {
    "use cache";
    cacheLife("days");
    
    const params = {
        parent__slug: "mmcb-ecommerce-banners",
    };
    const collections = await getCatalogs(params);
    const banners = collections.results.filter((banner) => banner.settings?.url);

    return <ProductsSection />;
}
