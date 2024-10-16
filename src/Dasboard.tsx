import {LifeBuoy, SquareTerminal,} from "lucide-react"
import {Button} from "@/components/ui/button"
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip"
import {ModeToggle} from "@/components/mode-toggle.tsx";
import LogoFKLab_Light from '../public/LogoFKLab_Light.svg'
import LogoFKLab_Dark from '../public/LogoFKLab_Dark.svg'
import {Theme, useTheme} from "@/components/theme-provider.tsx";
import './Dasboard.css'

export function Dashboard() {

    const choseLogoIcon = (themeProviderState: Theme) => {
        if (themeProviderState == "light") {
            return <img style={{width: 30.5}} src={LogoFKLab_Dark} alt={""}/>
        }else {
            return <img style={{width: 30.5}} src={LogoFKLab_Light} alt={""}/>
        }
    }


    return (
        <TooltipProvider>
            <div className="grid h-screen w-full pl-[53px]">
                <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
                    <div className="border-b p-2">
                        {choseLogoIcon(useTheme().theme)}
                    </div>
                    <nav className="grid gap-1 p-2">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="rounded-lg bg-muted"
                                    aria-label="Playground"
                                >
                                    <SquareTerminal className="size-5"/>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                Playground
                            </TooltipContent>
                        </Tooltip>
                    </nav>
                    <nav className="mt-auto grid gap-1 p-2">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    className="mt-auto rounded-lg"
                                    aria-label="Help"
                                >
                                    <LifeBuoy className="size-5"/>
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent side="right" sideOffset={5}>
                                Help
                            </TooltipContent>
                        </Tooltip>
                    </nav>
                </aside>

                <div className="flex flex-col">
                    <header className="sticky top-0 z-10 flex h-[53px] items-center gap-1 border-b bg-background px-4">
                        <h1 className="text-xl font-semibold">ApolloLink</h1>
                        <div className="ml-auto gap-1.5 text-sm">
                            <ModeToggle></ModeToggle>
                        </div>
                    </header>

                    <main className="grid flex-1 gap-4 overflow-auto p-4 grid-cols-3 ">
                        <div
                            className="relative flex h-full min-h-[50vh] flex-col rounded-xl bg-muted/50 p-4 col-span-3">
                        </div>
                    </main>
                </div>
            </div>
        </TooltipProvider>
    )
}
