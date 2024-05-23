import React from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_POSTS } from "../graphql/queries";

const Instruments = () => {
    const { loading, error, data } = useQuery(GET_ALL_POSTS);

    console.log(data);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error.message}</p>;

    return (
        <div>
            <h2>Diverses</h2>
            <ul>
                {data.diverses.map(({ id, instrument, amount }) => (
                    <li key={id}>
                        {instrument} - {amount}
                    </li>
                ))}
            </ul>

            <h2>Strijkers</h2>
            <ul>
                {data.strijkers.map(({ id, instrument, amount }) => (
                    <li key={id}>
                        {instrument} - {amount}
                    </li>
                ))}
            </ul>

            <h2>Houtblazers</h2>
            <ul>
                {data.houtblazers.map(({ id, instrument, amount }) => (
                    <li key={id}>
                        {instrument} - {amount}
                    </li>
                ))}
            </ul>

            <h2>Koperblazers</h2>
            <ul>
                {data.koperblazers.map(({ id, instrument, amount }) => (
                    <li key={id}>
                        {instrument} - {amount}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Instruments;
