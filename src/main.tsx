import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import BasicGrid from "./BasicGrid.tsx";
import App from "./App.tsx";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
        <BasicGrid/>
    </React.StrictMode>,
)

// Use contextBridge
window.ipcRenderer.on('main-process-message', (_event, message) => {
    console.log(message)
})

