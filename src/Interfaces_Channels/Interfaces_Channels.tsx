import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup,} from "@/components/ui/resizable.tsx"
import {ChannelList} from "@/Interfaces_Channels/ChannelList/ChannelList.tsx";
import {DbcFile, DbcList} from "@/Interfaces_Channels/DbcList/DbcList.tsx";
import {useState} from "react";
import {CanInterface, CanNetwork} from "@/Interfaces_Channels/ChannelList/NetworkSelector.tsx";


//FIXME maybe not stringId
const networks: CanNetwork[] = [
    {id: "0", label: "Network 0"},
    {id: "1", label: "Network 1"},
    {id: "2", label: "Network 2"},
    {id: "3", label: "Network 3"},
    {id: "4", label: "Network 4"},
]

const canInterfaces: CanInterface[] = [
    {id: 0, status: "available", canNetwork: null, name: "0 Kvaser Leaf Light v2"},
    {id: 1, status: "available", canNetwork: networks[0].id, name: "1 Kvaser Virtual CAN Driver"},
    {id: 2, status: "available", canNetwork: null, name: "2 Kvaser Virtual CAN Driver"},
    {id: 3, status: "available", canNetwork: networks[1].id, name: "3 Kvaser Virtual CAN Driver"},
    {id: 4, status: "available", canNetwork: null, name: "4 Kvaser Virtual CAN Driver"},
    {id: 5, status: "available", canNetwork: networks[2].id, name: "5 Kvaser Virtual CAN Driver"},
    {id: 6, status: "available", canNetwork: null, name: "6 Kvaser Virtual CAN Driver"},
    {id: 7, status: "available", canNetwork: null, name: "7 Kvaser Virtual CAN Driver"},
    {id: 8, status: "available", canNetwork: null, name: "8 Kvaser Virtual CAN Driver"},
    {id: 9, status: "available", canNetwork: null, name: "9 Kvaser Virtual CAN Driver"},
    {id: 10, status: "available", canNetwork: null, name: "10 Kvaser Virtual CAN Driver"},
    {id: 11, status: "available", canNetwork: null, name: "11 Kvaser Virtual CAN Driver"},
    {id: 12, status: "available", canNetwork: null, name: "12 Kvaser Virtual CAN Driver"},
]

const dbcFiles: DbcFile[] = [{
    id: 1, name: "string", status: "available"
}]

export function Interfaces_Channels() {

    const [interfaceList, setInterfaceList] = useState<CanInterface[]>(canInterfaces)
    const [networkList, setNetworkList] = useState<CanNetwork[]>(networks)
    const [dbcList, setDbcList] = useState<DbcFile[]>(dbcFiles)


    return (
        <ResizablePanelGroup
            direction="horizontal"
        >
            <ResizablePanel defaultSize={50}>
                <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={50}>
                        <div className="flex items-center justify-center p-6">
                            <ChannelList
                                interfaceList={interfaceList}
                                setInterfaceList={setInterfaceList}
                                networkList={networkList}
                                setNetworkList={setNetworkList}
                            >
                            </ChannelList>
                        </div>
                    </ResizablePanel>

                    <ResizableHandle/>

                    <ResizablePanel defaultSize={50}>
                        <div className="flex items-center justify-center p-6">
                            <DbcList dbcList={dbcList} setDbcList={setDbcList}></DbcList>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>

            <ResizableHandle/>

            <ResizablePanel defaultSize={50}>
                <div className="bg-amber-200 flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Nodes</span>
                </div>
            </ResizablePanel>

        </ResizablePanelGroup>
    )
}
