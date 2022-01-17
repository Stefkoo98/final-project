import React, { useState, useEffect } from 'react';
import LogoColor from '../../assets/logo_color.svg';
import { Link } from 'react-router-dom';
import './Header.css'

export function Header() {
    const [loggedIn, setLoggedIn] = useState(false)


    const validate = async () => {
        const token = localStorage.getItem("jwt")
        console.log(token)
        const res = await fetch("/api/v1/auth/validate", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`
            }
        })

        if (res.status === 200) {
            setLoggedIn(true)

        }
    }

    const logOut = () => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('id');
        window.location.href = '/';
    }

    useEffect(() => {
        console.log("use effect")
        validate()
    }, [])

    return (
        <nav className="navbar wrapper">
            <Link to="/">
                <img src={LogoColor} alt="Logo" />
            </Link>
            <div className="links">
                <ul className="inline-list">
                    <li><Link to="/breakfast">Breakfast</Link></li>
                    <li><Link to="/brunch">Brunch</Link></li>
                    <li><Link to="/lunch">Lunch</Link></li>
                    <li><Link to="/dinner">Dinner</Link></li>
                </ul>
            </div>
            {!loggedIn ? <>
                <div className="buttons">
                    <a className="login-button"><Link to="/login">Log In</Link></a>
                    <span>or</span>
                    <a className="create-account-button"><Link to="/create-account">Create Account</Link></a>
                </div>
            </> : <>
                <div className="logged-in-buttons">
                    <ul>
                        <li><Link to="/my-recipes" style={{ color: "#96BB36" }}>My Recipes</Link></li>
                        <li><Link to="/my-profile" style={{ color: "#F0972A" }}>My profile</Link></li>
                        <li><Link to="" style={{ color: "#B5B5B4" }} onClick={logOut}>Log Out</Link></li>
                    </ul>
                </div>
            </>}
        </nav>
    );
}   