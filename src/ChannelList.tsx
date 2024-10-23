import * as React from "react"
import {Button} from "@/components/ui/button"
import {Input} from "@/components/ui/input"
import {CaretSortIcon} from "@radix-ui/react-icons"
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow,} from "@/components/ui/table"
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

const data: Payment[] = [{
    id: "m5gr84i9", amount: 316, status: "success", email: "ken99@yahoo.com"
},
    {id: "3u1reuv4", amount: 242, status: "success", email: "Abe45@gmail.com"},
    {id: "derv1ws0", amount: 837, status: "processing", email: "Monserrat44@gmail.com"},
    {id: "5kma53ae", amount: 874, status: "success", email: "Silas22@gmail.com"},
    {id: "bhqec451", amount: 721, status: "failed", email: "carmel1la@hotmail.com"},
    {id: "bhq4cj4p", amount: 721, status: "failed", email: "carmel2la@hotmail.com"},
    {id: "74556782", amount: 721, status: "failed", email: "carmel32la@hotmail.com"},
    {id: "bhqec64p", amount: 721, status: "failed", email: "carmel48la@hotmail.com"},
    {id: "wertdfg7", amount: 721, status: "failed", email: "carmell5a@hotmail.com"},
    {id: "fetertfw", amount: 721, status: "failed", email: "carmel4la@hotmail.com"},
    {id: "fetertfw", amount: 721, status: "failed", email: "carmel4la@hotmail.com"},
    {id: "fetertfw", amount: 721, status: "failed", email: "carmel4la@hotmail.com"},
    {id: "fetertfw", amount: 721, status: "failed", email: "carmel4la@hotmail.com"},
    {id: "fetertfw", amount: 721, status: "failed", email: "carmel4la@hotmail.com"},
    {id: "fetertfw", amount: 721, status: "failed", email: "carmel4la@hotmail.com"},
    {id: "fetertfw", amount: 721, status: "failed", email: "carmel4la@hotmail.com"},
    {id: "fetertfw", amount: 721, status: "failed", email: "carmel4la@hotmail.com"},
    {id: "fetertfw", amount: 721, status: "failed", email: "carmel4la@hotmail.com"},
]

export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "status",
        header: "Status",
        cell: ({row}) => (<div className="capitalize">{row.getValue("status")}</div>),
    },
    {
        accessorKey: "email", header: ({column}) => {
            return (<Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Email
                <CaretSortIcon className="ml-2 h-4 w-4"/>
            </Button>)
        }, cell: ({row}) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "amount", header: () => <div className="text-right">Amount</div>, cell: ({row}) => {
            const amount = parseFloat(row.getValue("amount"))

            // Format the amount as a dollar amount
            const formatted = new Intl.NumberFormat("en-US", {
                style: "currency", currency: "USD",
            }).format(amount)

            return <div className="text-right font-medium">{formatted}</div>
        },
    }
]

export function ChannelList() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

    const table = useReactTable({
        data,
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
                value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
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
