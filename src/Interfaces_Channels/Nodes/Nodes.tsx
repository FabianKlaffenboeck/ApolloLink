import * as React from "react"
import {Button} from "@/components/ui/button.tsx"
import {Input} from "@/components/ui/input.tsx"
import {CaretSortIcon} from "@radix-ui/react-icons"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table.tsx"
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
    VisibilityState,
} from "@tanstack/react-table"
import {DbcSelector} from "@/Interfaces_Channels/Nodes/DbcSelector.tsx";
import {CanNetwork, CanNode, DbcFile} from "@/Interfaces_Channels/Interfaces_Channels.tsx";
import {NetworkSelector} from "@/Interfaces_Channels/ChannelList/NetworkSelector.tsx";
import {MdOutlineDelete} from "react-icons/md";


export function Nodes({networks, dbcs, nodes, setNodes}: {
    networks: CanNetwork[],
    dbcs: DbcFile[],
    nodes: CanNode[],
    setNodes: (value: CanNode[]) => void;
}) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})


    function addNode() {
        setNodes([...nodes, {
            id: nodes.length,
            label: "Node " + nodes.length,
            network: null,
            dbc: null
        }])
    }

    function handleNetworkChange(id: number, value: number) {
        setNodes(nodes.map((item) => (item.id === id ? {...item, network: value} : item)));
    }

    function handleDbcChange(id: number, value: number) {
        setNodes(nodes.map((item) => (item.id === id ? {...item, dbc: value} : item)));

    }

    function deleteHandler(id: number) {
        setNodes(nodes.filter(d => d.id != id))
    }

    function handleNameInput(id: number, val: string) {
        setNodes(nodes.map((item) =>
                item.id === id ? {...item, label: val} : item
            )
        );
    }

    const columns: ColumnDef<CanNode>[] = [
        {
            accessorKey: "id",
            header: "ID",
            cell: ({row}) => (<div className="capitalize">{row.getValue("id")}</div>),
        },
        {
            accessorKey: "label", header: ({column}) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Node
                        <CaretSortIcon className="ml-2 h-4 w-4"/>
                    </Button>
                )
            }, cell: ({row, getValue}) => {
                return (
                    <Input value={getValue<string>()}
                           onChange={event =>
                               handleNameInput(row.getValue("id"), event.target.value)}
                    />
                )
            },
        },
        {
            accessorKey: "network", header: "Network", cell: ({row}) => {
                return (
                    <NetworkSelector rowId={row.getValue("id")}
                                     selected={row.getValue("network")}
                                     networks={networks}
                                     handleDropdownChange={handleNetworkChange}
                    >
                    </NetworkSelector>
                )
            },
        },
        {
            accessorKey: "dbc", header: "DBC", cell: ({row}) => {
                return (
                    <DbcSelector rowId={row.getValue("id")}
                                 selected={row.getValue("dbc")}
                                 dbcs={dbcs}
                                 handleDropdownChange={handleDbcChange}
                    >
                    </DbcSelector>
                )
            },
        },
        {
            accessorKey: "delete",
            header: "",
            cell: ({row}) => (
                <Button variant="ghost"
                        size="icon"
                        className="rounded-lg bg-muted"
                        onClick={() => deleteHandler(row.getValue("id"))}>
                    <MdOutlineDelete className="size-5"/>
                </Button>
            ),
        },
    ]

    const table = useReactTable({
        data: nodes,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {sorting, columnFilters, columnVisibility},
    })

    return (
        <div className="w-full flex flex-col">
            <div>
                <Input
                    placeholder="Filter by name..."
                    value={(table.getColumn("label")?.getFilterValue() as string) ?? ""}
                    onChange={(event) => table.getColumn("label")?.setFilterValue(event.target.value)}
                />
            </div>

            <div>
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

            <div className="flex-grow"></div>

            <div className="flex items-center justify-end space-x-2 py-4">
                <div className="space-x-2">
                    <Button variant="outline" size="sm" onClick={() => table.previousPage()}
                            disabled={!table.getCanPreviousPage()}>
                        Previous
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => table.nextPage()}
                            disabled={!table.getCanNextPage()}>
                        Next
                    </Button>
                    <Button variant="outline" size="sm" onClick={() => addNode()}>
                        Add Node
                    </Button>
                </div>
            </div>

        </div>
    )
}
