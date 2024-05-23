import React from "react";

export default function Navigation() {
    return (
        <nav>
            <div className="nav-content">
                <h1>De Bijloke</h1>
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
