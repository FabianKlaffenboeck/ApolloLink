import {CanMessage} from "@fklab/candongle-interface";
import {useState} from "react";
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from "@/components/ui/context-menu.tsx";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle,} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";

export function VALUE({id, removeHook}: {
    id: string
    removeHook: (id:string) => void;
}) {
    const [value, setValue] = useState<number | null>(null);
    const [openSelector, setOpenSelector] = useState<boolean>(false);

    window.electron.setCanMsgCallback((msg: CanMessage) => {
        const dataPeace = msg.id
        if (dataPeace != value) {
            setValue((dataPeace))
        }
    })

    function renderSelector() {

        return (
            <Dialog open={openSelector}>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Signal Selector</DialogTitle>
                        {/*<DialogDescription>*/}
                        {/*    Make changes to your profile here. Click save when you're done.*/}
                        {/*</DialogDescription>*/}
                    </DialogHeader>
                    {/*<div className="grid gap-4 py-4">*/}
                    {/*    <div className="grid grid-cols-4 items-center gap-4">*/}
                    {/*        <Label htmlFor="name" className="text-right">*/}
                    {/*            Name*/}
                    {/*        </Label>*/}
                    {/*        <Input id="name" value="Pedro Duarte" className="col-span-3" />*/}
                    {/*    </div>*/}
                    {/*    <div className="grid grid-cols-4 items-center gap-4">*/}
                    {/*        <Label htmlFor="username" className="text-right">*/}
                    {/*            Username*/}
                    {/*        </Label>*/}
                    {/*        <Input id="username" value="@peduarte" className="col-span-3" />*/}
                    {/*    </div>*/}
                    {/*</div>*/}
                    <DialogFooter>
                        <Button
                            type="submit"
                            onClick={() => setOpenSelector(false)}
                        >Save</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        )
    }

    return (
        <div className="bg-background text-foreground w-full h-full flex items-center justify-center">

            {renderSelector()}

            <ContextMenu>
                <ContextMenuTrigger
                    className="flex w-full h-full items-center justify-center rounded-md border border-dashed text-sm">
                    <h1>{value || "NO DATA"}</h1>
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
