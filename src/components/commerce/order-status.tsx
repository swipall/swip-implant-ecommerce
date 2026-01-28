
export default function OrderStatusComponent({ status, className= "font-medium text-foreground" }: { status: number, className?: string }) {

    const getStatusText = (status: number) => {
        switch (status) {
            case 0: return "Pendiente";
            case 1: return "En proceso";
            case 2: return "Completado";
            case 3: return "Cancelado";
            default: return "Desconocido";
        }
    };

    return (<span className={className}>{getStatusText(status)}</span>);
}