import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger,} from "@/components/ui/tooltip"
import {Button} from "@/components/ui/button.tsx";
import {CiViewTable} from "react-icons/ci";
import {LifeBuoy} from "lucide-react";
import {GoGraph} from "react-icons/go";
import {VscDebugStart, VscDebugStop, VscEmptyWindow, VscSymbolVariable} from "react-icons/vsc";
import {GiDigitalTrace} from "react-icons/gi";
import {TabValue} from "@/HeaderBar.tsx";
import * as React from "react";

export type Visualisation = "TRACE" | "TABLE" | "GRAPH" | "VALUE"
export type CanState = "ONLINE" | "OFFLINE"

export function SideBar({tap, onAddVisualisationItem}: {
    tap: TabValue,
    onAddVisualisationItem: (message: Visualisation) => void;
}) {
    const [busState, setBusState] = React.useState<CanState>("OFFLINE")

    function goOnline(){
        setBusState("ONLINE")
    }
    function goOffline(){
        setBusState("OFFLINE")
    }

    return (
        <TooltipProvider>
            <nav className="grid gap-1 p-2">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            disabled={tap == "INTERFACES"}
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
                            disabled={tap == "INTERFACES"}
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
                            disabled={tap == "INTERFACES"}
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
                            disabled={tap == "INTERFACES"}
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

            <nav className="grid gap-1 p-2">
                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            disabled={busState == "ONLINE"}
                            onClick={goOnline}
                            className="rounded-lg bg-muted">
                            <VscDebugStart className="size-5"/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                        Go On Can
                    </TooltipContent>
                </Tooltip>

                <Tooltip>
                    <TooltipTrigger asChild>
                        <Button
                            variant="ghost"
                            size="icon"
                            disabled={busState == "OFFLINE"}
                            onClick={goOffline}
                            className="rounded-lg bg-muted">
                            <VscDebugStop className="size-5"/>
                        </Button>
                    </TooltipTrigger>
                    <TooltipContent side="right" sideOffset={5}>
                        Go Offline
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
