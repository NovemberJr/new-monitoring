import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { OnlinePanel } from "./OnlinePanel"
import { OnlineLogin } from "./OnlineLogin"
import { OnlineSettingsDialog } from "./OnlineSettingsDialog"
import { CirclePlus } from "lucide-react"

import { store, addPanel, deletePanel, selectPanel } from "@/store/store"
import { useSnapshot } from "valtio"

export function Online() {
    const { global, panels, activePanel } = useSnapshot(store)
    const { editMode, logged } = global

    return (
        <Tabs className="h-[800px] w-[1200px] gap-0" value={activePanel}>
            <div className="flex items-center">
                <TabsList
                    className="min-w-[500px] justify-start bg-zinc-800"
                    variant="line"
                >
                    {panels.map((el) => (
                        <div key={el.id} className="flex">
                            {editMode && (
                                <style>
                                    {`
								button[aria-selected="true"] + button {
									color: white;
								}
								button[role="tab"]:hover + button {
									color: white;
								}
								button[aria-selected="true"]::after {
									right: -20px;
								}
							`}
                                </style>
                            )}
                            <TabsTrigger
                                value={`${el.id}`}
                                onClick={() => selectPanel(el.id)}
                                className="flex-0"
                            >
                                {el.name}
                            </TabsTrigger>
                            {editMode && (
                                <OnlineSettingsDialog
                                    deletePanel={() => deletePanel(el.id)}
                                />
                            )}
                        </div>
                    ))}
                    {editMode && (
                        <CirclePlus
                            onClick={addPanel}
                            className="h-5 hover:text-white"
                        />
                    )}
                </TabsList>
                <div
                    className="h-full w-[80px] bg-zinc-800"
                    style={{
                        clipPath: `polygon(
  0% 0%, 2% 0.8%, 4% 1.5%, 6% 2.5%, 8% 3.6%, 10% 5%, 12% 6.5%, 14% 8%, 16% 9.7%, 18% 11.5%,
  20% 13.5%, 22% 15.6%, 24% 17.9%, 26% 20.2%, 28% 22.7%, 30% 25%, 32% 27.5%, 34% 30%, 36% 32.7%, 38% 35.5%,
  40% 38.5%, 42% 41.5%, 44% 44.5%, 46% 47.5%, 48% 50.5%, 50% 53.5%, 52% 56.5%, 54% 59.5%, 56% 62.5%, 58% 65.5%,
  60% 68%, 62% 71%, 64% 73.5%, 66% 76%, 68% 78.5%, 70% 81%, 72% 83.5%, 74% 86%, 76% 88.5%, 78% 91%,
  80% 93%, 82% 95%, 84% 96%, 86% 97%, 88% 98%, 90% 98.5%, 92% 99%, 94% 99.3%, 96% 99.6%, 98% 99.8%, 100% 100%,
  100% 100%, 0% 100%
)`,
                    }}
                ></div>
                <div className="ml-auto flex">
                    <OnlineLogin editMode={editMode} logged={logged} />
                </div>
            </div>
            <div className="bg-zinc-800">
                {panels.map((panel, i) => (
                    <TabsContent
                        key={panel.id}
                        value={`${panel.id}`}
                        className="grid grid-cols-5 gap-2 border-1 p-2"
                        style={{
                            gridTemplateRows: "repeat(5, 145px)",
                        }}
                    >
                        <OnlinePanel panel={store.panels[i]} />
                    </TabsContent>
                ))}
            </div>
        </Tabs>
    )
}

export default Online
