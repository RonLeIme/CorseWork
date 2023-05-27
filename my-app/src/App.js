import React, {useEffect, useState} from "react";
import Cookies from 'js-cookie';
import {Route, Routes, useNavigate} from 'react-router-dom';
import MainPage from './Pages/MainPage.js';
import Login from './Pages/Login.js';
import Register from "./Pages/Register";
import Header from "./Pages/Header";
import Tickets from "./Pages/BuyTicker";
import Profile from "./Pages/Profile";
import * as api from "./api/Api";


function App() {
    const [loggedIn, setLoggedIn] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    //check if user is logged in
    useEffect(() => {
        if (Cookies.get('username') !== undefined && Cookies.get('token') !== undefined) {
            setLoggedIn(true);
        }
    }, []);
    const logOut = () => {
        setLoggedIn(false);
        Cookies.remove('username');
        Cookies.remove('token');
        window.location.reload();
    }

    const InputUsername = (value)=> {
        setUsername(value);
        console.log(username);
    }

    const InputPassword = (value) => {
        setPassword(value);
        console.log(password);
    }

    const navigator = useNavigate();

    const login = () => {
        document.getElementById("Message").innerHTML = "";
        setIsLoading(true);
        api.login(username, password)
            .then((response) => {
                response.json().then((data) => {
                    setIsLoading(false);
                    console.log(data);
                    if (response.ok) {
                        setLoggedIn(true);
                        document.cookie = `username=${username}; path=/`;
                        document.cookie = `token=${data.token}; path=/`;
                        navigator('/');
                    } else {
                        document.getElementById("Message").innerHTML = data.message;
                    }
                });
            })
            .catch(() => {
            });
    }

    const register = () => {
        document.getElementById("Message").innerHTML = "";
        setIsLoading(true);
        api.register(username, password)
            .then((response) => {
                response.json().then((data) => {
                    setIsLoading(false);
                    console.log(data);
                    if (response.ok) {
                        setLoggedIn(true);
                        document.cookie = `username=${username}; path=/`;
                        document.cookie = `token=${data.token}; path=/`;
                        navigator('/');
                    } else {
                        document.getElementById("Message").innerHTML = data.message;
                    }
                });
            })
            .catch(() => {
            });
    }

    return (
        <div className="App">
            <Header loggedIn={loggedIn} logOut={logOut}/>
            <Routes>
                <Route path="/" element={<MainPage/>}/>
                <Route path="/login"
                       element={<Login
                           log={login}
                           InputPassword={InputPassword}
                           InputUsername={InputUsername}
                           isLoading={isLoading}/>}/>
                <Route path="/register" element={<Register
                    register={register}
                    InputPassword={InputPassword}
                    InputUsername={InputUsername}
                    isLoading={isLoading}
                />}/>
                <Route path="/tickets/:id" element={<Tickets/>}/>
                <Route path="/profile" element={<Profile/>}/>
                <Route path="*" element={<h1>404</h1>}/>
            </Routes>
        </div>
    );
}

export default App;
