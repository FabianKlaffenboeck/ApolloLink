import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup,} from "@/components/ui/resizable.tsx"
import {ChannelList} from "@/Tabs/Interfaces_Channels/ChannelList/ChannelList.tsx";
import {DbcList} from "@/Tabs/Interfaces_Channels/DbcList/DbcList.tsx";
import {useEffect} from "react";
import {Nodes} from "@/Tabs/Interfaces_Channels/Nodes/Nodes.tsx";
import {Dbc} from "candied";
import {CanState} from "@/Bars/SideBar.tsx";

export type DbcFile = {
    id: number
    label: string
    fileContent: string
    dbcObj: Dbc | null
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

export function Interfaces_Channels({interfaces, networks, dbcs, nodes, setInterfaces, setDbcs, setNodes, busState}: {
    interfaces: CanInterface[],
    networks: CanNetwork[],
    dbcs: DbcFile[],
    nodes: CanNode[],
    setInterfaces: (value: CanInterface[]) => void
    setDbcs: (value: DbcFile[]) => void
    setNodes: (value: CanNode[]) => void
    busState: CanState
}) {

    useEffect(() => {
        console.log("dbcs state has changed:", dbcs);
        dbcs.forEach(it => {
            console.log(it.dbcObj?.data.messages);
        })
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
                                busState={busState}
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
                            <DbcList
                                busState={busState}
                                dbcList={dbcs}
                                setDbcList={setDbcs}
                            >
                            </DbcList>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>

            <ResizableHandle/>

            <ResizablePanel defaultSize={50}>
                <div className="flex h-full p-2">
                    <Nodes
                        busState={busState}
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
