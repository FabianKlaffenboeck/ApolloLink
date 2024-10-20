import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip"
import {Button} from "@/components/ui/button.tsx";
import {CiViewTable} from "react-icons/ci";
import {LifeBuoy} from "lucide-react";
import {GoGraph} from "react-icons/go";
import {VscEmptyWindow, VscSymbolVariable} from "react-icons/vsc";
import {GiDigitalTrace} from "react-icons/gi";

export type Visualisation = "TRACE" | "TABLE" | "GRAPH" | "VALUE"

export function SideBar({onAddVisualisationItem}: { onAddVisualisationItem: (message: Visualisation) => void; }) {

    return (
        <TooltipProvider>
            <nav className="grid gap-1 p-2">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-lg bg-muted"
                            aria-label="Playground"
                            onClick={() => onAddVisualisationItem("TRACE")}
                        >
                            <GiDigitalTrace className="size-5"/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                        Can Trace
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-lg bg-muted"
                            aria-label="Playground"
                            onClick={() => onAddVisualisationItem("TABLE")}
                        >
                            <CiViewTable className="size-5"/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                        Table
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-lg bg-muted"
                            aria-label="Playground"
                            onClick={() => onAddVisualisationItem("GRAPH")}
                        >
                            <GoGraph className="size-5"/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                        Graph
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="rounded-lg bg-muted"
                            aria-label="Playground"
                            onClick={() => onAddVisualisationItem("VALUE")}
                        >
                            <VscSymbolVariable className="size-5"/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                        Value
                    </TooltipContent>
                </Tooltip>

            </nav>
            <nav className="mt-auto grid gap-1 p-2">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-lg bg-muted">
                            <LifeBuoy className="size-5"/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                        Help
                    </TooltipContent>
                </Tooltip>


                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button variant="ghost" size="icon" className="rounded-lg bg-muted">
                            <VscEmptyWindow className="size-5"/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                        Add Window
                    </TooltipContent>
                </Tooltip>
            </nav>
        </TooltipProvider>
    )
}
