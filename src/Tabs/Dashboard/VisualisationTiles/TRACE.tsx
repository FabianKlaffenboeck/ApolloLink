import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from "@/components/ui/context-menu.tsx";

export function TRACE({id, removeHook}: {
    id: string
    removeHook: (id: string) => void;
}) {
    const [cnt, setCnt] = useState<number>(0)
    const [, setOpenSelector] = useState<boolean>(false);

    return (
        <div className="bg-background text-foreground w-full h-full flex items-center justify-center">
            <ContextMenu>
                <ContextMenuTrigger
                    className="flex w-full h-full items-center justify-center rounded-md border border-dashed text-sm">

                    <Button onClick={() => setCnt(cnt + 1)}>Test {cnt}</Button>

                </ContextMenuTrigger>
                <ContextMenuContent className="w-64">
                    <ContextMenuItem onClick={() => setOpenSelector(true)} inset>
                        Select Signal
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => removeHook(id)} inset>
                        Remove
                    </ContextMenuItem>
                </ContextMenuContent>
            </ContextMenu>
        </div>
    )
}
