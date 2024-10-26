"use client"

import * as React from "react"
import {CaretSortIcon, CheckIcon} from "@radix-ui/react-icons"

import {cn} from "@/lib/utils.ts"
import {Button} from "@/components/ui/button.tsx"
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from "@/components/ui/command.tsx"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover.tsx"


export type CanInterface = {
    id: string | number
    name: string
    canChannel: string | null
    status: "available" | "used"
}
export type CanChannel = {
    id: string
    label: string
}

export function ChannelSelector({selected, aliasList}: { selected: string, aliasList: CanChannel[] }) {
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
                    {value ? aliasList.find((alias) => alias.id === value)?.label : "Select alias..."}
                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandInput placeholder="Search alias..." className="h-9"/>
                    <CommandList>
                        <CommandEmpty>No Alias found.</CommandEmpty>
                        <CommandGroup>
                            {aliasList.map((alias) => (<CommandItem
                                key={alias.id}
                                value={alias.id}
                                onSelect={(currentValue) => {
                                    setValue(currentValue === value ? "" : currentValue)
                                    setOpen(false)
                                }}
                            >
                                {alias.label}
                                <CheckIcon
                                    className={cn("ml-auto h-4 w-4", value === alias.id ? "opacity-100" : "opacity-0")}
                                />
                            </CommandItem>))}
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}
