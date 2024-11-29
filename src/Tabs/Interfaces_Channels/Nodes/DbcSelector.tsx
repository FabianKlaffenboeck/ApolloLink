"use client"

import * as React from "react"
import {CaretSortIcon, CheckIcon} from "@radix-ui/react-icons"

import {cn} from "@/lib/utils.ts"
import {Button} from "@/components/ui/button.tsx"
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from "@/components/ui/command.tsx"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover.tsx"
import {DbcFile} from "@/Tabs/Interfaces_Channels/Interfaces_Channels.tsx";
import {useState} from "react";

export function DbcSelector({disabled, rowId, selected, dbcs, handleDropdownChange}: {
    disabled: boolean
    rowId: number,
    selected: DbcFile,
    dbcs: DbcFile[],
    handleDropdownChange: (id: number, value: DbcFile) => void
}) {
    const [open, setOpen] = useState(false)
    const [value, setValue] = useState(selected)


    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger disabled={disabled} asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-[200px] justify-between"
                >
                    {dbcs.find((dbc) => dbc.id == value.id)?.label || "Select DBC..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search alias..." className="h-9"/>
                    <CommandList>
                        <CommandEmpty>No Network found.</CommandEmpty>
                        <CommandGroup>
                            {dbcs.map((dbc) => (
                                <CommandItem
                                    key={dbc.id}
                                    value={String(dbc.id)}
                                    onSelect={(currentValue) => {
                                        const newValId = Number(currentValue) === value?.id ? -1 : Number(currentValue)
                                        const newVal = dbcs.find((dbc) => dbc.id === newValId)
                                        setValue(newVal)
                                        setOpen(false)
                                        console.log(selected);
                                        handleDropdownChange(rowId, newVal)
                                    }}
                                >
                                    {dbc.label}
                                    <CheckIcon
                                        className={cn("ml-auto h-4 w-4", value?.id === dbc.id ? "opacity-100" : "opacity-0")}
                                    />
                                </CommandItem>))
                            }
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
