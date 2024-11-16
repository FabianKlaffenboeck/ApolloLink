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
import {DbcFile} from "@/Tabs/Interfaces_Channels/Interfaces_Channels.tsx";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle} from "@/components/ui/dialog.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table.tsx";
import {Checkbox} from "@/components/ui/checkbox.tsx";
import {Input} from "@/components/ui/input.tsx";

export type SignalListElement = {
    signalName: string
    dbcName: string
}

export function SignalSelector({openSelector, setOpenSelector}: {
    openSelector: boolean
    setOpenSelector: (value: boolean) => void
    closeHook: () => void;
    dbcs: DbcFile[];
}) {

    const [signals,] = useState<SignalListElement[]>([{
        dbcName: "Tets",
        signalName: "asdasd"
    }, {dbcName: "Tetasdasw223s", signalName: "2342342"}])
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})

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
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Signal Selector</DialogTitle>
                    {/*<DialogDescription>*/}
                    {/*    Make changes to your profile here. Click save when you're done.*/}
                    {/*</DialogDescription>*/}
                </DialogHeader>
                <div className="grid gap-4 py-4">


                    <div className="w-full flex flex-col">
                        <div className="flex items-center py-4">
                            <Input
                                placeholder="Find Signal"
                                value={(table.getColumn("signalName")?.getFilterValue() as string) ?? ""}
                                onChange={(event) => {
                                    table.getColumn("signalName")?.setFilterValue(event.target.value)
                                }}
                            />
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
