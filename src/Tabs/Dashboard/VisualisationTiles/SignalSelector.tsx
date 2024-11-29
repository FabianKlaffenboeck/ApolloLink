import {useState} from "react";
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    useReactTable,
    VisibilityState
} from "@tanstack/react-table";
import {CanNode} from "@/Tabs/Interfaces_Channels/Interfaces_Channels.tsx";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";
import {Signal} from "candied/lib/dbc/Dbc";
import {Input} from "@/components/ui/input.tsx";

export type SignalListElement = {
    signalName: string
    dbcName: string
    nodeName: string
    networkName: string
}

export function SignalSelector({openSelector, setOpenSelector, nodes}: {
    openSelector: boolean
    setOpenSelector: (value: boolean) => void
    closeHook: () => void;
    nodes: CanNode[];
}) {

    const [signals, setSignals] = useState<SignalListElement[]>(generateNonFiltered())
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [filterNetwork, setFilterNetwork] = useState<string>("")
    const [filterNode, setFilterNode] = useState<string>("")

    function generateNonFiltered(): SignalListElement[] {
        const outList: SignalListElement[] = [];
        nodes.forEach(node => {

            node.dbc?.dbcObj.data.messages.forEach(message => {
                message.signals.forEach((signal: Signal) => {
                    const tmpItem = {
                        signalName: signal.name,
                        dbcName: node.dbc.label,
                        nodeName: node.label,
                        networkName: node.network.label
                    }
                    outList.push(tmpItem)
                })
            })
        })

        return outList;
    }

    function updateFiltering() {
        let tmpList = generateNonFiltered()

        if (filterNetwork != "") {
            tmpList = tmpList.filter(signal => signal.networkName === filterNetwork)
        }

        if (filterNode != "") {
            tmpList = tmpList.filter(signal => signal.nodeName === filterNode)
        }

        setSignals(tmpList)
        console.log(tmpList);
    }


    const columns: ColumnDef<SignalListElement>[] = [
        {
            id: "select",
            header: "",
            cell: ({row}) => (
                <Checkbox
                    disabled={true}
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
        },
        {
            accessorKey: "signalName", header: "Signal", cell: ({row}) => {
                return (
                    <div>{row.getValue("signalName")}</div>
                )
            },
        },
        {
            accessorKey: "dbcName", header: "DBC", cell: ({row}) => {
                return (
                    <div>{row.getValue("dbcName")}</div>
                )
            },
        },
        {
            accessorKey: "nodeName", header: "Node", cell: ({row}) => {
                return (
                    <div>{row.getValue("nodeName")}</div>
                )
            },
        },
        {
            accessorKey: "networkName", header: "Network", cell: ({row}) => {
                return (
                    <div>{row.getValue("networkName")}</div>
                )
            },
        },
    ]

    const table = useReactTable({
        data: signals,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        initialState: {pagination: {pageSize: 5}},
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {sorting, columnFilters, columnVisibility},
    })


    return (
        <Dialog open={openSelector}>
            <DialogContent className="sm:max-w-[50rem]">
                <DialogHeader>
                    <DialogTitle>Signal Selector</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">

                    <div className="w-full flex flex-col">
                        <div className=" items-center py-4">
                            <Input
                                placeholder="Find Signal"
                                value={(table.getColumn("signalName")?.getFilterValue() as string) ?? ""}
                                onChange={(event) => {
                                    table.getColumn("signalName")?.setFilterValue(event.target.value)
                                }}
                            />
                            <Select
                                value={filterNetwork}
                                onValueChange={value => {
                                    setFilterNetwork(value)
                                    updateFiltering()
                                }}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a network"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Networks</SelectLabel>
                                        {nodes.map(node => {
                                            return (
                                                <SelectItem value={node.network.label}>{node.network.label}</SelectItem>
                                            )
                                        })}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>

                            <Select
                                value={filterNode}
                                onValueChange={value => {
                                    setFilterNode(value)
                                    updateFiltering()
                                }}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select a node"/>
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectLabel>Nodes</SelectLabel>
                                        {nodes.map(node => {
                                            return (
                                                <SelectItem value={node.label}>{node.label}</SelectItem>
                                            )
                                        })}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                        </div>

                        <Table>
                            <TableHeader>
                                {table.getHeaderGroups().map((headerGroup) => (<TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => {
                                        return (<TableHead key={header.id}>
                                            {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>)
                                    })}
                                </TableRow>))}
                            </TableHeader>
                            <TableBody>
                                {table.getRowModel().rows?.length ? (table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (<TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>))}
                                    </TableRow>))) : (<TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>)}
                            </TableBody>
                        </Table>
                    </div>

                </div>
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
