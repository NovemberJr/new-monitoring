import { OnlineCard } from "./OnlineCard"
import { OnlinePanelDialog } from "./OnlinePanelDialog"

import { store, type Panel } from "@/store/store"
import { useSnapshot } from "valtio"

interface Props {
    panel: Panel
}

export function OnlinePanel({ panel }: Props) {
    const { editMode } = useSnapshot(store.global)
    const { id, cards } = useSnapshot(panel)

    return (
        <>
            {cards.map((card, i) => (
                <OnlineCard key={card.id} card={panel.cards[i]} />
            ))}
            {editMode && <OnlinePanelDialog panelId={id} />}
        </>
    )
}
