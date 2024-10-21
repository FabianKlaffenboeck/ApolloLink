import {ModeToggle} from "@/components/mode-toggle.tsx";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";


export type TabValue = "DASBOARD" | "INTERFACES" | "NODES"


export function HeaderBar({onTabChange}: { onTabChange: (tab: TabValue) => void; }) {


    return (
        <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
            <h1 className="text-xl font-semibold">ApolloLink</h1>

            <div className="ml-auto gap-1.5 text-sm">
                <Tabs defaultValue="DASBOARD" className="w-[400px]"
                      onValueChange={value => onTabChange(value as "DASBOARD" | "INTERFACES" | "NODES")}>
                    <TabsList>
                        <TabsTrigger value="DASBOARD">Dashboard</TabsTrigger>
                        <TabsTrigger value="INTERFACES">Interfaces/Channels</TabsTrigger>
                        <TabsTrigger value="NODES">Nodes</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <div className="ml-auto gap-1.5 text-sm">
                <ModeToggle/>
            </div>
        </header>
    )
}
