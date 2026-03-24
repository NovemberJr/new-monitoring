import { useState } from "react"
import {
    Dialog,
    // DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Field, FieldGroup } from "@/components/ui/field"
import { Settings, Trash2 } from "lucide-react"
import { type Card, type Measure, deleteCard } from "@/store/store"

interface Props {
    name: string
    temperature?: Measure
    moisture?: Measure
    card: Card
}

export function OnlineCardDialog({ name, temperature, moisture, card }: Props) {
    // const [nameInput, setNameInput] = useState(name)
    const [tMin, setTMin] = useState(temperature?.min)
    const [tMax, setTMax] = useState(temperature?.max)
    const [mMin, setMMin] = useState(moisture?.min)
    const [mMax, setMMax] = useState(moisture?.max)

    const onOpenChange = (open: boolean) => {
        if (open) return

        // card.name = nameInput
        if (card.temperature) {
            card.temperature = { ...card.temperature, min: tMin, max: tMax }
        }
        if (card.moisture) {
            card.moisture = { ...card.moisture, min: mMin, max: mMax }
        }
    }

    return (
        <Dialog onOpenChange={onOpenChange}>
            <DialogTrigger>
                <Settings className="h-6 cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Настройки</DialogTitle>
                    <DialogDescription>Задайте уставку</DialogDescription>
                </DialogHeader>
                <FieldGroup>
                    {/* <Field>
                        <Label htmlFor="name">Название</Label>
                        <Input
                            id="name"
                            name="name"
                            value={nameInput}
                            onChange={(e) => setNameInput(e.target.value)}
                        />
                    </Field> */}
                    {temperature && (
                        <>
                            <h3 className="font-bold">Температура</h3>
                            <Field>
                                <Label htmlFor="t_min">Минимум</Label>
                                <Input
                                    id="t_min"
                                    name="t_min"
                                    type="number"
                                    value={tMin}
                                    onChange={(e) =>
                                        setTMin(Number(e.target.value))
                                    }
                                />
                            </Field>
                            <Field>
                                <Label htmlFor="t_max">Максимум</Label>
                                <Input
                                    id="t_max"
                                    name="t_max"
                                    type="number"
                                    value={tMax}
                                    onChange={(e) =>
                                        setTMax(Number(e.target.value))
                                    }
                                />
                            </Field>
                        </>
                    )}
                    {moisture && (
                        <>
                            <h3 className="font-bold">Влажность</h3>
                            <Field>
                                <Label htmlFor="m_min">Минимум</Label>
                                <Input
                                    id="m_min"
                                    name="m_min"
                                    type="number"
                                    value={mMin}
                                    onChange={(e) =>
                                        setMMin(Number(e.target.value))
                                    }
                                />
                            </Field>
                            <Field>
                                <Label htmlFor="m_max">Максимум</Label>
                                <Input
                                    id="m_max"
                                    name="m_max"
                                    type="number"
                                    value={mMax}
                                    onChange={(e) =>
                                        setMMax(Number(e.target.value))
                                    }
                                />
                            </Field>
                        </>
                    )}
                </FieldGroup>
                <DialogFooter>
                    <button>
                        <Trash2
                            onClick={() => {
                                deleteCard(card)
                            }}
                        />
                    </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
