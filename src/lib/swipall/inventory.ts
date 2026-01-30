import { get } from './api';
import { InterfaceApiListResponse, Material, MaterialItem, ProductVariant } from './types/types';

interface ApiGetGroupVariantsParams {
    [key: string]: any;
}
export async function getGroupVariantByTaxonomies(itemId: string, params?: ApiGetGroupVariantsParams): Promise<ProductVariant> {
    return get<ProductVariant>(`/api/v1/shop/group/${itemId}/variants`, params);
}

export async function fetchCompoundMaterials(itemId: string, params?: any, useAuthToken?: boolean): Promise<InterfaceApiListResponse<Material>> {
    const queryParams = {
        ...params,
        limit: 100,
        offset: 0,
        request_selling: true,
        is_active: true
    };
    return get<InterfaceApiListResponse<Material>>(`/api/v1/compound/${itemId}/materials`, queryParams, { useAuthToken });

}