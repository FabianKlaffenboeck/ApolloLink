"use client"

import * as React from "react"
import {CaretSortIcon, CheckIcon} from "@radix-ui/react-icons"

import {cn} from "@/lib/utils.ts"
import {Button} from "@/components/ui/button.tsx"
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList,} from "@/components/ui/command.tsx"
import {Popover, PopoverContent, PopoverTrigger,} from "@/components/ui/popover.tsx"


interface AliasSelectorProps {
    selected?: unknown,
    aliasList?: CanChannelAlias[]
}

export type CanChannel = {
    id: string | number
    name: string
    alias: string | null
    status: "available" | "used"
}
export type CanChannelAlias = {
    id: string
    label: string
}

export function AliasSelector({selected, aliasList}: AliasSelectorProps) {
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState(selected)

    return (<Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
            <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className="w-[200px] justify-between"
            >
                {value ? aliasList!.find((framework) => framework.id === value)?.label : "Select alias..."}
                <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
            </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
            <Command>
                <CommandInput placeholder="Search framework..." className="h-9"/>
                <CommandList>
                    <CommandEmpty>No framework found.</CommandEmpty>
                    <CommandGroup>
                        {aliasList!.map((framework) => (<CommandItem
                            key={framework.id}
                            value={framework.id}
                            onSelect={(currentValue) => {
                                setValue(currentValue === value ? "" : currentValue)
                                setOpen(false)
                            }}
                        >
                            {framework.label}
                            <CheckIcon
                                className={cn("ml-auto h-4 w-4", value === framework.id ? "opacity-100" : "opacity-0")}
                            />
                        </CommandItem>))}
                    </CommandGroup>
                </CommandList>
            </Command>
        </PopoverContent>
    </Popover>)
}
