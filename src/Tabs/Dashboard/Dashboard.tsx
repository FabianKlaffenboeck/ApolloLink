import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {CanState, VisualisationType} from "@/Bars/SideBar.tsx";
import {v4 as uuidv4} from 'uuid';
import {TRACE} from "@/Tabs/Dashboard/VisualisationTiles/TRACE.tsx";
import {TABLE} from "@/Tabs/Dashboard/VisualisationTiles/TABLE.tsx";
import {GRAPH} from "@/Tabs/Dashboard/VisualisationTiles/GRAPH.tsx";
import {VALUE} from "@/Tabs/Dashboard/VisualisationTiles/VALUE.tsx";
import {CanNetwork, CanNode, DbcFile} from "@/Tabs/Interfaces_Channels/Interfaces_Channels.tsx";

interface Tile {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

interface VisualisationTile {
    id: string;
    type: VisualisationType
}

export interface AddTileRef {
    addTile: (type: VisualisationType) => void,
}

const VisualisationGrid = ({nodes,busState}: {
    networks: CanNetwork[],
    dbcs: DbcFile[],
    nodes: CanNode[],
    busState: CanState;
}, addTileRef: React.Ref<AddTileRef>) => {

    const [width, setWidth] = useState<number>(window.innerWidth - 100);
    const [layout, setLayout] = useState<Tile[]>([])
    const [tileCount, setTileCount] = useState<number>(0)
    const [tiles, setTiles] = useState<VisualisationTile[]>([]);

    useImperativeHandle(addTileRef, () => ({
        addTile
    }));

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth - 100)
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    function addTile(type: VisualisationType) {
        const tileHandle: VisualisationTile = {id: uuidv4(), type: type};
        const newTile: Tile = {
            i: tileHandle.id,
            x: 0, y: 0, w: 1, h: 1
        };

        setTiles((prevTiles) => [...prevTiles, tileHandle]);
        setLayout((prevLayout) => [...prevLayout, newTile]);
        setTileCount(tileCount + 1);
    }

    function deleteTile(id: string) {
        setTiles(tiles.filter((tile) => tile.id !== id));
        setLayout(layout.filter((tile) => tile.i !== id));
    }

    function renderTile(tile: Tile) {
        const tileHandle = tiles.find(it => it.id == tile.i)

        switch (tileHandle?.type) {
            case "TRACE" :
                return (
                    <div key={tile.i}>
                        <TRACE
                            id={tile.i}
                            removeHook={deleteTile}
                        ></TRACE>
                    </div>
                )
            case "TABLE":
                return (
                    <div key={tile.i}>
                        <TABLE
                            id={tile.i}
                            removeHook={deleteTile}
                        ></TABLE>
                    </div>
                )
            case "GRAPH":
                return (
                    <div key={tile.i}>
                        <GRAPH
                            id={tile.i}
                            removeHook={deleteTile}
                        ></GRAPH>
                    </div>
                )
            case "VALUE":
                return (
                    <div key={tile.i}>
                        <VALUE
                            id={tile.i}
                            removeHook={deleteTile}
                            nodes={nodes}
                        ></VALUE>
                    </div>
                )
            default:
                return (
                    <div key={tile.i}>
                        <h1>ERROR</h1>
                    </div>
                )
        }
    }

    return (
        <div>
            <GridLayout
                className="layout"
                compactType="horizontal"
                autoSize={true}
                width={width}
                layout={layout}
                cols={10}
                rowHeight={Math.floor(window.innerHeight / 10)}
                onLayoutChange={(newLayout) => setLayout(newLayout)}
                isDraggable={busState == "OFFLINE"}
            >
                {layout.map((tile) => (renderTile(tile)))}
            </GridLayout>
        </div>
    )
};

export default forwardRef(VisualisationGrid);