import { useState } from "react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "../ui/label"
import { HistoryChart } from "./HistortChart"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { Button } from "@/components/ui/button"
import { Undo2 } from "lucide-react"

import { store, showOnline, setHistoryInterval } from "@/store/store"
import { useSnapshot } from "valtio"
import { subHours } from "date-fns/subHours"
import { set } from "date-fns/set"
import { cn } from "@/lib/utils"

export function History() {
    const { rooms, activeRoom, historyInterval } = useSnapshot(store)
    const [accordionValue, setAccordionValue] = useState<string[]>([
        activeRoom.name,
    ])
    const [tempCheckbox, _setTempCheckbox] = useState(!!activeRoom.temperature)
    const [moisCheckbox, _setMoisCheckbox] = useState(!!activeRoom.moisture)
    const [showAside, setShowAside] = useState(false)
    const now = new Date()

    const chartData = [
        {
            data: new Array(24).fill(0).map((_, i) => ({
                x: set(now, {
                    hours: i,
                    minutes: 0,
                    seconds: 0,
                    milliseconds: 0,
                }),
                y: i ^ 2,
            })),
            label: "Температура",
            borderColor: "#FF6384",
        },
        {
            data: new Array(24).fill(0).map((_, i) => ({
                x: set(now, {
                    hours: i,
                    minutes: 0,
                    seconds: 0,
                    milliseconds: 0,
                }),
                y: 30 + (i / 3) ** 2,
            })),
            label: "Влажность",
            borderColor: "#36A2EB",
        },
    ]

    const chartDate = (() => {
        const now = new Date()
        return {
            from: subHours(now, +historyInterval),
            to: now,
        }
    })()

    const handleToggleChange = (value: string[]) => {
        setHistoryInterval(value)
    }

    return (
        <div className="h-[800px] w-[1200px]">
            <div className="flex">
                <button onClick={showOnline} className="ml-auto">
                    <Undo2 />
                </button>
            </div>
            <div className="flex gap-4">
                <Accordion
                    value={accordionValue}
                    onValueChange={setAccordionValue}
                    className="w-[200px]"
                >
                    {rooms.map((room) => (
                        <AccordionItem key={room} value={room}>
                            <AccordionTrigger>{room}</AccordionTrigger>
                            <AccordionContent>
                                <div className="flex gap-2">
                                    <Checkbox
                                        id="temp"
                                        name="temp"
                                        checked={tempCheckbox}
                                    />
                                    <Label htmlFor="temp">Температура</Label>
                                </div>
                                <div className="mt-4 flex gap-2">
                                    <Checkbox
                                        id="mois"
                                        name="mois"
                                        checked={moisCheckbox}
                                    />
                                    <Label htmlFor="mois">Влажность</Label>
                                </div>
                            </AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
                <div>
                    <HistoryChart
                        chartData={chartData.filter((_, i) => {
                            if (i === 0 && tempCheckbox) return true
                            if (i === 1 && moisCheckbox) return true
                            return false
                        })}
                        date={chartDate}
                        beginAtZero={false}
                        // className="w-[600px]"
                    />
                    <Button
                        onClick={() => {
                            setShowAside(!showAside)
                        }}
                        className="mt-4"
                    >
                        Показать
                    </Button>
                    <div
                        className={cn("opacity-0 transition-opacity", {
                            "opacity-100": showAside,
                        })}
                    >
                        <ToggleGroup
                            value={historyInterval}
                            onValueChange={handleToggleChange}
                            className="mt-4 border-1"
                        >
                            <ToggleGroupItem value="1">1 час</ToggleGroupItem>
                            <ToggleGroupItem value="6">6 часов</ToggleGroupItem>
                            <ToggleGroupItem value="12">
                                12 часов
                            </ToggleGroupItem>
                            <ToggleGroupItem value="24">
                                24 часа
                            </ToggleGroupItem>
                        </ToggleGroup>
                        <Button className="mt-2">Выгрузить в Excel</Button>
                        <Button className="ml-2">Печать</Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default History
