import {ModeToggle} from "@/components/mode-toggle.tsx";
import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs.tsx";

export function HeaderBar() {

    return (
        <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
            <h1 className="text-xl font-semibold">ApolloLink</h1>

            <div className="ml-auto gap-1.5 text-sm">
                <Tabs defaultValue="dasboard" className="w-[400px]">
                    <TabsList>
                        <TabsTrigger value="dasboard">Dashboard</TabsTrigger>
                        <TabsTrigger value="interfaces">Interfaces/Channels</TabsTrigger>
                        <TabsTrigger value="bus">Nodes</TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>

            <div className="ml-auto gap-1.5 text-sm">
                <ModeToggle/>
            </div>
        </header>
    )
}
