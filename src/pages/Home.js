import React, { useState, useEffect } from "react";
import Instruments from "../components/Instruments";
import html2pdf from "html2pdf.js";

export default function Home() {
    const [draggedItem, setDraggedItem] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [name, setName] = useState("");
    const [date, setDate] = useState("");
    const [generatedUrl, setGeneratedUrl] = useState("");
    const [gridColors, setGridColors] = useState([]);

    useEffect(() => {
        // Parse URL query parameters
        const params = new URLSearchParams(window.location.search);
        const nameParam = params.get("name");
        const dateParam = params.get("date");
        const colorsParam = params.get("colors");

        if (nameParam) {
            setName(nameParam);
        }

        if (dateParam) {
            setDate(dateParam);
        }
        
        if (colorsParam) {
            setGridColors(colorsParam.split(","));
        }
    }, []);

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

    const handleGridItemClick = (index) => {
        const newGridColors = [...gridColors];
        newGridColors[index] = selectedColor;
        setGridColors(newGridColors);
    };

    const downloadPdf = () => {
        const element = document.querySelector(".left");
        html2pdf().from(element).save();
    };

    const generateUrl = () => {
        const colorsString = gridColors.join(",");
        const url = `${window.location.origin}?name=${encodeURIComponent(name)}&date=${encodeURIComponent(date)}&colors=${encodeURIComponent(colorsString)}`;
        setGeneratedUrl(url);
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(generatedUrl).then(() => {
            alert('URL copied to clipboard');
        }, () => {
            alert('Failed to copy URL');
        });
    };

    return (
        <div className="home-container">
            <div className="left">
                <div className="information">
                    <input 
                        placeholder="Name" 
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <br />
                    <input 
                        placeholder="Date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
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
                                    style={{
                                        backgroundColor: gridColors[index] || "transparent",
                                        opacity: gridColors[index] ? "0.25" : "1"
                                    }}
                                    draggable="false"
                                    onClick={() => handleGridItemClick(index)}
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
                <div className="end">
            <button onClick={downloadPdf}>Download PDF</button>
            <button onClick={generateUrl}>Generate URL</button>
            {generatedUrl && (
                <div>
                    <input 
                        type="text" 
                        value={generatedUrl} 
                        readOnly 
                        style={{ width: "100%" }}
                    />
                    <button onClick={copyToClipboard}>Copy URL</button>
                </div>
            )}
            </div>
            </div>
            
        </div>
    );
}
