import React, {useEffect, useState} from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css"; // needed for resizable components

interface Tile {
    i: string;
    x: number;
    y: number;
    w: number;
    h: number;
}

const BasicGrid: React.FC = () => {
    const [width, setWidth] = useState<number>(window.innerWidth - 100);
    const [layout, setLayout] = useState<Tile[]>([]);
    const [tileCount, setTileCount] = useState<number>(0); // Track the count of tiles

    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth - 100);
        };
        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const addTile = () => {
        const newTileCount = tileCount + 1;
        const newTile: Tile = {i: newTileCount.toString(), x: 0, y: 0, w: 1, h: 1};
        setLayout((prevLayout) => [...prevLayout, newTile]);
        setTileCount(newTileCount);
    };

    return (
        <div>
            <button
                onClick={addTile}
                style={{
                    margin: "10px",
                    padding: "10px 20px",
                    backgroundColor: "#28a745",
                    color: "white",
                    border: "none",
                    borderRadius: "5px",
                    cursor: "pointer"
                }}
            >
                Add Tile
            </button>

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
                {layout.map((tile) => (
                    <div
                        key={tile.i}
                        data-grid={tile} // Bind tile properties
                        style={{
                            backgroundColor: "#ff5733",
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            color: "white"
                        }}
                    >
                        Item {tile.i}
                    </div>
                ))}

            </GridLayout>
        </div>
    );
};

export default BasicGrid;
