import {getAuthToken} from '@/lib/auth';

const SWIPALL_API_URL = process.env.SWIPALL_SHOP_API_URL || process.env.NEXT_PUBLIC_SWIPALL_SHOP_API_URL;
const SWIPALL_AUTH_TOKEN_HEADER = process.env.SWIPALL_AUTH_TOKEN_HEADER || 'Authorization';

if (!SWIPALL_API_URL) {
    throw new Error('SWIPALL_SHOP_API_URL or NEXT_PUBLIC_SWIPALL_SHOP_API_URL environment variable is not set');
}

interface SwipallRequestOptions {
    token?: string;
    useAuthToken?: boolean;
    fetch?: RequestInit;
    tags?: string[];
}

interface SwipallResponse<T> {
    data?: T;
    error?: {
        message: string;
        code?: string;
        [key: string]: unknown;
    };
    errors?: Array<{ message: string; [key: string]: unknown }>;
}

/**
 * Extract the Swipall JWT token from response headers (if returned)
 */
function extractAuthToken(headers: Headers): string | null {
    const authHeader = headers.get(SWIPALL_AUTH_TOKEN_HEADER);
    if (authHeader && authHeader.startsWith('Bearer ')) {
        return authHeader.substring(7);
    }
    return authHeader;
}

/**
 * Execute a GET request against the Swipall REST API
 */
export async function get<TResult>(
    endpoint: string,
    options?: SwipallRequestOptions
): Promise<{ data: TResult; token?: string }> {
    return request<TResult>('GET', endpoint, undefined, options);
}

/**
 * Execute a POST request against the Swipall REST API
 */
export async function post<TResult, TBody = unknown>(
    endpoint: string,
    body?: TBody,
    options?: SwipallRequestOptions
): Promise<{ data: TResult; token?: string }> {
    return request<TResult>('POST', endpoint, body, options);
}

/**
 * Execute a PUT request against the Swipall REST API
 */
export async function put<TResult, TBody = unknown>(
    endpoint: string,
    body?: TBody,
    options?: SwipallRequestOptions
): Promise<{ data: TResult; token?: string }> {
    return request<TResult>('PUT', endpoint, body, options);
}

/**
 * Execute a PATCH request against the Swipall REST API
 */
export async function patch<TResult, TBody = unknown>(
    endpoint: string,
    body?: TBody,
    options?: SwipallRequestOptions
): Promise<{ data: TResult; token?: string }> {
    return request<TResult>('PATCH', endpoint, body, options);
}

/**
 * Execute a DELETE request against the Swipall REST API
 */
export async function remove<TResult>(
    endpoint: string,
    options?: SwipallRequestOptions
): Promise<{ data: TResult; token?: string }> {
    return request<TResult>('DELETE', endpoint, undefined, options);
}

/**
 * Generic request function for Swipall REST API
 */
async function request<TResult>(
    method: string,
    endpoint: string,
    body?: unknown,
    options?: SwipallRequestOptions
): Promise<{ data: TResult; token?: string }> {
    const {
        token,
        useAuthToken,
        fetch: fetchOptions,
        tags,
    } = options || {};

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(fetchOptions?.headers as Record<string, string>),
    };

    // Use the explicitly provided token, or fetch from cookies if useAuthToken is true
    let authToken = token;
    if (useAuthToken && !authToken) {
        authToken = await getAuthToken();
    }

    if (authToken) {
        // Support both "Bearer token" and plain token formats
        if (authToken.startsWith('Bearer ')) {
            headers[SWIPALL_AUTH_TOKEN_HEADER] = authToken;
        } else {
            headers[SWIPALL_AUTH_TOKEN_HEADER] = `Bearer ${authToken}`;
        }
    }

    const url = `${SWIPALL_API_URL}${endpoint}`;
    const requestInit: RequestInit = {
        ...fetchOptions,
        method,
        headers,
        ...(tags ? { next: { tags } } : {}),
    };
    if (body !== undefined) {
        requestInit.body = JSON.stringify(body);
    }

    const response = await fetch(url, requestInit);

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        const errorMessage = errorData?.error?.message || errorData?.message || `HTTP error! status: ${response.status}`;
        throw new Error(errorMessage);
    }

    const result: SwipallResponse<TResult> = await response.json();

    if (result.error) {
        throw new Error(result.error.message);
    }

    if (result.errors && result.errors.length > 0) {
        throw new Error(result.errors.map(e => e.message).join(', '));
    }

    if (!result.data) {
        throw new Error('No data returned from Swipall API');
    }

    const newToken = extractAuthToken(response.headers);

    return {
        data: result.data,
        ...(newToken && {token: newToken}),
    };
}

/**
 * Legacy compatibility exports for query/mutate (maps to REST endpoints)
 * These are here to help with gradual migration from GraphQL
 */
export async function query<TResult>(
    endpoint: string,
    variables?: unknown,
    options?: SwipallRequestOptions
): Promise<{ data: TResult; token?: string }> {
    // For REST, queries are typically GET requests with query params
    // For now, we'll support both GET and POST depending on complexity
    const queryParams = new URLSearchParams();
    if (variables && typeof variables === 'object') {
        Object.entries(variables).forEach(([key, value]) => {
            queryParams.append(key, String(value));
        });
    }
    
    const endpointWithParams = queryParams.toString() ? `${endpoint}?${queryParams.toString()}` : endpoint;
    return get<TResult>(endpointWithParams, options);
}

export async function mutate<TResult>(
    endpoint: string,
    variables?: unknown,
    options?: SwipallRequestOptions
): Promise<{ data: TResult; token?: string }> {
    // For REST, mutations are POST/PUT/PATCH requests
    return post<TResult>(endpoint, variables, options);
}

