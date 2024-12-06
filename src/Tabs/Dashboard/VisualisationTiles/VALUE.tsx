import {CanMessage} from "@fklab/candongle-interface";
import React, {useEffect, useState} from "react";
import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuSeparator,
    ContextMenuTrigger
} from "@/components/ui/context-menu.tsx";
import {SignalSelector} from "@/Tabs/Dashboard/VisualisationTiles/SignalSelector.tsx";
import {CanNode} from "@/Tabs/Interfaces_Channels/Interfaces_Channels.tsx";
import {Input} from "@/components/ui/input.tsx";

export function VALUE({id, removeHook, nodes}: {
    id: string
    removeHook: (id: string) => void;
    nodes: CanNode[]
}) {
    const [interval, setInterval] = useState<number>(1);
    const [valueBuffer, setValueBuffer] = useState<number[]>([]);
    const [bufferWriteIndex, setbufferWriteIndex] = useState<number>(0);
    const [value, setValue] = useState<number | null>(null);
    const [openSelector, setOpenSelector] = useState<boolean>(false);

    window.electron.setCanMsgCallback((msg: CanMessage) => {
        const dataPeace = msg.id
        const newArray = [...valueBuffer];
        newArray[bufferWriteIndex] = dataPeace;
        setValueBuffer(newArray);
    })


    useEffect(() => {
        setbufferWriteIndex(prevCnt => {
            const newCnt = prevCnt + 1;
            if (newCnt >= interval) {
                const total = valueBuffer.reduce((acc, value) => acc + value, 0);
                setValue(total / interval);
                return 0;
            }
            return newCnt;
        });
    }, [valueBuffer, interval]);

    function selectorClose() {

    }

    function dataOrLable(): string {
        if (value == null) {
            return "NO DATA";
        }
        return value.toString()
    }

    return (
        <div className="bg-background text-foreground w-full h-full flex flex-col items-start">
            <Input className="w-full" placeholder="Name"/>
            <SignalSelector
                openSelector={openSelector}
                setOpenSelector={setOpenSelector}
                closeHook={selectorClose}
                nodes={nodes}
            ></SignalSelector>
            <ContextMenu>
                <ContextMenuTrigger
                    className="flex w-full h-full items-center justify-center">
                    <h1>{dataOrLable()}</h1>
                </ContextMenuTrigger>
                <ContextMenuContent className="w-64">
                    <ContextMenuItem onClick={() => setOpenSelector(true)} inset>
                        Select Signal
                    </ContextMenuItem>
                    <ContextMenuItem onClick={() => removeHook(id)} inset>
                        Remove
                    </ContextMenuItem>
                    <ContextMenuSeparator/>
                    <ContextMenuCheckboxItem checked={interval == 1} onClick={() => setInterval(1)}>
                        Set Interval: 1
                    </ContextMenuCheckboxItem>
                    <ContextMenuCheckboxItem checked={interval == 2} onClick={() => setInterval(2)}>
                        Set Interval: 2
                    </ContextMenuCheckboxItem>
                    <ContextMenuCheckboxItem checked={interval == 5} onClick={() => setInterval(5)}>
                        Set Interval: 5
                    </ContextMenuCheckboxItem>
                    <ContextMenuCheckboxItem checked={interval == 10} onClick={() => setInterval(10)}>
                        Set Interval: 10
                    </ContextMenuCheckboxItem>

                </ContextMenuContent>
            </ContextMenu>
        </div>
    )
}
