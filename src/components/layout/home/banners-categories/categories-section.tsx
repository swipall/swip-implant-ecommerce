import { getCatalogs } from "@/lib/swipall/cached";
import { cacheLife } from "next/cache";
import { CategorySection } from "./banners-categories";

export async function CategoriesSection() {
    "use cache";
    cacheLife("days");
    
    const params = {
        parent__slug: "mmcb-ecommerce-banners",
    };
    const collections = await getCatalogs(params);
    const banners = collections.results.filter((banner) => banner.settings?.url);

    return <CategorySection banners={banners} />;
}
