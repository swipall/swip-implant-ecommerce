import Image from 'next/image';
import { Price } from '@/components/commerce/price';
import { Suspense } from "react";
import Link from "next/link";
import type { Product as RestProduct } from '@/lib/swipall/rest-adapter';

interface ProductCardProps {
    product: RestProduct;
}

export function ProductCard({product}: ProductCardProps) {
    const prices = (product.variants || []).map(v => v.priceWithTax);
    const hasPrices = prices.length > 0;
    const min = hasPrices ? Math.min(...prices) : undefined;
    const max = hasPrices ? Math.max(...prices) : undefined;

    return (
        <Link
            href={`/product/${product.slug}`}
            className="group block bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-shadow"
        >
            <div className="aspect-square relative bg-muted">
                {product.featuredAsset ? (
                    <Image
                        src={product.featuredAsset.preview}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        No image
                    </div>
                )}
            </div>
            <div className="p-4 space-y-2">
                <h3 className="font-medium line-clamp-2 group-hover:text-primary transition-colors">
                    {product.name}
                </h3>
                <Suspense fallback={<div className="h-8 w-36 rounded bg-muted"></div>}>
                    <p className="text-lg font-bold">
                        {hasPrices ? (
                            min !== max ? (
                                <>from <Price value={min!} /></>
                            ) : (
                                <Price value={min!} />
                            )
                        ) : (
                            <span className="text-muted-foreground">Price not available</span>
                        )}
                    </p>
                </Suspense>
            </div>
        </Link>
    );
}
