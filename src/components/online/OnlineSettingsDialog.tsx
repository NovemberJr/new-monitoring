import { useState } from "react"
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    // DialogDescription,
    // DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Settings } from "lucide-react"
import { Button } from "../ui/button"
import { Field } from "../ui/field"
import { Label } from "../ui/label"
import { Input } from "../ui/input"

interface Props {
    name: string
    panel: any
    deletePanel: () => void
}

const items = [
    { label: "Выберите экран", value: null },
    { label: "TV1", value: "1" },
    { label: "TV2", value: "2" },
    { label: "TV3", value: "3" },
]

export function OnlineSettingsDialog({ name, panel, deletePanel }: Props) {
    const [nameInput, setNameInput] = useState(name)

    const onOpenChange = (open: boolean) => {
        if (open) return

        panel.name = nameInput
    }

    return (
        <Dialog onOpenChange={onOpenChange}>
            <DialogTrigger>
                <Settings className="h-6 w-5 cursor-pointer transition-all hover:text-white" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Настройки панели</DialogTitle>
                </DialogHeader>
                <Field>
                    <Label htmlFor="name">Название</Label>
                    <Input
                        id="name"
                        name="name"
                        value={nameInput}
                        onChange={(e) => setNameInput(e.target.value)}
                    />
                </Field>
                <Select items={items}>
                    <SelectTrigger className="w-full max-w-48">
                        <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Экран</SelectLabel>
                            {items.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                    </SelectContent>
                </Select>
                <DialogFooter>
                    <DialogClose className="cursor-pointer">
                        Применить
                    </DialogClose>
                    <Button
                        variant="destructive"
                        className="cursor-pointer"
                        onClick={deletePanel}
                    >
                        Удалить панель
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
