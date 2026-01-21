/**
 * REST API Adapter for Swipall
 * 
 * This file provides helper functions to map the ecommerce operations
 * to REST API endpoints and handle response transformation.
 * 
 * The API follows a REST structure like:
 * - GET /api/auth/me - Get current user
 * - POST /api/auth/login - Login
 * - POST /api/auth/logout - Logout
 * - GET /api/products - Get products
 * - GET /api/products/{id} - Get product detail
 * - POST /api/cart/items - Add to cart
 * - GET /api/orders - Get user orders
 * etc.
 */

import { post, get, put, patch, remove } from './api';

// ============================================================================
// Authentication Endpoints
// ============================================================================

export interface LoginInput {
    username: string;
    password: string;
}

export interface LoginResponse {
    user: {
        id: string;
        identifier: string;
        firstName?: string;
        lastName?: string;
        emailAddress: string;
    };
    token: string;
}

export async function login(credentials: LoginInput): Promise<{ data: LoginResponse; token?: string }> {
    return post<LoginResponse>('/auth/login', credentials);
}

export async function logout(options?: { useAuthToken?: boolean }): Promise<{ data: { success: boolean }; token?: string }> {
    return post<{ success: boolean }>('/auth/logout', undefined, { useAuthToken: options?.useAuthToken });
}

// ============================================================================
// Customer/User Endpoints
// ============================================================================

export interface CurrentUser {
    id: string;
    identifier: string;
    firstName?: string;
    lastName?: string;
    emailAddress: string;
    phoneNumber?: string;
    addresses?: Address[];
}

export interface Address {
    id: string;
    fullName: string;
    company?: string;
    streetLine1: string;
    streetLine2?: string;
    city: string;
    province?: string;
    postalCode: string;
    country: {
        id: string;
        code: string;
        name: string;
    };
    phoneNumber?: string;
    defaultShippingAddress?: boolean;
    defaultBillingAddress?: boolean;
}

export async function getActiveCustomer(options?: { useAuthToken?: boolean }): Promise<{ data: CurrentUser; token?: string }> {
    return get<CurrentUser>('/auth/me', { useAuthToken: options?.useAuthToken });
}

export interface UpdateCustomerInput {
    firstName?: string;
    lastName?: string;
}

export async function updateCustomer(input: UpdateCustomerInput, options?: { useAuthToken?: boolean }): Promise<{ data: CurrentUser; token?: string }> {
    return patch<CurrentUser>('/customers/me', input, { useAuthToken: options?.useAuthToken });
}

export async function updateCustomerPassword(
    currentPassword: string,
    newPassword: string,
    options?: { useAuthToken?: boolean }
): Promise<{ data: { success: boolean }; token?: string }> {
    return post<{ success: boolean }>('/customers/me/password', { currentPassword, newPassword }, { useAuthToken: options?.useAuthToken });
}

// ============================================================================
// Customer Address Endpoints
// ============================================================================

export interface CreateAddressInput {
    fullName: string;
    company?: string;
    streetLine1: string;
    streetLine2?: string;
    city: string;
    province?: string;
    postalCode: string;
    countryCode: string;
    phoneNumber?: string;
    defaultShippingAddress?: boolean;
    defaultBillingAddress?: boolean;
}

export async function createCustomerAddress(input: CreateAddressInput, options?: { useAuthToken?: boolean }): Promise<{ data: Address; token?: string }> {
    return post<Address>('/customers/me/addresses', input, { useAuthToken: options?.useAuthToken });
}

export async function updateCustomerAddress(id: string, input: Partial<CreateAddressInput>, options?: { useAuthToken?: boolean }): Promise<{ data: Address; token?: string }> {
    return patch<Address>(`/customers/me/addresses/${id}`, input, { useAuthToken: options?.useAuthToken });
}

export async function deleteCustomerAddress(id: string, options?: { useAuthToken?: boolean }): Promise<{ data: { success: boolean }; token?: string }> {
    return remove<{ success: boolean }>(`/customers/me/addresses/${id}`, { useAuthToken: options?.useAuthToken });
}

export async function setDefaultShippingAddress(id: string, options?: { useAuthToken?: boolean }): Promise<{ data: Address; token?: string }> {
    return patch<Address>(`/customers/me/addresses/${id}`, { defaultShippingAddress: true }, { useAuthToken: options?.useAuthToken });
}

export async function setDefaultBillingAddress(id: string, options?: { useAuthToken?: boolean }): Promise<{ data: Address; token?: string }> {
    return patch<Address>(`/customers/me/addresses/${id}`, { defaultBillingAddress: true }, { useAuthToken: options?.useAuthToken });
}

// ============================================================================
// Product Endpoints
// ============================================================================

export interface Product {
    id: string;
    name: string;
    slug: string;
    description?: string;
    featuredAsset?: Asset;
    variants: ProductVariant[];
    collections?: Collection[];
}

