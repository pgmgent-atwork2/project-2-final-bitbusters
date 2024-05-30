import React from "react";

export default function Navigation() {
    return (
        <nav>
            <div className="nav-content">
                <div className="logo">
                    <div className="logo-color"></div>
                    <h1>
                        De <br></br> Bijloke
                    </h1>
                </div>
                <ul className="nav-items">
                    <li className="nav-item">
                        <a href="/">Home</a>
                    </li>
                    <li className="nav-item">
                        <a href="/steps">Steps</a>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
