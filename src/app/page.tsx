import type { Metadata } from "next";
import { FeaturedBannersDisplay } from "@/components/layout/home/banners-section";
import { FeaturedProducts } from "@/components/commerce/featured-products";
import { SITE_NAME, SITE_URL, buildCanonicalUrl } from "@/lib/metadata";
import { CategoriesSection } from "@/components/layout/home/banners-categories/categories-section";
import { ProductsSection } from "@/components/layout/home/products-section/products";
import Image from "next/image";
import { TriangleAlert } from "lucide-react";


export const metadata: Metadata = {
    title: {
        absolute: `${SITE_NAME} - Your One-Stop Shop`,
    },
    description:
        "Discover high-quality products at competitive prices. Shop now for the best deals on electronics, fashion, home goods, and more.",
    alternates: {
        canonical: buildCanonicalUrl("/"),
    },
    openGraph: {
        title: `${SITE_NAME} - Your One-Stop Shop`,
        description:
            "Discover high-quality products at competitive prices. Shop now for the best deals.",
        type: "website",
        url: SITE_URL,
    },
};

export default async function Home(_props: PageProps<'/'>) {
    return (
        <div className="min-h-screen bg-muted">
            <FeaturedBannersDisplay />
            <CategoriesSection />
            <ProductsSection />
            <FeaturedProducts />

            {/* You can add more sections here */}
            <section className="py-[90px] bg-muted/30">
                <div className="container mx-auto px-4">
                    <div className="">
                        <div className="space-y-3 flex flex-col">
                            <div>
                                <Image
                                    src="https://mmcb.b-cdn.net/media/attachments/6/f/4/3/bcda60aa7acc40fcef96753cc34858982422a775dc82a69047d664825194/logo-implant.png"
                                    width={300}
                                    height={50}
                                    className="m-auto rounded-xl"
                                    alt="Implant Labs"
                                />
                            </div>
                            <div className="container px-6">
                                <p className="text-muted-foreground text-lg text-center">
                                    Somos una empresa farmacéutica dedica a la producción de hormonales sintéticos especializados para el desempeño de
                                    ganado de engorda, bajo estrictas normas y controles de calidad para satisfacer las necesidades de nuestros consumidores,
                                    partiendo de la más alta y novedosa tecnología de estándares de calidad para cumplir con las expectativas más altas en pureza,
                                    potencia y calidad.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-red-100 text-center dark:bg-red-950">
                <div className="container mx-auto px-6 py-8 rounded-md">
                    <div className="h3 font-bold text-red-700 dark:text-red-400 flex items-center justify-center">
                        <TriangleAlert size={16} className="text-red-700 mr-2 dark:text-red-400" />
                        NO CONTAMOS CON REDES SOCIALES OFICIALES
                    </div>
                    <p className="text-red-700 dark:text-red-200">
                        No tenemos Facebook, Twitter, Instagram o cualquier otra red Social que exprese la venta o distribución de nuestros productos, esto con el fin de proteger a nuestros consumidores de los posibles productos falsos o piratas que dicen ser de nuestra marca.
                    </p>
                </div>
            </section>
        </div>
    );
}
