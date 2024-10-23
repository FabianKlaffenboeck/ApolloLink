import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import {ResizableHandle, ResizablePanel, ResizablePanelGroup,} from "@/components/ui/resizable"

export function Interfaces_Channels() {

    return (
        <ResizablePanelGroup
            direction="horizontal"
        >
            <ResizablePanel defaultSize={50}>
                <ResizablePanelGroup direction="vertical">
                    <ResizablePanel defaultSize={50}>
                        <div className="flex h-full items-center justify-center p-6"></div>
                    </ResizablePanel>

                    <ResizableHandle/>

                    <ResizablePanel defaultSize={50}>
                        <div className="bg-amber-100 flex h-full items-center justify-center p-6">
                            <span className="font-semibold">DBCs</span>
                        </div>
                    </ResizablePanel>
                </ResizablePanelGroup>
            </ResizablePanel>

            <ResizableHandle/>

            <ResizablePanel defaultSize={50}>
                <div className="bg-amber-200 flex h-full items-center justify-center p-6">
                    <span className="font-semibold">Nodes</span>
                </div>
            </ResizablePanel>

        </ResizablePanelGroup>
    )
}
