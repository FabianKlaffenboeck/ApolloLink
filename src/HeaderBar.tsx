import {ModeToggle} from "@/components/mode-toggle.tsx";

export function HeaderBar() {

    return (
        <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
            <h1 className="text-xl font-semibold">ApolloLink</h1>
            <div className="ml-auto gap-1.5 text-sm">
                <ModeToggle/>
            </div>
        </header>
    )
}
