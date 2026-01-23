'use client';

import {useState, useMemo, useTransition, useEffect} from 'react';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {Button} from '@/components/ui/button';
import {Label} from '@/components/ui/label';
import {RadioGroup, RadioGroupItem} from '@/components/ui/radio-group';
import {ShoppingCart, CheckCircle2} from 'lucide-react';
import {addToCart, getGroupVariants as loadGroupVariants} from '@/app/product/[id]/actions';
import {toast} from 'sonner';
import {Price} from '@/components/commerce/price';
import { InterfaceInventoryItem, ProductVariant } from '@/lib/swipall/types';

interface ProductInfoProps {
    product: InterfaceInventoryItem;
    searchParams: { [key: string]: string | string[] | undefined };
}

export function ProductInfo({product, searchParams}: ProductInfoProps) {
    const pathname = usePathname();
    const router = useRouter();
    const currentSearchParams = useSearchParams();
    const [isPending, startTransition] = useTransition();
    const [isAdded, setIsAdded] = useState(false);

    // Variants state (only for group kind)
    const [variants, setVariants] = useState<ProductVariant[]>([]);
    const [selectedVariantId, setSelectedVariantId] = useState<string | null>(null);

    useEffect(() => {
        console.log(product);
        
        // Only load variants for 'group' kind
        if (product.kind === 'group') {
            startTransition(async () => {
                const res = await loadGroupVariants(product.id);
                if (res?.success) {
                    setVariants(res.variants || []);
                    setSelectedVariantId(res.variants?.[0]?.id || null);
                } else {
                    toast.error('Error', { description: res?.error || 'Error al cargar las variantes' });
                }
            });
        } else {
            // For 'product' and 'compound' kinds, clear variants
            setVariants([]);
            setSelectedVariantId(null);
        }
    }, [product.id, product.kind]);

    // Selected variant by id
    const selectedVariant = useMemo(() => {
        if (selectedVariantId) {
            return variants.find(v => v.id === selectedVariantId) || null;
        }
        return variants.length === 1 ? variants[0] : null;
    }, [variants, selectedVariantId]);

    const handleVariantChange = (variantId: string) => {
        setSelectedVariantId(variantId);
    };

    const handleAddToCart = async () => {
        // For 'group' kind, require a selected variant
        if (product.kind === 'group' && !selectedVariant) return;
        
        // For 'group' kind use the variant ID, otherwise use the product ID
        const itemId = product.kind === 'group' ? selectedVariant?.id : product.id;
        if (!itemId) return;

        startTransition(async () => {
            const result = await addToCart(itemId, 1);

            if (result.success) {
                setIsAdded(true);
                toast.success('Agregado al carrito', {
                    description: `${product.name} ha sido agregado a tu carrito`,
                });

                // Reset the added state after 2 seconds
                setTimeout(() => setIsAdded(false), 2000);
            } else {
                toast.error('Error', {
                    description: result.error || 'Ocurrió un error al agregar al carrito',
                });
            }
        });
    };

    const isInStock = product.kind === 'group' 
        ? (selectedVariant?.available.quantity ?? 0) > 0 
        : (product.available.quantity ?? 0) > 0;
    const canAddToCart = product.kind === 'group' 
        ? !!selectedVariant && isInStock 
        : isInStock;

    return (
        <div className="space-y-6">
            {/* Product Title */}
            <div>
                <h1 className="text-3xl font-bold">{product.name}</h1>
                <p className="text-2xl font-bold mt-2">
                    <Price value={product.kind === 'group' ? selectedVariant?.web_price : product.web_price}/>
                </p>
            </div>

            {/* Product Description */}
            <div className="prose prose-sm max-w-none">
                <div dangerouslySetInnerHTML={{__html: product.description}}/>
            </div>

            {/* Variants Selection - only for group kind */}
            {product.kind === 'group' && variants.length > 0 && (
                <div className="space-y-4">
                    <Label className="text-base font-semibold">
                        Variantes
                    </Label>
                    <RadioGroup
                        value={selectedVariantId || ''}
                        onValueChange={(value) => handleVariantChange(value)}
                    >
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                            {variants.map((variant) => (
                                <div key={variant.id}>
                                    <RadioGroupItem
                                        value={variant.id}
                                        id={variant.id}
                                        className="peer sr-only"
                                    />
                                    <Label
                                        htmlFor={variant.id}
                                        className="flex items-center justify-center rounded-md border-2 border-muted bg-popover px-4 py-3 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary cursor-pointer transition-colors"
                                    >
                                        {variant.name}
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </RadioGroup>
                </div>
            )}

            {/* Stock Status */}
            <div className="text-sm">
                {isInStock ? (
                    <span className="text-green-600 font-medium">Con existencias</span>
                ) : (
                    <span className="text-destructive font-medium">Agotado</span>
                )}
            </div>

            {/* Add to Cart Button */}
            <div className="pt-4">
                <Button
                    size="lg"
                    className="w-full"
                    disabled={!canAddToCart || isPending}
                    onClick={handleAddToCart}
                >
                    {isAdded ? (
                        <>
                            <CheckCircle2 className="mr-2 h-5 w-5"/>
                            Se agregó al carrito
                        </>
                    ) : (
                        <>
                            <ShoppingCart className="mr-2 h-5 w-5"/>
                            {isPending
                                ? 'Agregando...'
                                : !selectedVariant && variants.length > 0
                                    ? 'Seleccionar Variante'
                                    : !isInStock
                                        ? 'Agotado'
                                        : 'Agregar al Carrito'}
                        </>
                    )}
                </Button>
            </div>

            {/* SKU */}
            {product.kind === 'group' ? (
                selectedVariant && (
                    <div className="text-xs text-muted-foreground">
                        SKU: {selectedVariant.sku}
                    </div>
                )
            ) : (
                product.sku && (
                    <div className="text-xs text-muted-foreground">
                        SKU: {product.sku}
                    </div>
                )
            )}
        </div>
    );
}
