import React from 'react';
import "../scss/WebsiteHeader.scss"
const WebsiteHeader: React.FC = () => {
    return (
        <header className="website-header">
            <div className="logo">
                {/* Hier könnte das Logo oder der Titel der Website stehen */}
                Website Name
            </div>
            <nav className="navigation">
                <ul>
                    <li><a href="/">Home</a></li>
                    <li><a href="/about">About</a></li>
                    <li><a href="/services">Services</a></li>
                    <li><a href="/contact">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default WebsiteHeader;
