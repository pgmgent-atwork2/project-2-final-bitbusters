import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "../graphql/queries";

const Instruments = () => {
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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data) return <p>No data available</p>;

    const instrumentColors = {
        strijkers: "#FFC0CB",
        houtblazers: "#87CEEB",
        koperblazers: "#FFD700",
        diverses: "#90EE90",
    };

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
                                    handleIncrement(
                                        id,
                                        amount,
                                        section.toLowerCase()
                                    )
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
                                        >
                                            Added {idx + 1}
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

    const calculateTotalAmount = (instruments) => {
        return instruments.reduce((total, item) => total + item.amount, 0);
    };

    return (
        <div className="instrument-list">
            <div className="category-totals">
                <p>Strijkers Total: {totals.strijkers}</p>
                <p>Houtblazers Total: {totals.houtblazers}</p>
                <p>Koperblazers Total: {totals.koperblazers}</p>
                <p>Diverses Total: {totals.diverses}</p>
            </div>
            {renderInstrumentList(data.strijkers, "Strijkers")}
            {renderInstrumentList(data.houtblazers, "Houtblazers")}
            {renderInstrumentList(data.koperblazers, "Koperblazers")}
            {renderInstrumentList(data.diverses, "Diverses")}
            <div className="legende">
                <h4>Bezettingen</h4>
                <div className="instruments">
                    0.0.0.0.0|0.0.0.0|0.0.0.0|0.0.|0.0
                </div>
                <div className="podium-hoogte">
                    <div className="circle red-circle"></div>
                    <p>100cm</p>
                    <div className="circle green-circle"></div>
                    <p>80cm</p>
                    <div className="circle orange-circle"></div>
                    <p>60cm</p>
                    <div className="circle yellow-circle"></div>
                    <p>40cm</p>
                    <div className="circle blue-circle"></div>
                    <p>20cm</p>
                </div>
            </div>
        </div>
    );
};

export default Instruments;
