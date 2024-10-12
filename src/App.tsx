import './App.css'
import {ThemeProvider} from "@/components/theme-provider.tsx";
import {Button} from "@/components/ui/button.tsx";
import {ModeToggle} from "@/components/mode-toggle.tsx";

function App() {

    return (
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
            <ModeToggle></ModeToggle>
            <div>
                <Button>Click me</Button>
            </div>
        </ThemeProvider>
    )
}

export default App
