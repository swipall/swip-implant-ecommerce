import {cacheLife, cacheTag} from 'next/cache';
import { getActiveChannel, getAvailableCountries, getTopCollections as getTopCollectionsREST } from './rest-adapter';

/**
 * Get the active channel with caching enabled.
 * Channel configuration rarely changes, so we cache it for 1 hour.
 */
export async function getActiveChannelCached() {
    'use cache';
    cacheLife('hours');

    const result = await getActiveChannel();
    return result.data;
}

/**
 * Get available countries with caching enabled.
 * Countries list never changes, so we cache it with max duration.
 */
export async function getAvailableCountriesCached() {
    'use cache';
    cacheLife('max');
    cacheTag('countries');

    const result = await getAvailableCountries();
    return result.data;
}

/**
 * Get top-level collections with caching enabled.
 * Collections rarely change, so we cache them for 1 day.
 */
export async function getTopCollections() {
    'use cache';
    cacheLife('days');
    cacheTag('collections');

    const result = await getTopCollectionsREST();
    return result.data;
}
