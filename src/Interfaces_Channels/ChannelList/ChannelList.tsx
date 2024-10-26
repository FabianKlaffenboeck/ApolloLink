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
import {AliasSelector, CanChannel, CanChannelAlias} from "@/Interfaces_Channels/ChannelList/AliasSelector.tsx";


const channelAliases: CanChannelAlias[] = [
    {id: "0", label: "Alias 0"},
    {id: "1", label: "Alias 1"},
    {id: "2", label: "Alias 2"},
    {id: "3", label: "Alias 3"},
    {id: "4", label: "Alias 4"},
]

const canChannels: CanChannel[] = [
    {id: 0, status: "available", alias: null, name: "0 Kvaser Leaf Light v2"},
    {id: 1, status: "available", alias: channelAliases[0].id, name: "1 Kvaser Virtual CAN Driver"},
    {id: 2, status: "available", alias: null, name: "2 Kvaser Virtual CAN Driver"},
]

const columns: ColumnDef<CanChannel>[] = [
    {
        accessorKey: "status",
        header: "Status",
        cell: ({row}) => (<div className="capitalize">{row.getValue("status")}</div>),
    },
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
        accessorKey: "alias", header: () => <div className="text-right">Alias</div>, cell: ({row}) => {
            return (
                <AliasSelector selected={row.getValue("alias")} aliasList={channelAliases}></AliasSelector>
            )
        },
    }
]

export function ChannelList() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

    const table = useReactTable({
        data: canChannels,
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
