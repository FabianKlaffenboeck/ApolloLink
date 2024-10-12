import './BasicGrid.css'
import React, {useEffect, useState} from "react";
import GridLayout from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css"; // needed for resizable components

interface Tile {
    i: string; // Unique identifier for each tile
    x: number; // Column position
    y: number; // Row position
    w: number; // Width
    h: number; // Height
}

const BasicGrid: React.FC = () => {
    const [width, setWidth] = useState<number>(window.innerWidth);
    const [layout, setLayout] = useState<Tile[]>([]);
    const [tileCount, setTileCount] = useState<number>(0); // Track the count of tiles

    // Update width when the window is resized
    useEffect(() => {
        const handleResize = () => {
            setWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);
        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    // Function to add a new tile
    const addTile = () => {
        const newTileCount = tileCount + 1;
        const newTile: Tile = {i: newTileCount.toString(), x: 0, y: 0, w: 2, h: 1};

        setLayout((prevLayout) => [...prevLayout, newTile]);
        setTileCount(newTileCount); // Update the tile count
    };

    return (
        <div style={{width: "100vw", height: "100vh", overflow: "hidden"}}>
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
                layout={layout}
                cols={20} // Number of columns in the grid
                rowHeight={Math.floor(window.innerHeight / 10)} // Scale row height to window height
                width={width} // Dynamic width based on window size
                compactType="horizontal"
                autoSize={true}
                onLayoutChange={(newLayout) => setLayout(newLayout)} // Update layout on change
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
                            color: "white",
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
