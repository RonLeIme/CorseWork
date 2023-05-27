import React, {useState} from "react";
import Header from "./Header";
import * as api from "../api/Api.js";
import "../Styles/Register.css";
import {Link} from "react-router-dom";
import Loader from "./loader";

function Login(
    {
        InputUsername,
        InputPassword,
        log,
        isLoading,
    }
) {

    return (
        <div>
            <div className="Default">
                <div className="RegStyle">
                    <h1>Вхід</h1>
                    <input type="text" placeholder="Пошта" onChange={(e) => InputUsername(e.target.value)}/>
                    <input type="password" placeholder="Пароль" onChange={(e) => InputPassword(e.target.value)}/>
                    <div>
                        <button onClick={log}>
                            Вхід у кабінет
                        </button>
                        <button className="LogStyle">
                            <Link to={"/register"} className="ColorLink">Реєстрація</Link>
                        </button>
                    </div>
                    <p
                        className={"Message"}
                        id={"Message"}
                    ></p>
                    {isLoading && <Loader/>}
                </div>
            </div>
        </div>
    );
}

export default Login;