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
import {CanInterface, CanNetwork, NetworkSelector} from "@/Interfaces_Channels/ChannelList/NetworkSelector.tsx";


export function ChannelList({interfaceList, setInterfaceList, networkList}: {
    interfaceList: CanInterface[],
    setInterfaceList: (value: CanInterface[]) => void;
    networkList: CanNetwork[],
}) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

    const handleDropdownChange = (id: number, value: string) => {
        setInterfaceList(interfaceList.map((item) => (item.id === id ? {...item, canNetwork: value} : item)));
    };

    const columns: ColumnDef<CanInterface>[] = [
        {
            accessorKey: "id",
            header: "ID",
            cell: ({row}) => (<div className="capitalize">{row.getValue("id")}</div>),
        },
        {
            accessorKey: "name", header: ({column}) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Interface
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
            accessorKey: "canNetwork", header: "Network", cell: ({row}) => {
                return (
                    <NetworkSelector rowId={row.getValue("id")}
                                     selected={row.getValue("canNetwork")}
                                     networkList={networkList}
                                     handleDropdownChange={handleDropdownChange}
                    >
                    </NetworkSelector>
                )
            },
        }
    ]

    const table = useReactTable({
        data: interfaceList,
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
                placeholder="Filter by name..."
                value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
                onChange={(event) => table.getColumn("name")?.setFilterValue(event.target.value)}
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
