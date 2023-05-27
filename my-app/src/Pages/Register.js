import React from "react";
import "../Styles/Register.css";
import Loader from "./loader";

function Login(
    {
        InputUsername,
        InputPassword,
        register,
        isLoading,
    }
) {

    return (
        <div>
            <div className="Default">
                <div className="RegStyle">
                    <h1>Реєстрація</h1>
                    <input type="text" placeholder="Пошта" onChange={(e) => InputUsername(e.target.value)}/>
                    <input type="password" placeholder="Пароль" onChange={(e) => InputPassword(e.target.value)}/>
                    <div>
                        <button onClick={register}>
                            Зареєструватися
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