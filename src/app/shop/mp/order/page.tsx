import type { Metadata } from 'next';
import { Suspense } from 'react';
import { noIndexRobots } from '@/lib/metadata';
import { MpOrderResult } from './mp-order-result';

export const metadata: Metadata = {
    title: 'Resultado del Pago',
    description: 'Resultado de tu pago procesado por Mercado Pago.',
    robots: noIndexRobots(),
};

interface MpOrderPageProps {
    searchParams: Promise<{
        order?: string;
        status?: 'success' | 'pending' | 'failure';
    }>;
}

export default function MpOrderPage({ searchParams }: MpOrderPageProps) {
    return (
        <Suspense fallback={<div className="container mx-auto px-4 py-16 text-center">Cargando...</div>}>
            <MpOrderResult searchParams={searchParams} />
        </Suspense>
    );
}
