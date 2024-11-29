"use client"

import * as React from "react"
import {CaretSortIcon, CheckIcon} from "@radix-ui/react-icons"

import {Button} from "@/components/ui/button.tsx"
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandList,} from "@/components/ui/command.tsx"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover.tsx"
import {CanNetwork} from "@/Tabs/Interfaces_Channels/Interfaces_Channels.tsx";
import {useState} from "react";
import {CommandItem} from "cmdk";
import {cn} from "@/lib/utils.ts";

export function NetworkSelector({disabled, rowId, selected, networks, handleDropdownChange}: {
    disabled: boolean
    rowId: number,
    selected: CanNetwork,
    networks: CanNetwork[],
    handleDropdownChange: (id: number, value: CanNetwork) => void
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
                    {networks.find((network) => network.id === value?.id)?.label || "Select Network..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search alias..." className="h-9"/>
                    <CommandList>
                        <CommandEmpty>No Network found.</CommandEmpty>
                        <CommandGroup>
                            {networks.map((network) => (<CommandItem
                                key={network.id}
                                value={String(network.id)}
                                onSelect={(currentValue) => {
                                    const newValId = Number(currentValue) === value?.id ? -1 : Number(currentValue)
                                    const newVal = networks.find((network) => network.id === newValId)
                                    setValue(newVal)
                                    setOpen(false)
                                    handleDropdownChange(rowId, newVal)
                                }}
                            >
                                {network.label}
                                <CheckIcon
                                    className={cn("ml-auto h-4 w-4", value?.id === network.id ? "opacity-100" : "opacity-0")}
                                />
                            </CommandItem>))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
