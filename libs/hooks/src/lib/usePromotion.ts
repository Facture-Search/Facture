import { emitPromotionView, PROMOTION_DELAY } from "@facture/helpers";
import { useEffect, useRef, useState } from "react";

export function usePromotion() {
    const timeout = useRef<NodeJS.Timeout | null>(null);
    const [visible, setVisible] = useState<boolean>(false);

    useEffect(() => {
        timeout.current = setTimeout(() => {
            emitPromotionView("mailing_list");
            setVisible(true);
        }, PROMOTION_DELAY);

        return () => {
            if (timeout.current) clearTimeout(timeout.current);
        };
    }, []);

    return { visible, setVisible };
}

export default usePromotion;
