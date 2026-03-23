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

interface Props {
    deletePanel: () => void
}

const items = [
    { label: "Выберите экран", value: null },
    { label: "TV1", value: "1" },
    { label: "TV2", value: "2" },
    { label: "TV3", value: "3" },
]

export function OnlineSettingsDialog({ deletePanel }: Props) {
    return (
        <Dialog>
            <DialogTrigger>
                <Settings className="h-6 w-5 cursor-pointer transition-all hover:text-white" />
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
                <DialogFooter>
                    <DialogClose>
                        <Button type="submit" className="cursor-pointer">
                            Применить
                        </Button>
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
