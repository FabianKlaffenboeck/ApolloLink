import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import React, {forwardRef, useEffect, useImperativeHandle, useState} from "react";

interface Tile {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

export interface ChildBRef {
    addTile: (message: string) => void;
}

function Dashboard(_props: object, ref: React.Ref<ChildBRef>) {

    const [width, setWidth] = useState<number>(window.innerWidth - 100);
    const [layout, setLayout] = useState<Tile[]>([]);
    const [tileCount, setTileCount] = useState<number>(0); // Track the count of tiles

    useImperativeHandle(ref, () => ({
        addTile,
    }));

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth - 100);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const addTile = (tileClass: string) => {
        const newTileCount = tileCount + 1;
        const newTile: Tile = {
            i: newTileCount.toString() + "-" + tileClass,
            x: 0, y: 0, w: 1, h: 1
        };
        setLayout((prevLayout) => [...prevLayout, newTile]);
        setTileCount(newTileCount);
    };

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
            >

                {
                    layout.map((tile) => (
                        <div
                            key={tile.i}
                            data-grid={tile}
                            style={{
                                backgroundColor: "#ff5733",
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                color: "white"
                            }}
                        >
                            {tile.i}
                        </div>
                    ))
                }

            </GridLayout>
        </div>
    )
}

export default forwardRef(Dashboard);
