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
import { Input } from "@/components/ui/input"
import { Lock, Save } from "lucide-react"

import { store } from "@/store/store"

interface Props {
    editMode: boolean
    logged: boolean
}

export function OnlineLogin({ editMode, logged }: Props) {
    const [open, setOpen] = useState(false)

    const onUnlockClick = async () => {
        if (!logged) {
            setOpen(true)
        } else {
            store.global.editMode = !editMode
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        if (e.target.password.value == "123") {
            setOpen(false)
            store.global.logged = true
            store.global.editMode = true
        }
    }

    const handleOpenChange = (open: boolean) => {
        if (!open) {
            setOpen(false)
        }
    }

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger onClick={onUnlockClick} className="ml-2">
                {editMode ? <Save /> : <Lock />}
            </DialogTrigger>
            <DialogContent className="sm:max-w-sm">
                <DialogHeader>
                    <DialogTitle>Введите пароль администратора</DialogTitle>
                    <DialogDescription></DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSubmit}>
                    <Input name="password" />
                </form>
                {/* <DialogFooter></DialogFooter> */}
            </DialogContent>
        </Dialog>
    )
}
