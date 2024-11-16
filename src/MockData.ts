import {CanInterface, CanNetwork, CanNode, DbcFile} from "@/Tabs/Interfaces_Channels/Interfaces_Channels.tsx";

export const canNetworks: CanNetwork[] = [
    {id: 0, label: "Network 00"},
    {id: 1, label: "Network 01"},
    {id: 2, label: "Network 02"},
    {id: 3, label: "Network 03"},
    {id: 4, label: "Network 04"},
]

export const dbcFiles: DbcFile[] = [{
    id: 0, label: "TRAXON_RemotControl.dbc", fileContent: "", dbcObj: null, status: "available"
}]

export const canNodes: CanNode[] = [{
    id: 0, label: "Node01", network: canNetworks[0].id, dbc: dbcFiles[0].id
}]

export const canInterfaces: CanInterface[] = [
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

