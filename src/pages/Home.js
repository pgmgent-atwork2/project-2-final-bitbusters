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
            <div className="inventaris">
                <h4>Inventaris</h4>
                <div className="inventaris-items">
                    <div className="item">
                        <p>Strijkers: </p>
                        <p className="Strijkers">
                            <span id="strijkers">9</span>/10
                        </p>
                    </div>
                    <div className="item">
                        <p>Strijkers: </p>
                        <p className="Strijkers">
                            <span id="strijkers">9</span>/10
                        </p>
                    </div>
                    <div className="item">
                        <p>Strijkers: </p>
                        <p className="Strijkers">
                            <span id="strijkers">9</span>/10
                        </p>
                    </div>
                    <div className="item">
                        <p>Strijkers: </p>
                        <p className="Strijkers">
                            <span id="strijkers">9</span>/10
                        </p>
                    </div>
                </div>
                <Instruments></Instruments>
            </div>
        </div>
    );
}