export interface ProductVariant {
    id: string;
    name: string;
    sku: string;
    price: number;
    priceWithTax: number;
    stock: number;
}

export interface Asset {
    id: string;
    name: string;
    preview: string;
}

export interface Collection {
    id: string;
    name: string;
    slug: string;
}

export async function getProduct(slug: string): Promise<{ data: Product; token?: string }> {
    return get<Product>(`/products/${slug}`);
}

export async function getCollection(slug: string): Promise<{ data: Collection; token?: string }> {
    return get<Collection>(`/collections/${slug}`);
}

export async function getTopCollections(): Promise<{ data: Collection[]; token?: string }> {
    return get<Collection[]>('/collections/top');
}

export async function getAvailableCountries(): Promise<{ data: Array<{ id: string; code: string; name: string }>; token?: string }> {
    return get<Array<{ id: string; code: string; name: string }>>('/countries');
}

export async function getActiveChannel(): Promise<{ data: any; token?: string }> {
    return get('/channel');
}

export async function getCustomerAddresses(options?: { useAuthToken?: boolean }): Promise<{ data: Address[]; token?: string }> {
    return get<Address[]>('/customers/me/addresses', { useAuthToken: options?.useAuthToken });
}

// ============================================================================
// Search Endpoints
// ============================================================================

export interface SearchInput {
    query?: string;
    skip?: number;
    take?: number;
    sort?: string;
    facets?: Record<string, string[]>;
}

export interface SearchResult {
    items: Product[];
    totalItems: number;
    facetValues?: Array<{
        count: number;
        facetValue: {
            id: string;
            name: string;
            facet: {
                id: string;
                name: string;
            };
        };
    }>;
}

export async function searchProducts(input: SearchInput): Promise<{ data: SearchResult; token?: string }> {
    const params = new URLSearchParams();
    if (input.query) params.append('q', input.query);
    if (input.skip) params.append('skip', String(input.skip));
    if (input.take) params.append('take', String(input.take));
    if (input.sort) params.append('sort', input.sort);
    if (input.facets) {
        Object.entries(input.facets).forEach(([key, values]) => {
            values.forEach(v => params.append(`facets[${key}]`, v));
        });
    }

    const queryString = params.toString();
    const endpoint = queryString ? `/products/search?${queryString}` : '/products/search';
    return get<SearchResult>(endpoint);
}

// ============================================================================
// Cart/Order Endpoints
// ============================================================================

export interface OrderLine {
    id: string;
    productVariant: {
        id: string;
        name: string;
        sku: string;
        product: {
            id: string;
            name: string;
            slug: string;
            featuredAsset?: Asset;
        };
    };
    unitPriceWithTax: number;
    quantity: number;
    linePriceWithTax: number;
}

export interface Order {
    id: string;
    code: string;
    state: string;
    totalQuantity: number;
    totalWithTax: number;
    shippingWithTax: number;
    subTotalWithTax?: number;
    currencyCode?: string;
    couponCodes?: string[];
    discounts?: Array<{
        description: string;
        amountWithTax: number;
    }>;
    lines: OrderLine[];
    shippingAddress?: Address;
    billingAddress?: Address;
    shippingLines?: Array<{
        shippingMethod: {
            id: string;
            name: string;
            description?: string;
        };
        priceWithTax: number;
    }>;
    customer?: CurrentUser;
}

export async function getActiveOrder(options?: { useAuthToken?: boolean }): Promise<{ data: Order; token?: string }> {
    return get<Order>('/cart', { useAuthToken: options?.useAuthToken });
}

export interface AddToCartInput {
    variantId: string;
    quantity: number;
}

export async function addToCart(input: AddToCartInput, options?: { useAuthToken?: boolean }): Promise<{ data: Order; token?: string }> {
    return post<Order>('/cart/items', input, { useAuthToken: options?.useAuthToken });
}

export async function removeFromCart(lineId: string, options?: { useAuthToken?: boolean }): Promise<{ data: Order; token?: string }> {
    return remove<Order>(`/cart/items/${lineId}`, { useAuthToken: options?.useAuthToken });
}

export async function adjustQuantity(lineId: string, quantity: number, options?: { useAuthToken?: boolean }): Promise<{ data: Order; token?: string }> {
    return patch<Order>(`/cart/items/${lineId}`, { quantity }, { useAuthToken: options?.useAuthToken });
}

export async function applyPromotionCode(couponCode: string, options?: { useAuthToken?: boolean }): Promise<{ data: Order; token?: string }> {
    return post<Order>('/cart/promotions', { couponCode }, { useAuthToken: options?.useAuthToken });
}

export async function removePromotionCode(couponCode: string, options?: { useAuthToken?: boolean }): Promise<{ data: Order; token?: string }> {
    return remove<Order>(`/cart/promotions/${couponCode}`, { useAuthToken: options?.useAuthToken });
}

