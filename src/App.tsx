import { Tabs, TabsContent } from "@/components/ui/tabs"
import { Online } from "@/components/online/Online"
import { History } from "@/components/history/History"

import { store } from "@/store/store"
import { useSnapshot } from "valtio"

export function App() {
    const { activeAppTab } = useSnapshot(store)

    return (
        <Tabs
            className="flex min-h-svh items-center justify-center p-6"
            value={activeAppTab}
        >
            <TabsContent value="online">
                <Online />
            </TabsContent>
            <TabsContent value="history">
                <History />
            </TabsContent>
        </Tabs>
    )
}

export default App
