import React, { useEffect, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "../graphql/queries";

const Instruments = () => {
    const { loading, error, data } = useQuery(GET_ALL_POSTS);
    const [counts, setCounts] = useState({});

    useEffect(() => {
        const titles = document.getElementsByClassName("collapsible-title");
        let i;

        const handleClick = function () {
            var content = this.nextElementSibling;
            if (content.style.display === "block") {
                content.style.display = "none";
            } else {
                content.style.display = "block";
            }
        };

        for (i = 0; i < titles.length; i++) {
            titles[i].addEventListener("click", handleClick);
        }
        return () => {
            for (i = 0; i < titles.length; i++) {
                titles[i].removeEventListener("click", handleClick);
            }
        };
    }, [data]);

    useEffect(() => {
        if (data) {
            const initialCounts = {};
            ["strijkers", "houtblazers", "koperblazers", "diverses"].forEach(
                (section) => {
                    data[section].forEach((item) => {
                        initialCounts[item.id] = 0;
                    });
                }
            );
            setCounts(initialCounts);
        }
    }, [data]);

    const handleIncrement = (id, max) => {
        setCounts((prevCounts) => ({
            ...prevCounts,
            [id]: prevCounts[id] < max ? prevCounts[id] + 1 : max,
        }));
    };

    const handleDecrement = (id) => {
        setCounts((prevCounts) => ({
            ...prevCounts,
            [id]: prevCounts[id] > 0 ? prevCounts[id] - 1 : 0,
        }));
    };

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;
    if (!data) return <p>No data available</p>;

    const renderInstrumentList = (instruments, section) => (
        <div className="instrument-card" key={section}>
            <div className="collapsible-title">{section}</div>
            <ul className="content" style={{ display: "none" }}>
                {instruments.map(({ id, instrument, amount }) => (
                    <li key={id}>
                        {instrument} - {counts[id]} / {amount}
                        <button onClick={() => handleIncrement(id, amount)}>
                            +
                        </button>
                        <button onClick={() => handleDecrement(id)}>-</button>
                        <div className="display-total">
                            {Array.from({ length: counts[id] }).map(
                                (_, index) => (
                                    <div key={index} className="added-div">
                                        Added {index + 1}
                                    </div>
                                )
                            )}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );

    return (
        <div className="instrument-list">
            {renderInstrumentList(data.strijkers, "Strijkers")}
            {renderInstrumentList(data.houtblazers, "Houtblazers")}
            {renderInstrumentList(data.koperblazers, "Koperblazers")}
            {renderInstrumentList(data.diverses, "Diverses")}
        </div>
    );
};

export default Instruments;