// ============================================================================
// Checkout Endpoints
// ============================================================================

export async function setShippingAddress(input: CreateAddressInput, options?: { useAuthToken?: boolean }): Promise<{ data: Order; token?: string }> {
    return patch<Order>('/cart/shipping-address', input, { useAuthToken: options?.useAuthToken });
}

export async function setBillingAddress(input: CreateAddressInput, options?: { useAuthToken?: boolean }): Promise<{ data: Order; token?: string }> {
    return patch<Order>('/cart/billing-address', input, { useAuthToken: options?.useAuthToken });
}

export interface ShippingMethod {
    id: string;
    name: string;
    code: string;
    description?: string;
    priceWithTax: number;
}

export interface PaymentMethod {
    id: string;
    code: string;
    name: string;
    description?: string;
    isEligible: boolean;
}

export async function getEligibleShippingMethods(options?: { useAuthToken?: boolean }): Promise<{ data: ShippingMethod[]; token?: string }> {
    return get<ShippingMethod[]>('/cart/shipping-methods', { useAuthToken: options?.useAuthToken });
}
export async function getEligiblePaymentMethods(options?: { useAuthToken?: boolean }): Promise<{ data: PaymentMethod[]; token?: string }> {
    return get<PaymentMethod[]>('/payment-methods', { useAuthToken: options?.useAuthToken });
}
export async function setShippingMethod(shippingMethodId: string[], options?: { useAuthToken?: boolean }): Promise<{ data: Order; token?: string }> {
    return post<Order>('/cart/shipping-method', { shippingMethodId }, { useAuthToken: options?.useAuthToken });
}

export interface PaymentInput {
    method: string;
    amount?: number;
    metadata?: Record<string, any>;
}

export async function addPaymentToOrder(input: PaymentInput, options?: { useAuthToken?: boolean }): Promise<{ data: Order; token?: string }> {
    return post<Order>('/cart/payment', input, { useAuthToken: options?.useAuthToken });
}

export async function transitionOrderToState(state: string, options?: { useAuthToken?: boolean }): Promise<{ data: Order; token?: string }> {
    return post<Order>('/cart/transition', { state }, { useAuthToken: options?.useAuthToken });
}

// ============================================================================
// Order History Endpoints
// ============================================================================

export async function getCustomerOrders(params?: { take?: number; skip?: number }, options?: { useAuthToken?: boolean }): Promise<{ data: { orders: Order[]; totalItems: number }; token?: string }> {
    const searchParams = new URLSearchParams();
    if (params?.take) searchParams.set('take', params.take.toString());
    if (params?.skip) searchParams.set('skip', params.skip.toString());
    const query = searchParams.toString() ? `?${searchParams.toString()}` : '';
    return get<{ orders: Order[]; totalItems: number }>(`/orders${query}`, { useAuthToken: options?.useAuthToken });
}

export async function getOrderDetail(code: string, options?: { useAuthToken?: boolean }): Promise<{ data: Order; token?: string }> {
    return get<Order>(`/orders/${code}`, { useAuthToken: options?.useAuthToken });
}

// ============================================================================
// Registration & Password Reset Endpoints
// ============================================================================

export interface RegisterInput {
    emailAddress: string;
    firstName: string;
    lastName: string;
    password: string;
}

export async function registerCustomer(input: RegisterInput): Promise<{ data: { success: boolean }; token?: string }> {
    return post<{ success: boolean }>('/auth/register', input);
}

export async function requestPasswordReset(emailAddress: string): Promise<{ data: { success: boolean }; token?: string }> {
    return post<{ success: boolean }>('/auth/reset-password/request', { emailAddress });
}

export async function resetPassword(token: string, password: string): Promise<{ data: { user: CurrentUser }; token?: string }> {
    return post<{ user: CurrentUser }>('/auth/reset-password', { token, password });
}

// ============================================================================
// Email Verification Endpoints
// ============================================================================

export async function verifyCustomerAccount(token: string): Promise<{ data: { success: boolean }; token?: string }> {
    return post<{ success: boolean }>('/auth/verify', { token });
}

export async function requestUpdateCustomerEmailAddress(
    password: string,
    newEmailAddress: string,
    options?: { useAuthToken?: boolean }
): Promise<{ data: { success: boolean }; token?: string }> {
    return post<{ success: boolean }>('/customers/me/email/request-update', { password, newEmailAddress }, { useAuthToken: options?.useAuthToken });
}

export async function updateCustomerEmailAddress(token: string, options?: { useAuthToken?: boolean }): Promise<{ data: { success: boolean }; token?: string }> {
    return post<{ success: boolean }>('/customers/me/email/update', { token }, { useAuthToken: options?.useAuthToken });
}
