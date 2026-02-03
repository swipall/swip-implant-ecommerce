import type { Metadata } from 'next';
import { Suspense } from 'react';
import { searchProducts, getCollection } from '@/lib/swipall/rest-adapter';
import { ProductGrid } from '@/components/commerce/product-grid';
import { FacetFilters } from '@/components/commerce/facet-filters';
import { ProductGridSkeleton } from '@/components/shared/product-grid-skeleton';
import { buildSearchInput, getCurrentPage } from '@/lib/search-helpers';
import { cacheLife, cacheTag } from 'next/cache';
import {
    SITE_NAME,
    truncateDescription,
    buildCanonicalUrl,
    buildOgImages,
} from '@/lib/metadata';
import { title } from 'process';


async function getPageMetadata(slug: string) {
    'use cache';
    cacheLife('hours');
    cacheTag(`page-meta-${slug}`);

    // return await getCollection(slug);
    return { data: {name: '', slug: slug }}
}

export async function generateMetadata({
    params,
}: PageProps<'/page/[slug]'>): Promise<Metadata> {
    const { slug } = await params;
    const result = await getPageMetadata(slug);
    const collection = result.data;

    if (!collection) {
        return {
            title: 'Page Not Found',
        };
    }

    const description = `Browse our ${collection.name} collection at ${SITE_NAME}`;

    return {
        title: collection.name,
        description,
        alternates: {
            canonical: buildCanonicalUrl(`/collection/${collection.slug}`),
        },
        openGraph: {
            title: collection.name,
            description,
            type: 'website',
            url: buildCanonicalUrl(`/collection/${collection.slug}`),
            images: buildOgImages(undefined, collection.name),
        },
        twitter: {
            card: 'summary_large_image',
            title: collection.name,
            description,
        },
    };
}

export default async function Pages({ params, searchParams }: PageProps<'/collection/[slug]'>) {
    const { slug } = await params;
    const searchParamsResolved = await searchParams;
    const page = getCurrentPage(searchParamsResolved);

    return (
        <div className="container mx-auto px-4 py-8 mt-16">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
               {title}
            </div>
        </div>
    );
}