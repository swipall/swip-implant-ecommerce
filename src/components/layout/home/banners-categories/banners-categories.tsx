"use client";

import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { CatalogInterface } from "@/lib/swipall/rest-adapter";

interface HeroCarouselProps {
    banners: CatalogInterface[];
}

export function CategorySection({ banners }: HeroCarouselProps) {
    if (banners.length === 0) {
        return null;
    }

    return (
        <section className="relative w-full overflow-hidden bg-muted q">
            <section className="py-16 bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="grid md:grid-cols-3 gap-8 text-center">
                        <div className="space-y-3">
                            <div
                                className="w-12 h-12 mx-auto bg-red-100 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-red-400">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold">ADVERTENCIA</h3>
                            <p className="text-muted-foreground">Han clonado y falsificado nuestra información y productos. No compres o verifiques nuestros productos en sitios web no oficiales.</p>
                        </div>
                        <div className="space-y-3">
                            <div
                                className="w-12 h-12 mx-auto bg-sky-100 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-sky-600">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold">CONTACTANOS</h3>
                            <p className="text-muted-foreground">Comunicate con nosotros ante cualquier duda. Nuestro medio oficial de contacto es <b>info@implantlabs-alfa.com</b></p>
                        </div>
                        <div className="space-y-3">
                            <div
                                className="w-12 h-12 mx-auto bg-teal-100 rounded-full flex items-center justify-center">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6 text-teal-600">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold">CALIDAD Y SEGURIDAD</h3>
                            <p className="text-muted-foreground">Confianza y seguridad, valida nuestros productos de forma segura. No compres productos falsos.</p>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}
