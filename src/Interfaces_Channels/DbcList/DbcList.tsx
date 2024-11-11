import * as React from "react"
import {useRef} from "react"
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
import {DbcFile} from "@/Interfaces_Channels/Interfaces_Channels.tsx";
import {MdOutlineDelete} from "react-icons/md";
import {Dbc} from "candied";

export function DbcList({dbcList, setDbcList}: { dbcList: DbcFile[], setDbcList: (value: DbcFile[]) => void; }) {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
    const fileInputRef = useRef<HTMLInputElement | null>(null);


    function deleteHandler(id: number) {
        setDbcList(dbcList.filter(d => d.id != id))
    }

    function handleNameChange(id: number, val: string) {
        setDbcList(dbcList.map((item) =>
                item.id === id ? {...item, label: val} : item
            )
        );
    }

    function addDbcButtonClick() {
        fileInputRef.current?.click();
    }

    function onFileUpload(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files?.[0];

        if (!file) {
            return
        }

        const reader = new FileReader();
        reader.readAsText(file)

        reader.onload = () => {

            const dbc: Dbc = new Dbc();
            dbc.load(reader.result as string)

            setDbcList([...dbcList, {
                id: dbcList.length,
                status: "available",
                fileContent: reader.result as string,
                dbcObj: dbc,
                label: file.name
            }])
        };

    }

    const columns: ColumnDef<DbcFile>[] = [
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
                        DbcFile
                        <CaretSortIcon className="ml-2 h-4 w-4"/>
                    </Button>
                )
            }, cell: ({row, getValue}) => {
                return (
                    <Input value={getValue<string>()}
                           onChange={event =>
                               handleNameChange(row.getValue("id"), event.target.value)}
                    />
                )
            },
        },
        {
            accessorKey: "status",
            header: "Status",
            cell: ({row}) => (<div className="capitalize">{row.getValue("status")}</div>),
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
        data: dbcList,
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

                    <input type="file" ref={fileInputRef} onChange={onFileUpload} accept=".dbc"
                           style={{display: "none"}}/>
                    <Button variant="outline" size="sm" onClick={addDbcButtonClick}>
                        Add DBC
                    </Button>
                </div>
            </div>
        </div>
    )
}
