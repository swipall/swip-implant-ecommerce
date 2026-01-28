import { OrderStatusPaid } from "@/app/account/orders/types";

export default function OrderIsPaidComponent({ isPaid, className = "font-medium text-foreground" }: { isPaid: OrderStatusPaid, className?: string }) {
    const orderPaidText = (isPaid: OrderStatusPaid): string => {
    switch (isPaid) {
        case OrderStatusPaid.paid:
            return "Pagado";
        case OrderStatusPaid.partial:
            return "Pago parcial";
        case OrderStatusPaid.not_paid:
            return "No pagado";
        default:
            return "Desconocido";
    }
};
    
    return ( <span className={className}>{orderPaidText(isPaid)}</span> );
}