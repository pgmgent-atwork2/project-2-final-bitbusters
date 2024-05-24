import React from "react";
import Instruments from "../components/Instruments";

export default function Home() {
    return (
        <div className="home-container">
            <div className="left">
                <div className="information">
                    <input placeholder="Name" />
                    <br></br>
                    <input placeholder="Date" />
                </div>
                <div className="gridlock">
                    <div className="placement">
                        <img
                            src="img/concertplan.png"
                            title="Concert plan"
                            alt="Concert plan"
                        />
                        <div className="overlap-div">
                            {[...Array(900)].map((_, index) => (
                                <div key={index} className="grid-item"></div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div className="inventaris">
                <Instruments></Instruments>
            </div>
        </div>
    );
}
