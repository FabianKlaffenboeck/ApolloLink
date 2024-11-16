import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";

export function TRACE() {
    const [cnt, setCnt] = useState<number>(0)

    return (
        <div className="bg-background text-foreground w-full h-full">
            <Button onClick={() => setCnt(cnt+1)}>Test {cnt}</Button>
        </div>
    )
}
