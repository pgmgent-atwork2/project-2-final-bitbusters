import React, { useState } from "react";
import Instruments from "../components/Instruments";

export default function Home() {
    const [draggedItem, setDraggedItem] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);

    const handleDragStart = (event) => {
        const id = event.target.id;
        console.log("Dragged item id:", id);
        setDraggedItem(id);
        event.target.style.opacity = "0.5";
        const computedStyle = window.getComputedStyle(event.target);
        console.log("Dragged item style:", computedStyle);
        console.log("Dragged item classes:", event.target.classList);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
    };

    const handleDragEnter = (event) => {
        event.preventDefault();
        event.target.classList.add("dragover");
    };

    const handleDragLeave = (event) => {
        event.target.classList.remove("dragover");
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.target.classList.remove("dragover");

        const draggedItemId = draggedItem;
        const droppedTarget = event.target;

        if (draggedItemId && droppedTarget) {
            const draggedElement = document.getElementById(draggedItemId);
            if (draggedElement) {
                draggedElement.style.opacity = "1";
                droppedTarget.appendChild(draggedElement);

                const backgroundColor = window.getComputedStyle(
                    draggedElement
                ).backgroundColor;
                draggedElement.style.color = backgroundColor;
                draggedElement.style.margin = "0"; // Stel de margin in op 0

                setDraggedItem(null);
            }
        }
    };

    const handleColorSelection = (color) => {
        setSelectedColor(color);
    };

    return (
        <div className="home-container">
            <div className="left">
                <div className="information">
                    <input placeholder="Name" />
                    <br />
                    <input placeholder="Date" />
                </div>
                <div className="gridlock">
                    <div
                        className="placement"
                        onDragOver={handleDragOver}
                        onDragEnter={handleDragEnter}
                        onDragLeave={handleDragLeave}
                        onDrop={handleDrop}
                    >
                        <img
                            src="img/concertplan.png"
                            title="Concert plan"
                            alt="Concert plan"
                        />
                        <div className="overlap-div">
                            {[...Array(900)].map((_, index) => (
                                <div
                                    key={index}
                                    className="grid-item"
                                    draggable="false"
                                    onClick={(event) => {
                                        event.target.style.backgroundColor =
                                            selectedColor;
                                        event.target.style.opacity = "0.25";
                                    }}
                                ></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="inventaris">
                <Instruments
                    setDraggedItem={setDraggedItem}
                    setSelectedColor={setSelectedColor}
                />
            </div>
        </div>
    );
}
