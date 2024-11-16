import {TooltipProvider,} from "@/components/ui/tooltip"
import LogoFKLab_Light from './assets/LogoFKLab_Light.svg'
import LogoFKLab_Dark from './assets/LogoFKLab_Dark.svg'
import {Theme, useTheme} from "@/components/theme-provider.tsx";
import VisualisationGrid, {AddTileRef} from "@/Tabs/Dashboard/Dashboard.tsx";
import {CanState, SideBar, VisualisationType} from "@/Bars/SideBar.tsx";
import {HeaderBar, TabValue} from "@/Bars/HeaderBar.tsx";
import {useRef, useState} from "react";
import {
    CanInterface,
    CanNetwork, CanNode,
    DbcFile,
    Interfaces_Channels
} from "@/Tabs/Interfaces_Channels/Interfaces_Channels.tsx";
import {canInterfaces, canNetworks, canNodes, dbcFiles} from "@/MockData.ts";


export function MainPage() {

    const addTileTrigger = useRef<AddTileRef>(null);
    const [currentTap, setCurrentTap] = useState<TabValue>("DASBOARD");
    const [busState, setBusState] = useState<CanState>("OFFLINE")

    const [interfaces, setInterfaces] = useState<CanInterface[]>(canInterfaces)
    const [networks] = useState<CanNetwork[]>(canNetworks)
    const [dbcs, setDbcs] = useState<DbcFile[]>(dbcFiles)
    const [nodes, setNodes] = useState<CanNode[]>(canNodes)


    const choseLogoIcon = (themeProviderState: Theme) => {
        if (themeProviderState == "light") {
            return <img style={{width: 30.5}} src={LogoFKLab_Dark} alt={""}/>
        } else {
            return <img style={{width: 30.5}} src={LogoFKLab_Light} alt={""}/>
        }
    }

    const handleTabChange = (selected: TabValue) => {
        setCurrentTap(selected);
    };

    const addTile = (message: VisualisationType) => {
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
                    <SideBar
                        busState={busState}
                        setBusState={setBusState} tap={currentTap}
                        onAddVisualisationItem={addTile}/>
                </aside>

                <div className="flex flex-col">
                    <HeaderBar onTabChange={handleTabChange}/>

                    <main className="grid flex-1 gap-4 overflow-auto p-4 grid-cols-3 ">

                        <div className="flex h-full flex-col rounded-xl bg-muted/50 p-4 col-span-3"
                             style={{display: (currentTap == "DASBOARD") ? 'block' : 'none'}}>
                            <VisualisationGrid
                                networks={networks}
                                dbcs={dbcs}
                                nodes={nodes}
                                busState={busState}
                                ref={addTileTrigger}
                            ></VisualisationGrid>
                        </div>

                        <div className="flex h-full col-span-3"
                             style={{display: (currentTap == "INTERFACES") ? 'block' : 'none'}}>
                            <Interfaces_Channels
                                interfaces={interfaces}
                                networks={networks}
                                dbcs={dbcs}
                                nodes={nodes}
                                setInterfaces={setInterfaces}
                                setDbcs={setDbcs}
                                setNodes={setNodes}
                                busState={busState}
                            ></Interfaces_Channels>
                        </div>

                    </main>
                </div>
            </div>
        </TooltipProvider>
    )
}
