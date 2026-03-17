import { useState } from "react"
import {
    Dialog,
    // DialogClose,
    DialogContent,
    DialogDescription,
    // DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Item, ItemContent, ItemTitle } from "@/components/ui/item"
import { Checkbox } from "@/components/ui/checkbox"
import { Field } from "@/components/ui/field"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { CirclePlus } from "lucide-react"

import { addCard, store } from "@/store/store"
import { useSnapshot } from "valtio"

interface Props {
    panelId: number
}

export function OnlinePanelDialog({ panelId }: Props) {
    const [open, setOpen] = useState(false)
    const [step, setStep] = useState<1 | 2>(1)
    const [sumbitDisabled, setSubmitDisabled] = useState(true)
    const [room, setRoom] = useState<string | null>(null)
    const { rooms } = useSnapshot(store)

    const handleItemClick = (room: string) => {
        setRoom(room)
        setStep(2)
    }

    const handleFormChange = (e: any) => {
        const formData = new FormData(e.currentTarget)
        if (Array.from(formData).length > 0) {
            setSubmitDisabled(false)
        } else {
            setSubmitDisabled(true)
        }
    }

    const handleOpenChange = (open: boolean) => {
        setOpen(open)
        if (!open) {
            setTimeout(() => {
                setStep(1)
            }, 150)
        }
    }
    const handleSubmit = (e: any) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const t = formData.get("temp")
        const m = formData.get("mois")

        addCard(
            panelId,
            room!,
            t ? { value: 15 } : undefined,
            m ? { value: 75 } : undefined
        )
        setOpen(false)
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger>
                <div className="flex h-full cursor-pointer items-center justify-center border-1">
                    <CirclePlus width={40} height={40} />
                </div>
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Настройки</DialogTitle>
                    <DialogDescription>Выберите помещение</DialogDescription>
                </DialogHeader>
                {step == 1 &&
                    rooms.map((room) => (
                        <Item
                            key={room}
                            variant="outline"
                            onClick={() => handleItemClick(room)}
                        >
                            <ItemContent>
                                <ItemTitle>{room}</ItemTitle>
                                {/* <ItemDescription>Description</ItemDescription> */}
                            </ItemContent>
                        </Item>
                    ))}
                {step == 2 && (
                    <form
                        onSubmit={handleSubmit}
                        className="flex flex-col gap-4"
                        onChange={handleFormChange}
                    >
                        <Field orientation="horizontal">
                            <Checkbox id="temp" name="temp" />
                            <Label htmlFor="temp">Температура</Label>
                        </Field>
                        <Field orientation="horizontal">
                            <Checkbox id="mois" name="mois" />
                            <Label htmlFor="mois">Влажность</Label>
                        </Field>
                        <Button type="submit" disabled={sumbitDisabled}>
                            ОК
                        </Button>
                    </form>
                )}
                {/* <DialogFooter></DialogFooter> */}
            </DialogContent>
        </Dialog>
    )
}
