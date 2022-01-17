import React, { useState, useEffect } from 'react';
import './MyProfile.css'
import Avatar from '../../assets/batman-av.jpg'


export function MyProfile() {

    let userData = {
        first_name: '',
        last_name: '',
        email: '',
        birthday: '',
        avatarPath: ''
    };

    const userId = localStorage.getItem('id');
    const token = localStorage.getItem('jwt');

    const [mounted, setMounted] = useState(userData);

    const getUserData = async () => {
        try {
            let res = await fetch(
                `http://localhost:8000/api/v1/auth/${userId}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                }
            );
            let result = await res.text();
            const userDataResult = JSON.parse(result);
            setMounted(userDataResult);
        } catch (err) {
            console.log(err);
        }
    };

    const updateUserData = (e) => {
        setMounted({ ...mounted, [e.target.name]: e.target.value });
        console.log(e.target.value)
    };


    const updateUser = async () => {
        try {
            let res = await fetch(
                `http://localhost:8000/api/v1/auth/${userId}`,
                {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify(mounted)
                }
            );
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getUserData()
    }, []);


    return (
        <div className='my-profile-container'>
            <div className='my-profile-title'>
                <h1>My Profile</h1>
                <div className='my-profile-line'></div>
            </div>
            <div className='inside-my-profile'>
                <div className='left'>
                    <img src={Avatar} alt='batman-avatar'></img>
                    <button className='change-avatar-button'>Change Avatar</button>
                </div>
                <div className='sign-up-save-form'>
                    <form>
                        <div >
                            <label>
                                First Name
                            </label>
                            <input type="text" name='first_name' placeholder='John' value={mounted.first_name} onChange={updateUserData} />
                            <label>
                                Email
                            </label>
                            <input type='email' name='email' placeholder='john@smith.com' value={mounted.email} onChange={updateUserData} />
                            <label>
                                Password
                            </label>
                            <input type='password' name='password' placeholder='******' />
                            <button onClick={updateUser}>Save</button>
                        </div>
                        <div>
                            <label>
                                Last Name
                            </label>
                            <input type='text' name='last_name' placeholder='Smith' value={mounted.last_name} onChange={updateUserData} />
                            <label>
                                Birthday
                            </label>
                            <input type="date" name='birthday' placeholder='28-11-1998' value={mounted.birthday} onChange={updateUserData} />
                            <label>
                                Repeat Password
                            </label>
                            <input type='password' name='repeat_password' placeholder='******' />
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}