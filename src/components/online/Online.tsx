import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OnlinePanel } from "./OnlinePanel"
import { OnlineLogin } from "./OnlineLogin"
import { CirclePlus } from "lucide-react"

import { store, addPanel, selectPanel } from "@/store/store"
import { useSnapshot } from "valtio"

export function Online() {
    const { global, panels, activePanel } = useSnapshot(store)
    const { editMode, logged } = global

    return (
        <Tabs className="h-[800px] w-[1200px]" value={activePanel}>
            <div className="flex items-center">
                <TabsList className="mr-auto">
                    {panels.map((el) => (
                        <TabsTrigger
                            key={el.id}
                            value={`${el.id}`}
                            onClick={() => selectPanel(el.id)}
                        >
                            {el.name}
                        </TabsTrigger>
                    ))}
                </TabsList>
                {editMode && <CirclePlus onClick={addPanel} />}
                <OnlineLogin editMode={editMode} logged={logged} />
            </div>
            {panels.map((panel, i) => (
                <TabsContent
                    key={panel.id}
                    value={`${panel.id}`}
                    className="grid grid-cols-5 grid-rows-5 gap-2 border-1 p-2"
                >
                    <OnlinePanel panel={store.panels[i]} />
                </TabsContent>
            ))}
        </Tabs>
    )
}

export default Online
