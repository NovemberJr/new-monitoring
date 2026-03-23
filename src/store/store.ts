import { proxy } from "valtio"

type Store = {
    global: {
        editMode: boolean
        logged: boolean
    }
    rooms: string[]
    activeRoom: any
    activePanel: string | undefined
    panels: Panel[]
    panelsCount: number
    activeAppTab: "online" | "history"
    historyInterval: string[]
}

export type Measure = {
    value: number
    min?: number
    max?: number
}

export type Card = {
    id: string
    name: string
    temperature?: Measure
    moisture?: Measure
}

export type Panel = {
    id: number
    name: string
    cards: Card[]
    cardCounter: number
}

export const addPanel = () => {
    const id = ++store.panelsCount

    store.panels.push({
        id,
        name: `Панель ${id}`,
        cards: [],
        cardCounter: 0,
    })

    selectPanel(id)
}

export const deletePanel = (id: number) => {
    if (store.panels.length == 1) return

    const idx = store.panels.findIndex((el) => el.id === id)
    store.panels.splice(idx, 1)
    if (idx === store.panels.length) {
        store.activePanel = `${store.panels[idx - 1].id}`
    } else {
        store.activePanel = `${store.panels[idx].id}`
    }
}

export const selectPanel = (idx: number) => {
    store.activePanel = `${idx}`
}

export const addCard = (
    panelId: number,
    name: string,
    temperature?: Measure,
    moisture?: Measure
) => {
    const panel = store.panels.find((panel) => panel.id === panelId)

    if (!panel) return

    panel.cards.push({
        id: `${panelId}/${++panel.cardCounter}`,
        name,
        temperature,
        moisture,
    })
}

export const deleteCard = (card: Card) => {
    const [panelId] = card.id.split("/")
    const panel = store.panels.find((p) => p.id == +panelId)
    if (!panel) return
    const idx = panel.cards.findIndex((c) => c.id == card.id)
    if (idx > -1) panel?.cards.splice(idx, 1)
}

export const showHistory = (dto: any) => {
    store.activeAppTab = "history"
    store.activeRoom = dto
}

export const setHistoryInterval = (value: string[]) => {
    store.historyInterval = value
}

export const showOnline = () => {
    store.activeAppTab = "online"
}

export const store = proxy<Store>({
    global: {
        editMode: false,
        logged: false,
    },
    rooms: ["Склад", "Цех", "Холодильник"],
    activeRoom: undefined,
    activePanel: undefined,
    panelsCount: 0,
    panels: [],
    activeAppTab: "online",
    historyInterval: ["24"],
})

addPanel()
addCard(1, "Склад", { value: 20 })
addCard(1, "Цех", undefined, { value: 75 })
addCard(1, "Холодильник", { value: -15 }, { value: 90 })
