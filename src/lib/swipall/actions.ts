import {getActiveCustomer as fetchActiveCustomer} from './rest-adapter';
import {getActiveChannelCached} from './cached';
import {cache} from "react";

export const getActiveCustomer = cache(async () => {
    try {
        const result = await fetchActiveCustomer({ useAuthToken: true });
        return result.data;
    } catch (error) {
        // Return null if not authenticated or error occurs
        return null;
    }
})

export const getActiveChannel = getActiveChannelCached;
