import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {CanState, VisualisationType} from "@/SideBar.tsx";
import {v4 as uuidv4} from 'uuid';
import {TRACE} from "@/VisualisationTiles/TRACE.tsx";
import {TABLE} from "@/VisualisationTiles/TABLE.tsx";
import {GRAPH} from "@/VisualisationTiles/GRAPH.tsx";
import {VALUE} from "@/VisualisationTiles/VALUE.tsx";

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

const VisualisationGrid = ({busState}: { busState: CanState; }, addTileRef: React.Ref<AddTileRef>) => {

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

    function renderTile(tile: Tile) {
        const tileHandle = tiles.find(it => it.id == tile.i)

        switch (tileHandle?.type) {
            case "TRACE" :
                return (
                    <div key={tile.i}>
                        <TRACE></TRACE>
                    </div>
                )
            case "TABLE":
                return (
                    <div key={tile.i}>
                        <TABLE></TABLE>
                    </div>
                )
            case "GRAPH":
                return (
                    <div key={tile.i}>
                        <GRAPH></GRAPH>
                    </div>
                )
            case "VALUE":
                return (
                    <div key={tile.i}>
                        <VALUE></VALUE>
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
                isDraggable={busState== "OFFLINE"}
            >
                {layout.map((tile) => (renderTile(tile)))}
            </GridLayout>
        </div>
    )
};

export default forwardRef(VisualisationGrid);