import { emitSectionHover } from "@facture/helpers";
import { useInterval } from "@facture/hooks";
import { ImageDisplay } from "@facture/types";
import { Photo } from "tabler-icons-react";

import { Carousel } from "../../../";
import { DisplayCard } from "./displayCard";

interface Props {
    display: ImageDisplay[];
}

export function Display({ display }: Props) {
    const period = 1000;
    const { start, stop } = useInterval(period, () => emitSectionHover("display", period));

    if (display.length > 0)
        return (
            <div className="shadow-md rounded-md p-6 bg-white" onMouseEnter={start} onMouseLeave={stop}>
                <div className="flex space-x-2 items-center mb-6 text-gray-800">
                    <Photo />
                    <h3 className="font-bold text-lg">Gallery</h3>
                </div>
                <Carousel
                    element={display.map((data) => (
                        <DisplayCard display={data} />
                    ))}
                    shiftSize={1000}
                />
            </div>
        );

    return null;
}

export default Display;
