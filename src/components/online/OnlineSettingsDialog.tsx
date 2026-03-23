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
import { Settings } from "lucide-react"

interface Props {}

export function OnlineSettingsDialog({}: Props) {
    return (
        <Dialog>
            <DialogTrigger>
                <Settings className="h-6 cursor-pointer" />
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm"></DialogContent>
        </Dialog>
    )
}
