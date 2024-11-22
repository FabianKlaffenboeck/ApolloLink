import {CanMessage} from "@fklab/candongle-interface";
import {useEffect, useState} from "react";
import {ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger} from "@/components/ui/context-menu.tsx";
import {SignalSelector} from "@/Tabs/Dashboard/VisualisationTiles/SignalSelector.tsx";
import {DbcFile} from "@/Tabs/Interfaces_Channels/Interfaces_Channels.tsx";

export function VALUE({id, removeHook, dbcs}: {
    id: string
    removeHook: (id: string) => void;
    dbcs: DbcFile[]
}) {
    const [interval,] = useState<number | null>(5);
    const [valueBuffer, setValueBuffer] = useState<number[]>([]);
    const [bufferCnt, setBufferCnt] = useState<number>(0);
    const [value, setValue] = useState<number | null>(null);
    const [openSelector, setOpenSelector] = useState<boolean>(false);

    window.electron.setCanMsgCallback((msg: CanMessage) => {
        const dataPeace = msg.id

        if (interval == null) {
            setValue(dataPeace);
            return
        }

        const newArray = [...valueBuffer];
        newArray[bufferCnt - 1] = dataPeace;
        setValueBuffer(newArray);
    })

    useEffect(() => {
        setBufferCnt(bufferCnt + 1)
        if (bufferCnt >= interval) {
            let tmp = 0
            console.log(valueBuffer);
            valueBuffer.forEach(value => {
                tmp += value
            })
            setValue(tmp / interval)
            setBufferCnt(0)
        }

    }, [valueBuffer]);

    function selectorClose() {

    }


    function dataOrLable(): string {
        if (value == null) {
            return "NO DATA";
        }
        return value.toString()
    }

    return (
        <div className="bg-background text-foreground w-full h-full flex items-center justify-center">
            <SignalSelector
                openSelector={openSelector}
                setOpenSelector={setOpenSelector}
                closeHook={selectorClose}
                dbcs={dbcs}
            ></SignalSelector>
            <ContextMenu>
                <ContextMenuTrigger
                    className="flex w-full h-full items-center justify-center rounded-md border border-dashed text-sm">
                    <h1>{dataOrLable()}</h1>
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
