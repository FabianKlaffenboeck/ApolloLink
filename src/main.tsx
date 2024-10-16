import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {Dashboard} from "@/Dasboard.tsx";
import {ThemeProvider} from "@/components/theme-provider.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ThemeProvider>
            <Dashboard/>
        </ThemeProvider>
    </React.StrictMode>,
)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
})
