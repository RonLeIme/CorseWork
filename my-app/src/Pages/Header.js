import React from "react";
import "../Styles/Header.css";
import Register from "./Register";
import {Link} from 'react-router-dom';


function Header({loggedIn, logOut}) {
    return (
        <div className="HeaderStyle">
            <Link to={"/"} className="Links">
                <button className="Buttons">Розклад сеансів</button>
            </Link>
            {loggedIn ? (
            <Link to={"/profile"} className="Links">
                <button className="Buttons">Профіль</button>
            </Link>
            ) : (
            <Link to={"/login"} className="Links">
                <button className="Buttons">Вхід</button>
            </Link>
            )}
            {loggedIn ? (
            <Link to={"/"} className="Links">
                <button className="Buttons"
                onClick={() => {
                    logOut();
                }
                }
                >Вихід</button>
            </Link>
            ) : (
            <Link to={"/register"} className="Links">
                <button className="Buttons">Реєстрація</button>
            </Link>
            )
            }
        </div>
    );
}


export default Header;