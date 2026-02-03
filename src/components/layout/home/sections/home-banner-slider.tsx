import { getPosts } from "@/lib/swipall/rest-adapter";
import { CmsPost } from "@/lib/swipall/types/types";
import { cacheLife } from "next/cache";
import { HomeBannerSliderSection } from "./home-banner-slider-section";

export async function HomeBannerSliderSectionWrapper({ post, items }: { post: CmsPost; items?: CmsPost[] }) {
    "use cache";
    cacheLife("hours");

    // If items are provided, use them directly
    if (items && items.length > 0) {
        return <HomeBannerSliderSection post={post} items={items} />;
    }
    try {
        const sliderItems = await getPosts({ parent__slug: post.slug });
        const sortedItems = (sliderItems.results ?? [])
            .sort((a, b) => (a.ordering ?? 0) - (b.ordering ?? 0));
        return <HomeBannerSliderSection post={post} items={sortedItems} />;
    } catch (error) {
        return null;
    }
}