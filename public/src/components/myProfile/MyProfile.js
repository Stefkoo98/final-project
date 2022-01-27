import React, { useState, useEffect } from 'react';
import Avatar from '../../assets/batman-av.jpg'
import './MyProfile.css'


export function MyProfile() {

    let userData = {
        first_name: '',
        last_name: '',
        email: '',
        birthday: '',
    };

    const userId = localStorage.getItem('id');
    const token = localStorage.getItem('jwt');

    const [account, setAccount] = useState(userData);
    const [avatar, setAvatar] = useState();

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
            setAccount(userDataResult);
        } catch (err) {
            console.log(err);
        }
    };

    const onFileUpload = async (event) => {
        setAvatar(event.target.files[0])
        const formData = new FormData();
        formData.append(
            "document",
            event.target.files[0],
            event.target.files[0].name
        );

        formData.append("userUId", userId);
        try {
            await fetch(
                `http://localhost:8000/api/v1/storage/upload`,
                {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    },
                    body: formData
                }
            );
        } catch (err) {
            console.log(err);
        }
    }


    const updateUserData = (e) => {
        setAccount({ ...account, [e.target.name]: e.target.value });
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
                    body: JSON.stringify(account)
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
                    <img src={avatar ? URL.createObjectURL(avatar) : Avatar} alt='batman-avatar'></img>
                    <label className='change-avatar-button'>
                        <input type='file' onChange={onFileUpload} />
                        Change Avatar
                    </label>
                </div>
                <div className='sign-up-save-form'>
                    <form>
                        <div >
                            <label>
                                First Name
                            </label>
                            <input type="text" name='first_name' placeholder='John' value={account.first_name} onChange={updateUserData} />
                            <label>
                                Email
                            </label>
                            <input type='email' name='email' placeholder='john@smith.com' value={account.email} onChange={updateUserData} />
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
                            <input type='text' name='last_name' placeholder='Smith' value={account.last_name} onChange={updateUserData} />
                            <label>
                                Birthday
                            </label>
                            <input type="date" name='birthday' placeholder='28-11-1998' value={account.birthday} onChange={updateUserData} />
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