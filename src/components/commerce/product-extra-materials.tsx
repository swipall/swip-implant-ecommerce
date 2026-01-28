import { ShopCartItem } from "@/lib/swipall/types/types";
import { OrderItemDetailInterface } from "@/lib/swipall/users/user.types";
import { Badge } from "../ui/badge";

export default function ProductExtraMaterialsComponent({item}: {item: ShopCartItem | OrderItemDetailInterface}) {
    if(!item || !item.extra_materials || item.extra_materials.length === 0) {
        return null;
    }
    return (
        <div className="flex flex-wrap gap-1 mt-2">
            {item.extra_materials.map((attr, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                    {attr.name}
                </Badge>
            ))}
        </div>
    )
}