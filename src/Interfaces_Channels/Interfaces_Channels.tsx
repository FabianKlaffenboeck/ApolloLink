import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup,} from "@/components/ui/resizable.tsx"
import {ChannelList} from "@/Interfaces_Channels/ChannelList/ChannelList.tsx";
import {DbcList} from "@/Interfaces_Channels/DbcList/DbcList.tsx";
import {useEffect, useState} from "react";
import {Nodes} from "@/Interfaces_Channels/Nodes/Nodes.tsx";

export type DbcFile = {
    id: number
    label: string
    fileContent: string
    status: "available" | "used"
}

export type CanNode = {
    id: number
    label: string
    network: number | null
    dbc: number | null
}

export type CanInterface = {
    id: number
    label: string
    network: number | null
    status: "available" | "used"
}

export type CanNetwork = {
    id: number
    label: string
}

const canNetworks: CanNetwork[] = [
    {id: 0, label: "Network 00"},
    {id: 1, label: "Network 01"},
    {id: 2, label: "Network 02"},
    {id: 3, label: "Network 03"},
    {id: 4, label: "Network 04"},
]

const dbcFiles: DbcFile[] = [{
    id: 0, label: "C:\\fakepath\\TRAXON_RemotControl.dbc\n", fileContent: "", status: "available"
}]

const canNodes: CanNode[] = [{
    id: 0, label: "Node01", network: canNetworks[0].id, dbc: dbcFiles[0].id
}]

const canInterfaces: CanInterface[] = [
    {id: 0, status: "available", network: null, label: "0 Kvaser Leaf Light v2"},
    {id: 1, status: "available", network: canNetworks[0].id, label: "1 Kvaser Virtual CAN Driver"},
    {id: 2, status: "available", network: null, label: "2 Kvaser Virtual CAN Driver"},
    {id: 3, status: "available", network: canNetworks[1].id, label: "3 Kvaser Virtual CAN Driver"},
    {id: 4, status: "available", network: null, label: "4 Kvaser Virtual CAN Driver"},
    {id: 5, status: "available", network: canNetworks[2].id, label: "5 Kvaser Virtual CAN Driver"},
    {id: 6, status: "available", network: null, label: "6 Kvaser Virtual CAN Driver"},
    {id: 7, status: "available", network: null, label: "7 Kvaser Virtual CAN Driver"},
    {id: 8, status: "available", network: null, label: "8 Kvaser Virtual CAN Driver"},
    {id: 9, status: "available", network: null, label: "9 Kvaser Virtual CAN Driver"},
    {id: 10, status: "available", network: null, label: "10 Kvaser Virtual CAN Driver"},
    {id: 11, status: "available", network: null, label: "11 Kvaser Virtual CAN Driver"},
    {id: 12, status: "available", network: null, label: "12 Kvaser Virtual CAN Driver"},
]


export function Interfaces_Channels() {

    const [interfaces, setInterfaces] = useState<CanInterface[]>(canInterfaces)
    const [networks] = useState<CanNetwork[]>(canNetworks)
    const [dbcs, setDbcs] = useState<DbcFile[]>(dbcFiles)
    const [nodes, setNodes] = useState<CanNode[]>(canNodes)


    useEffect(() => {
        console.log("dbcs state has changed:", dbcs);
    }, [dbcs]);

    return (
        <ResizablePanelGroup
            direction="horizontal"
        >
            <ResizablePanel defaultSize={50}>
                <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={50}>
                        <div className="flex h-full p-2">
                            <ChannelList
                                interfaces={interfaces}
                                setInterfaces={setInterfaces}
                                networks={networks}
                            >
                            </ChannelList>
                        </div>
                    </ResizablePanel>

                    <ResizableHandle/>

                    <ResizablePanel defaultSize={50}>
                        <div className="flex h-full p-2">
                            <DbcList dbcList={dbcs} setDbcList={setDbcs}></DbcList>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>

            <ResizableHandle/>

            <ResizablePanel defaultSize={50}>
                <div className="flex h-full p-2">
                    <Nodes
                        networks={networks}
                        dbcs={dbcs}
                        nodes={nodes}
                        setNodes={setNodes}
                    >
                    </Nodes>
                </div>
            </ResizablePanel>

        </ResizablePanelGroup>
    )
}
