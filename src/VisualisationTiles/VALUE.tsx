import {CanMessage} from "@fklab/candongle-interface";
import {useState} from "react";

export function VALUE() {
    const [value, setValue] = useState<number | null>(null);


    window.electron.setCanMsgCallback((msg: CanMessage) => {
        const dataPeace = msg.id
        if (dataPeace != value) {
            setValue((dataPeace))
        }
    })

    return (
        <div className="bg-background text-foreground w-full h-full flex items-center justify-center">
            <h1>{value || "NO DATA"}</h1>
        </div>
    )
}
