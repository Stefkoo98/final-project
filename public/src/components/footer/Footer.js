import React from 'react';
import { Link } from 'react-router-dom';
import LogoWhite from '../../assets/logo_white.svg';
import './Footer.css'

export function Footer() {
    return (
        <footer className="footer">

            <a href="#" className="logo">
                <img src={LogoWhite} alt="Logo" />
            </a>
            <div className="links">
                <ul className="inline-list">
                    <li><Link to="/breakfast">Breakfast</Link></li>
                    <li><Link to="/brunch">Brunch</Link></li>
                    <li><Link to="/lunch">Lunch</Link></li>
                    <li><Link to="/dinner">Dinner</Link></li>
                </ul>
            </div>
            <div className="copyright">
                Baby's Food Place copyright © 2021
            </div>

        </footer>
    );
}