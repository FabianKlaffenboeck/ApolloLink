import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import ChadCn from "@/ChadCn.tsx";
import App from "@/App.tsx";
import BasicGrid from "@/BasicGrid.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App/>
        <BasicGrid/>
        <ChadCn/>
    </React.StrictMode>,
)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
})
