"use client"

import * as React from "react"
import {CaretSortIcon, CheckIcon} from "@radix-ui/react-icons"

import {cn} from "@/lib/utils.ts"
import {Button} from "@/components/ui/button.tsx"
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from "@/components/ui/command.tsx"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover.tsx"
import {DbcFile} from "@/Interfaces_Channels/Interfaces_Channels.tsx";

export function DbcSelector({rowId, selected, dbcs, handleDropdownChange}: {
    rowId: number,
    selected: number,
    dbcs: DbcFile[],
    handleDropdownChange: (id: number, value: number) => void
}) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(selected)

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {dbcs.find((network) => network.id == value)?.label || "Select DBC..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search alias..." className="h-9"/>
                    <CommandList>
                        <CommandEmpty>No Network found.</CommandEmpty>
                        <CommandGroup>
                            {dbcs.map((dbc) => (<CommandItem
                                key={dbc.id}
                                value={String(dbc.id)}
                                onSelect={(currentValue) => {
                                    const newVal = Number(currentValue) === value ? -1 : Number(currentValue)
                                    setValue(newVal)
                                    setOpen(false)
                                    handleDropdownChange(rowId, Number(newVal))
                                }}
                            >
                                {dbc.label}
                                <CheckIcon
                                    className={cn("ml-auto h-4 w-4", value === dbc.id ? "opacity-100" : "opacity-0")}
                                />
                            </CommandItem>))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
