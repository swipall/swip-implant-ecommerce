import { get } from './api';
import type { InterfaceApiListResponse, ProductVariant } from './types';

export async function getGroupVariants(itemId: string): Promise<InterfaceApiListResponse<ProductVariant>> {
  return get<InterfaceApiListResponse<ProductVariant>>(`/api/v1/shop/item/${itemId}/variants`);
}
