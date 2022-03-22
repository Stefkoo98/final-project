import React from 'react';
import './CreateAccount.css'
import { useState } from 'react';

export function CreateAccount() {
    const createAccountDataInit = {
        first_name: '',
        last_name: '',
        email: '',
        birthday: '',
        password: '',
        repeat_password: ''
    };
    const [createAccountData, setCreateAccountData] = useState(createAccountDataInit);

    const createAccountFieldUpdate = (e) => {
        setCreateAccountData({ ...createAccountData, [e.target.name]: e.target.value });
    };

    const createAccountBtn = async () => {
        try {
            let res = await fetch(
                'http://localhost:8000/api/v1/auth/create-account',
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(createAccountData)
                }
            );
            let token = await res.text();
            localStorage.setItem('jwt', token);
            window.location.href = "/login";
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    };
    return (
        <div className='create-acc-container'>
            <div className='create-account-title'>
                <h1>Create Account</h1>
                <div className='create-acc-line'></div>
            </div>
            <div className='inside-create-acc'>
                <div className='create-your-acc-title'>
                    <h1>Create your <span>account</span></h1>
                    <p>All the Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat esse cillum dolore eu fugiat. velit esse.</p>
                </div>
                <div className='sign-up-form'>
                    <form>
                        <div >
                            <label>
                                First Name
                            </label>
                            <input type="text" name='first_name' placeholder='First Name' onChange={createAccountFieldUpdate} defaultValue={createAccountData.first_name} />
                            <label>
                                Email
                            </label>
                            <input type='email' name='email' placeholder='Email' onChange={createAccountFieldUpdate} defaultValue={createAccountData.email} />
                            <label>
                                Password
                            </label>
                            <input type='password' name='password' placeholder='Enter Password' onChange={createAccountFieldUpdate} defaultValue={createAccountData.password} />
                            <button onClick={createAccountBtn}>Create Account</button>
                        </div>
                        <div>
                            <label>
                                Last Name
                            </label>
                            <input type='text' name='last_name' placeholder='Last Name' onChange={createAccountFieldUpdate} defaultValue={createAccountData.last_name} />
                            <label>
                                Birthday
                            </label>
                            <input type="date" name='birthday' placeholder='28-11-1998' onChange={createAccountFieldUpdate} defaultValue={createAccountData.birthday} />
                            <label>
                                Repeat Password
                            </label>
                            <input type='password' name='repeat_password' placeholder='Enter Password' onChange={createAccountFieldUpdate} defaultValue={createAccountData.repeat_password} />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}