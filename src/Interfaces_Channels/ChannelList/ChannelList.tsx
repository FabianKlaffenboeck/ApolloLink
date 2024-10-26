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
import {CanChannel, CanInterface, ChannelSelector} from "@/Interfaces_Channels/ChannelList/ChannelSelector.tsx";


//FIXME maybe not stringId
const canChannels: CanChannel[] = [
    {id: "0", label: "Alias 0"},
    {id: "1", label: "Alias 1"},
    {id: "2", label: "Alias 2"},
    {id: "3", label: "Alias 3"},
    {id: "4", label: "Alias 4"},
]

const canInterfaces: CanInterface[] = [
    {id: 0, status: "available", canChannel: null, name: "0 Kvaser Leaf Light v2"},
    {id: 1, status: "available", canChannel: canChannels[0].id, name: "1 Kvaser Virtual CAN Driver"},
    {id: 2, status: "available", canChannel: null, name: "2 Kvaser Virtual CAN Driver"},
    {id: 3, status: "available", canChannel: canChannels[1].id, name: "3 Kvaser Virtual CAN Driver"},
    {id: 4, status: "available", canChannel: null, name: "4 Kvaser Virtual CAN Driver"},
    {id: 5, status: "available", canChannel: canChannels[2].id, name: "5 Kvaser Virtual CAN Driver"},
    {id: 6, status: "available", canChannel: null, name: "6 Kvaser Virtual CAN Driver"},
    {id: 7, status: "available", canChannel: null, name: "7 Kvaser Virtual CAN Driver"},
    {id: 8, status: "available", canChannel: null, name: "8 Kvaser Virtual CAN Driver"},
    {id: 9, status: "available", canChannel: null, name: "9 Kvaser Virtual CAN Driver"},
    {id: 10, status: "available", canChannel: null, name: "10 Kvaser Virtual CAN Driver"},
    {id: 11, status: "available", canChannel: null, name: "11 Kvaser Virtual CAN Driver"},
    {id: 12, status: "available", canChannel: null, name: "12 Kvaser Virtual CAN Driver"},
]

const columns: ColumnDef<CanInterface>[] = [
    {
        accessorKey: "name", header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Name
                    <CaretSortIcon className="ml-2 h-4 w-4"/>
                </Button>
            )
        }, cell: ({row}) => {
            return (
                <div className="lowercase">{row.getValue("name")}</div>
            )
        },
    },
    {
        accessorKey: "status",
        header: "Status",
        cell: ({row}) => (<div className="capitalize">{row.getValue("status")}</div>),
    },
    {
        accessorKey: "canChannel", header: "Alias", cell: ({row}) => {
            return (
                <ChannelSelector selected={row.getValue("canChannel")} aliasList={canChannels}></ChannelSelector>
            )
        },
    }
]

export function ChannelList() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

    const table = useReactTable({
        data: canInterfaces,
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

    return (<div className="w-full">
        <div>
            <Input
                placeholder="Filter emails..."
                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                onChange={(event) => table.getColumn("email")?.setFilterValue(event.target.value)}
            />
        </div>

        <div className="rounded-md border">
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
            </div>
        </div>

    </div>)

}
