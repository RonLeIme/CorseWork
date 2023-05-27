import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import * as api from "../api/Api";
import "../Styles/BuyTicker.css";

function Tickets() {
    const {id} = useParams();
    const [data, setData] = useState(null);
    let selected = 0;
    const navigator = useNavigate();

    useEffect(() => {
        api
            .schedule()
            .then((response) => response.json())
            .then((data) => {
                let movie = data["schedule"].find((item) => item.id === parseInt(id));
                setData(movie);
            })
            .catch((error) => {
                console.error("Error fetching schedule:", error);
            });
    }, [id]);

    const handleSeatClick = (seat) => {
        console.log("Seat clicked:", seat);
        const seatElement = document.getElementById(seat.toString());
        if (seatElement) {
            if (selected === -1) {
                selected = seat;
                seatElement.classList.add("selected");
                seatElement.classList.remove("disabled");
            } else if (selected === seat) {
                selected = -1;
                seatElement.classList.remove("selected");
                seatElement.classList.add("disabled");
            } else {
                const selectedElement = document.getElementById(selected);
                if (selectedElement) {
                    selectedElement.classList.remove("selected");
                    selectedElement.classList.add("disabled");
                }
                selected = seat;
                seatElement.classList.add("selected");
                seatElement.classList.remove("disabled");
            }
        }
    };

    const handleBuyClick = () => {
        // Get user name and token from cookies
        const Cookies = require('js-cookie');
        const username = Cookies.get('username');
        const token = Cookies.get('token');

        if (username === undefined || token === undefined) {
            navigator('/login'); // navigate to the login page
        }
        api.buy_ticket(username, token, id, selected)
            .then((response) => {
                if (response.ok) {
                    response.json().then((data) => {
                        console.log(data);
                        navigator('/profile'); // navigate to the profile page
                    });
                } else {
                    navigator('/login'); // navigate to the login page
                }
            });
    };


    return (
        <>
            {data ? (
                <div className="container">
                    <div className="ItemContent">
                        <img src={data.img} alt={data.title}/>
                        <div className="Overlay">
                            <div className="TitleText">{data.title}</div>
                        </div>
                    </div>
                    <div className="Info">
                        <p>Дата: {data.date}<br/>Час: {data.time}<br/>Ціна: {data.price} грн <br/>Рейтинг: {data.imdb_rating} </p>
                    </div>
                    <div className="seats">
                        <p className="seats">Вільні місця</p>
                    </div>
                    <div className="seats">
                        {data.seats.map((seat) => (
                            <button
                                key={seat}
                                id={seat}
                                onClick={() => handleSeatClick(seat)}
                                className={selected === seat ? "selected" : "disabled"}
                            >
                                {seat}
                            </button>
                        ))}
                    </div>
                    <div>
                        <button
                            className="BuyButton"
                            onClick={() => handleBuyClick()}
                        >Купити
                        </button>
                    </div>

                </div>
            ) : (
                <div>Загрузка...</div>
            )}
        </>
    );
}

export default Tickets;
