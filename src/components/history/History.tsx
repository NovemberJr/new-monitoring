import { useEffect } from "react"
import { HistoryChart } from "./HistortChart"
import { ArrowLeft } from "lucide-react"

import { store, showOnline } from "@/store/store"
import { useSnapshot } from "valtio"

export function History() {
    const chartData = [
        {
            data: [
                { x: new Date("2026-03-19 05:00:00").getTime(), y: 10 },
                { x: new Date("2026-03-19 08:00:00").getTime(), y: 15 },
                { x: new Date("2026-03-19 11:00:00").getTime(), y: 5 },
                { x: new Date("2026-03-19 14:00:00").getTime(), y: 10 },
            ],
            label: "Температура",
        },
    ]

    const chartDate = {
        from: "2026-03-19 00:00:00",
        to: "2026-03-19 23:59:59",
    }

    return (
        <div className="h-[800px] w-[1200px]">
            <button onClick={showOnline}>
                <ArrowLeft />
            </button>
            История
            <HistoryChart
                chartData={chartData}
                date={chartDate}
                beginAtZero={false}
            />
        </div>
    )
}

export default History
