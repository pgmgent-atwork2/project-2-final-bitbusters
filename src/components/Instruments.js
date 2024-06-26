import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "../graphql/queries";

const Instruments = ({ setDraggedItem, setSelectedColor }) => {
    const { loading, error, data } = useQuery(GET_ALL_POSTS);
    const [counts, setCounts] = useState({});
    const [totals, setTotals] = useState({
        strijkers: 0,
        houtblazers: 0,
        koperblazers: 0,
        diverses: 0,
    });

    useEffect(() => {
        const titles = document.getElementsByClassName("collapsible-title");

        const handleClick = function () {
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        };

        for (let i = 0; i < titles.length; i++) {
            titles[i].addEventListener("click", handleClick);
        }
        return () => {
            for (let i = 0; i < titles.length; i++) {
                titles[i].removeEventListener("click", handleClick);
            }
        };
    }, [data]);

    useEffect(() => {
        if (data) {
            const initialCounts = {};
            const initialTotals = {
                strijkers: calculateTotalAmount(data.strijkers),
                houtblazers: calculateTotalAmount(data.houtblazers),
                koperblazers: calculateTotalAmount(data.koperblazers),
                diverses: calculateTotalAmount(data.diverses),
            };

            ["strijkers", "houtblazers", "koperblazers", "diverses"].forEach(
                (section) => {
                    data[section].forEach((item) => {
                        initialCounts[item.id] = 0;
                    });
                }
            );

            setCounts(initialCounts);
            setTotals(initialTotals);
        }
    }, [data]);

    const handleIncrement = (id, max, section) => {
        setCounts((prevCounts) => {
            const newCount = prevCounts[id] < max ? prevCounts[id] + 1 : max;
            if (newCount !== prevCounts[id]) {
                setTotals((prevTotals) => ({
                    ...prevTotals,
                    [section]: prevTotals[section] - 1,
                }));
            }
            return {
                ...prevCounts,
                [id]: newCount,
            };
        });
    };

    const handleDecrement = (id, section) => {
        setCounts((prevCounts) => {
            const newCount = prevCounts[id] > 0 ? prevCounts[id] - 1 : 0;
            if (newCount !== prevCounts[id]) {
                setTotals((prevTotals) => ({
                    ...prevTotals,
                    [section]: prevTotals[section] + 1,
                }));
            }
            return {
                ...prevCounts,
                [id]: newCount,
            };
        });
    };

    const calculateTotalAmount= (instruments) => {
        return instruments.reduce((total, item) => total + item.amount, 0);
    };

    const generateBezettingen = () => {
        const sections = [
            "strijkers",
            "houtblazers",
            "koperblazers",
            "diverses",
        ];
        return sections
            .map((section) => {
                const sectionCounts = data[section].map(
                    (item) => counts[item.id] || 0
                );
                return sectionCounts.join(".");
            })
            .join("|");
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data) return <p>No data available</p>;

    const instrumentColors = {
        strijkers: "#FFC0CB",
        houtblazers: "#87CEEB",
        koperblazers: "#FFD700",
        diverses: "#90EE90",
    };

    const renderInstrumentList = (instruments, section) => (
        <div className="instrument-card" key={section}>
            <div className="collapsible-title">{section}</div>
            <ul className="content" style={{ display: "none" }}>
                {instruments.map(({ id, instrument, amount }, index) => {
                    const shade = generateShade(
                        instrumentColors[section.toLowerCase()],
                        index
                    );
                    return (
                        <li key={id}>
                            {instrument} - {counts[id]} / {amount}
                            <button
                                onClick={() =>
                                    handleIncrement(id, amount, section.toLowerCase())
                                }
                            >
                                +
                            </button>
                            <button
                                onClick={() =>
                                    handleDecrement(id, section.toLowerCase())
                                }
                            >
                                -
                            </button>
                            <div className="display-total">
                                {Array.from({ length: counts[id] }).map(
                                    (_, idx) => (
                                        <div
                                            key={`${instrument}-${idx}`}
                                            id={`${instrument}-${idx}`}
                                            className="added-div"
                                            style={{ backgroundColor: shade }}
                                            draggable="true"
                                            onDragStart={(event) => handleDragStart(event, `${instrument}-${idx}`)}
                                            onClick={() => setSelectedColor(shade)} // Hier wordt de geselecteerde kleur ingesteld bij klikken op een bolletje
                                        >
                                            {idx + 1}
                                        </div>
                                    )
                                )}
                            </div>
                        </li>
                    );
                })}
            </ul>
        </div>
    );

    const generateShade = (color, factor) => {
        const hex = color.slice(1);
        const num = parseInt(hex, 16);
        let r = (num >> 16) + factor * 10;
        let g = ((num >> 8) & 0x00ff) + factor * 10;
        let b = (num & 0x0000ff) + factor * 10;
        r = Math.min(255, r);
        g = Math.min(255, g);
        b = Math.min(255, b);
        return (
            "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
        );
    };

    const handleDragStart = (event, elementId) => {
        event.dataTransfer.setData("text/plain", elementId);
        setDraggedItem(elementId);
        event.target.style.opacity = '0.5';
    };

    return (
        <div className="instrument-list">
            <div className="podium-hoogte">
    {/* Circles voor podiumhoogte */}
    <div className="DifPodHigh">
        <div className="circle red-circle" style={{ backgroundColor: "rgba(255, 0, 0, 0.5)" }} onClick={() => setSelectedColor("#FF0000")}></div>
        <p>100cm</p>
    </div>
    <div className="DifPodHigh">
        <div className="circle green-circle" style={{ backgroundColor: "rgba(0, 255, 0, 0.5)" }} onClick={() => setSelectedColor("#00FF00")}></div>
        <p>80cm</p>
    </div>
    <div className="DifPodHigh">
        <div className="circle orange-circle" style={{ backgroundColor: "rgba(255, 165, 0, 0.5)" }} onClick={() => setSelectedColor("#FFA500")}></div>
        <p>60cm</p>
    </div>
    <div className="DifPodHigh">
        <div className="circle yellow-circle" style={{ backgroundColor: "rgba(255, 255, 0, 0.5)" }} onClick={() => setSelectedColor("#FFFF00")}></div>
        <p>40cm</p>
    </div>
    <div className="DifPodHigh">
        <div className="circle blue-circle" style={{ backgroundColor: "rgba(0, 0, 255, 0.5)" }} onClick={() => setSelectedColor("#0000FF")}></div>
        <p>20cm</p>
    </div>
</div>

            <div className="InstrumentWrapper">
                {/* Lijsten van instrumenten */}
                {renderInstrumentList(data.strijkers, "Strijkers")}
                {renderInstrumentList(data.houtblazers, "Houtblazers")}
                {renderInstrumentList(data.koperblazers, "Koperblazers")}
                {renderInstrumentList(data.diverses, "Diverses")}
            </div>
            <div className="category-totals">
                {/* Totalen per categorie */}
                <p>Strijkers Total: {totals.strijkers}</p>
                <p>Houtblazers Total: {totals.houtblazers}</p>
                <p>Koperblazers Total: {totals.koperblazers}</p>
                <p>Diverses Total: {totals.diverses}</p>
            </div>
            <div className="legende">
                <h4>Bezettingen</h4>
                <div className="instruments">{generateBezettingen()}</div>
            </div>
        </div>
    );
};

export default Instruments;

