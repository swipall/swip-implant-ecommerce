import type { Metadata } from "next";
import { HomePageComponent } from "@/components/layout/home/home-page-component";
import { SITE_NAME, SITE_URL, buildCanonicalUrl } from "@/lib/metadata";

export const metadata: Metadata = {
    title: {
        absolute: `${SITE_NAME} - Esteroide Anabolico Inyectable`,
    },
    description:
        "Especializados para el desempeño de ganado de engorda, bajo estrictas normas y controles de calidad.",
    alternates: {
        canonical: buildCanonicalUrl("/"),
    },
    openGraph: {
        title: `${SITE_NAME} - Esteroide Anabolico Inyectable`,
        description:
            "Especializados para el desempeño de ganado de engorda, bajo estrictas normas y controles de calidad.",
        type: "website",
        url: SITE_URL,
    },
};

export default async function Home(_props: PageProps<'/'>) {
    return (
        <HomePageComponent />
    );
}

