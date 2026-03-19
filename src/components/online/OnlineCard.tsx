import { OnlineCardDialog } from "./OnlineCardDialog"
import { Thermometer, Droplets } from "lucide-react"

import { store, showHistory, type Card } from "@/store/store"
import { useSnapshot } from "valtio"

interface Props {
    card: Card
}

export function OnlineCard({ card }: Props) {
    const { editMode } = useSnapshot(store.global)
    const { name, temperature, moisture } = useSnapshot(card)

    const hadnleDoubleClick = () => {
        showHistory()
    }

    return (
        <div
            className="flex flex-col items-center border-1 p-2 text-center"
            onDoubleClick={hadnleDoubleClick}
        >
            <div className="flex h-6 w-full items-center justify-between">
                <h3 className="">{name}</h3>
                {editMode && (
                    <OnlineCardDialog
                        name={name}
                        temperature={temperature}
                        moisture={moisture}
                        card={card}
                    />
                )}
            </div>
            <div className="mt-6 flex gap-4">
                {temperature !== undefined && (
                    <div>
                        <Thermometer />
                        {temperature.value}
                    </div>
                )}
                {moisture !== undefined && (
                    <div>
                        <Droplets />
                        {moisture.value}
                    </div>
                )}
            </div>
        </div>
    )
}
