import {
    Chart as ChartJS,
    CategoryScale,
    Colors,
    Decimation,
    LinearScale,
    Tooltip,
    TimeScale,
    type ChartOptions,
    type ChartData as ChartDataType,
    Legend,
    LineElement,
    PointElement,
} from "chart.js"
import { Line } from "react-chartjs-2"
import "chartjs-adapter-date-fns"
// import { ru } from "date-fns/locale";
// import zoomPlugin from "chartjs-plugin-zoom";

interface Props {
    beginAtZero: boolean
    chartData: { label: string; data: any }[]
    date: any
    className?: string
}

ChartJS.register(
    CategoryScale,
    Colors,
    Decimation,
    LinearScale,
    TimeScale,
    Tooltip,

    Legend,
    LineElement,
    PointElement
    // zoomPlugin
)

const chartjsColors = ["#FF6384", "#36A2EB", "#FF9F40"]

export const HistoryChart = ({
    chartData,
    date,
    beginAtZero,
    className,
}: Props) => {
    const data: ChartDataType<"line"> = {
        datasets: chartData.map((ds, i) => ({
            borderColor: chartjsColors[i],
            parsing: false,
            // borderColor: "rgba(75, 192, 192, 1)",
            // fill: true,
            ...ds,
        })),
    }

    const options: ChartOptions<"line"> = {
        animation: false,
        parsing: false,
        elements: {
            point: {
                // radius: 0,
            },
        },
        indexAxis: "x",
        responsive: true,
        plugins: {
            colors: { enabled: true, forceOverride: false },
            decimation: {
                enabled: true,
                algorithm: "lttb",
                threshold: 100,
                samples: 200,
            },
            /*zoom: {
                limits: {
                    x: { min: date.from, max: date.to },
                    // x: { min: "original", max: "original" }
                },
                pan: {
                    enabled: true,
                    mode: "x",
                },
                zoom: {
                    wheel: {
                        enabled: true,
                    },
                    mode: "x",
                },
            },*/
        },
        scales: {
            x: {
                type: "time",
                time: {
                    displayFormats: {
                        hour: "HH:mm",
                    },
                    tooltipFormat: "dd MMMM  HH:mm",
                    unit: "hour",
                },
                min: date.from,
                max: date.to,
                adapters: {
                    // date: { locale: ru },
                },
            },
            y: {
                beginAtZero,
                // suggestedMin: 220,
                // suggestedMax: 250
            },
        },
    }

    return (
        <Line
            data={data}
            options={options}
            width={850}
            height={350}
            className={className}
        />
    )
}
