import React, { useState, useEffect } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import './signIn.css';
import { getUserData } from '../../services/repository';
import CurrencyUIInterface from '../currencyExchange/currency';

export default function SignIn() {
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState(null);

    const logIn = useGoogleLogin({
        onSuccess: (response) => setUser(response),
        onError: (error) => console.log(error)
    });

    // useEffect(
    //     () => {
    //         if (user) {
    //             axios
    //                 .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`, {
    //                     headers: {
    //                         Authorization: `Bearer ${user.access_token}`,
    //                         Accept: 'application/json'
    //                     }
    //                 })
    //                 .then((res) => {
    //                     setProfile(res.data);
    //                 })
    //                 .catch((err) => console.log(err));
    //         }
    //     }, [user]
    // );

    useEffect(
        () => {
            const userData = async () => {
                const apiResponse = await getUserData(user.access_token);
                if(apiResponse !== null){
                    setProfile(apiResponse);
                }
            }

            userData();
        },
    [user]);

    if (!profile) {
        return (
            <div className='App-header'>
                <button className='signIn-button' onClick={logIn}>
                    SignIn with google
                </button>
            </div>
        );
    }

    return (
        <CurrencyUIInterface profile={profile} setProfile={setProfile}/>
    );
}