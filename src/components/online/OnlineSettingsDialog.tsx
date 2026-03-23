import {
    Dialog,
    DialogClose,
    DialogContent,
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

interface Props {}

const items = [
    { label: "Выберите экран", value: null },
    { label: "TV1", value: "1" },
    { label: "TV2", value: "2" },
    { label: "TV3", value: "3" },
]

export function OnlineSettingsDialog({}: Props) {
    return (
        <Dialog>
            <DialogTrigger>
                <Settings className="h-6 cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Выберите экран</DialogTitle>
                </DialogHeader>
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
                <DialogClose>
                    <Button type="submit">Применить</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}
