import {TooltipProvider,} from "@/components/ui/tooltip"
import LogoFKLab_Light from './assets/LogoFKLab_Light.svg'
import LogoFKLab_Dark from './assets/LogoFKLab_Dark.svg'
import {Theme, useTheme} from "@/components/theme-provider.tsx";
import ComponentGrid, {AddTileRef} from "@/Dashboard.tsx";
import {SideBar} from "@/SideBar.tsx";
import {HeaderBar, TabValue} from "@/HeaderBar.tsx";
import {useRef, useState} from "react";
import {Interfaces_Channels} from "@/Interfaces_Channels/Interfaces_Channels.tsx";


export function MainPage() {

    const addTileTrigger = useRef<AddTileRef>(null);
    const [tab, setTab] = useState<TabValue>("DASBOARD");

    const choseLogoIcon = (themeProviderState: Theme) => {
        if (themeProviderState == "light") {
            return <img style={{width: 30.5}} src={LogoFKLab_Dark} alt={""}/>
        } else {
            return <img style={{width: 30.5}} src={LogoFKLab_Light} alt={""}/>
        }
    }


    const handleTabChange = (selected: TabValue) => {
        setTab(selected);
    };

    const handleAddVisualisationItem = (message: string) => {
        if (addTileTrigger.current) {
            addTileTrigger.current.addTile(message);
        }
    };


    return (
        <TooltipProvider>
            <div className="grid h-screen w-full pl-[53px]">
                <aside className="inset-y fixed  left-0 z-20 flex h-full flex-col border-r">
                    <div className="border-b p-2">
                        {choseLogoIcon(useTheme().theme)}
                    </div>
                    <SideBar onAddVisualisationItem={handleAddVisualisationItem}/>
                </aside>

                <div className="flex flex-col">
                    <HeaderBar onTabChange={handleTabChange}/>

                    <main className="grid flex-1 gap-4 overflow-auto p-4 grid-cols-3 ">

                        <div className="flex h-full flex-col rounded-xl bg-muted/50 p-4 col-span-3"
                             style={{display: (tab == "DASBOARD") ? 'block' : 'none'}}>
                            <ComponentGrid ref={addTileTrigger}></ComponentGrid>
                        </div>

                        <div className="flex h-full col-span-3"
                             style={{display: (tab == "INTERFACES") ? 'block' : 'none'}}>
                            <Interfaces_Channels></Interfaces_Channels>
                        </div>

                    </main>
                </div>
            </div>
        </TooltipProvider>
    )
}
