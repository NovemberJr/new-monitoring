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
        <div className="min-h-[800px] w-[1200px]">
            <div className="flex">
                <button onClick={showOnline} className="ml-auto">
                    <Undo2 />
                </button>
            </div>
            <div className="flex gap-4">
                <Accordion
                    value={accordionValue}
                    onValueChange={setAccordionValue}
                    className="box-content w-[200px] rounded-lg bg-zinc-800 p-3"
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
                <div className="flex max-h-[500px] flex-col gap-3">
                    {tempCheckbox && (
                        <HistoryChart
                            chartData={chartData.filter((_, i) => {
                                if (i === 0) return true
                                return false
                            })}
                            date={chartDate}
                            beginAtZero={false}
                            className="rounded-lg bg-zinc-800 p-3"
                        />
                    )}
                    {moisCheckbox && (
                        <HistoryChart
                            chartData={chartData.filter((_, i) => {
                                if (i === 1) return true
                                return false
                            })}
                            date={chartDate}
                            beginAtZero={false}
                            className="rounded-lg bg-zinc-800 p-3"
                        />
                    )}
                    <div
                        className={cn("rounded-lg bg-zinc-800", {
                            // "bg-zinc-900": !showAside,
                        })}
                    >
                        <Button
                            onClick={() => {
                                setShowAside(!showAside)
                            }}
                            className="w-full cursor-pointer"
                        >
                            Показать
                        </Button>
                        <div
                            className={cn("hidden p-3 transition-opacity", {
                                // "opacity-100": showAside,
                                block: showAside,
                            })}
                        >
                            <ToggleGroup
                                value={historyInterval}
                                onValueChange={handleToggleChange}
                                className="border-1"
                            >
                                <ToggleGroupItem
                                    value="1"
                                    className="cursor-pointer"
                                >
                                    1 час
                                </ToggleGroupItem>
                                <ToggleGroupItem
                                    value="6"
                                    className="cursor-pointer"
                                >
                                    6 часов
                                </ToggleGroupItem>
                                <ToggleGroupItem
                                    value="12"
                                    className="cursor-pointer"
                                >
                                    12 часов
                                </ToggleGroupItem>
                                <ToggleGroupItem
                                    value="24"
                                    className="cursor-pointer"
                                >
                                    24 часа
                                </ToggleGroupItem>
                            </ToggleGroup>
                            <Button className="mt-2 cursor-pointer">
                                Выгрузить в Excel
                            </Button>
                            <Button className="ml-2 cursor-pointer">
                                Печать
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default History
