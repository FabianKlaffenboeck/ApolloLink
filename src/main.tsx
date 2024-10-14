import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {Dashboard} from "@/Dasboard.tsx";
import {TooltipProvider} from "@/components/ui/tooltip.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider>
            <TooltipProvider>
                <Dashboard/>
            </TooltipProvider>
        </ThemeProvider>
    </React.StrictMode>,
)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
})
