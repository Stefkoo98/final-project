import React from 'react';
import '../login/Login.css';
import { useState } from 'react';

export function Login() {
    const loginDataInit = {
        email: '',
        password: '',
    };
    const [loginData, setLoginData] = useState(loginDataInit);

    const loginFieldUpdate = (e) => {
        setLoginData({ ...loginData, [e.target.name]: e.target.value });
    };

    const loginBtn = async (e) => {
        e.preventDefault()
        try {
            let res = await fetch(
                'http://localhost:8000/api/v1/auth/login',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(loginData)
                }
            );
            let response = await res.text();
            let result = JSON.parse(response);
            localStorage.setItem('jwt', result.token);
            localStorage.setItem('id', result.id);
            window.location.href = "/";
        } catch (err) {
            console.error(err);
        }
    };
    return (
        <div className="login-container">
            <div className="login-title">
                <h1>Log In</h1>
                <div className="login-line"></div>
            </div>
            <div className="inside-login">
                <div className="welcome-to-babys-title">
                    <h1>Welcome to <span>Baby's</span></h1>
                    <p>All the Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est.</p>
                </div>
                <div className="login-form">
                    <form onSubmit={loginBtn} >
                        <label>
                            Email
                        </label>
                        <input type="text" name="email" placeholder='user@domain.com' value={loginData.email} onChange={loginFieldUpdate} />
                        <label>
                            Password
                        </label>
                        <input type="password" name="password" placeholder='*******' value={loginData.password} onChange={loginFieldUpdate} />
                        <button>Log In</button>
                    </form>
                </div>
            </div>
        </div>

    )
}