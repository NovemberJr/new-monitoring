import { TabsContent } from "@/components/ui/tabs"
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
        <TabsContent
            value={`${id}`}
            className="grid grid-cols-5 grid-rows-5 gap-2 border-1 p-2"
        >
            {cards.map((card, i) => (
                <OnlineCard key={card.id} card={panel.cards[i]} />
            ))}
            {editMode && <OnlinePanelDialog panelId={id} />}
        </TabsContent>
    )
}
