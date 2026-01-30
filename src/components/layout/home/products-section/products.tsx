"use client";

import Image from "next/image";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { CatalogInterface } from "@/lib/swipall/rest-adapter";
import { ChevronLeft, Star } from "lucide-react";


interface HeroCarouselProps {
    banners: CatalogInterface[];
}

export function ProductsSection({ banners }: HeroCarouselProps) {
    return (
        <section className="relative w-full overflow-hidden q">
            <section className="py-16 bg-transparent">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-1 gap-8">
                        <div className="space-y-3 bg-card px-4 py-6 rounded-xl shadow-sm flex">
                            <div className="p-4 text-center">
                                <Image
                                    src="https://mmcb.b-cdn.net/media/attachments/6/5/8/5/eb058c9e13a8a2f4bab1351c09b979dda78fa2939727ff1262edb6e2cd69/implant-labs.jpg"
                                    width={700}
                                    height={700}
                                    className="m-auto rounded-xl"
                                    alt="Implant Alfa Platinum"
                                />
                            </div>
                            <div className="text-left pt-8 px-4">
                                <h3 className="text-3xl font-semibold mb-2">Implant Alfa Platinum</h3>
                                <p className="text-muted-foreground mb-6 text-xl">Desarrollo de hormonales sintéticos para el desempeño de ganado de engorda, bajo estrictas normas y controles de calidad.</p>
                                <hr className="py-4" />
                                <p className="text-muted-foreground text-xl">Esteroide anabólico inyectable. </p>
                                <p className="text-muted-foreground text-xl">Fórmula Concentrada. Mayor Concentración. </p>
                                <p className="text-muted-foreground mb-6 text-xl">Presentaciones de 250ml y 500ml.</p>
                                <a href="" className="dark:bg-gray-800 bg-black text-white px-4 py-2 rounded-md" type="button">Validar autenticidad</a>
                            </div>
                        </div>
                        {/** New producto comming soon className now is hidden */}
                        <div className="space-y-3 bg-card px-4 py-6 rounded-xl shadow-sm flex hidden">
                            <div className="p-4 text-center">
                                <Image
                                    src="https://mmcb.b-cdn.net/media/attachments/6/5/8/5/eb058c9e13a8a2f4bab1351c09b979dda78fa2939727ff1262edb6e2cd69/implant-labs.jpg"
                                    width={700} 
                                    height={700}
                                    className="m-auto rounded-xl"
                                    alt="Implant Alfa Platinum"
                                />
                            </div>
                            <div className="text-left pt-8 px-4">
                                <h3 className="text-3xl font-semibold mb-2">Implant Alfa Platinum</h3>
                                <div className="flex items-center bg-amber-100 text-amber-700 w-40 px-2 py-1 rounded-full text-sm mb-4 justify-center"><Star size={14}/> <span className="ml-2">Producto nuevo</span></div>
                                <p className="text-muted-foreground mb-6 text-xl">Desarrollo de hormonales sintéticos para el desempeño de ganado de engorda, bajo estrictas normas y controles de calidad.</p>
                                <hr className="py-4" />
                                <p className="text-muted-foreground text-xl">Esteroide anabólico inyectable. </p>
                                <p className="text-muted-foreground text-xl">Fórmula Concentrada. Mayor Concentración. </p>
                                <p className="text-muted-foreground mb-6 text-xl">Presentaciones de 250ml y 500ml.</p>
                                <a href="" className="dark:bg-gray-800 bg-black text-white px-4 py-2 rounded-md" type="button">Validar autenticidad</a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </section>
    );
}
