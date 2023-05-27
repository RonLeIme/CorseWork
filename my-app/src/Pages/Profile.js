import React, { useState, useEffect } from "react";
import "../Styles/Profile.css";
import * as api from "../api/Api.js";
import { useNavigate } from "react-router-dom";

function Profile() {
    const [data, setData] = useState(null);
    const Cookies = require('js-cookie');
    const username = Cookies.get('username');
    const token = Cookies.get('token');
    const navigator = useNavigate();

    useEffect(() => {
        if (username === undefined || token === undefined) {
            navigator('/login');
        } else {
            api.get_tickets(username, token)
                .then((response) => {
                    if (response.ok) {
                        response.json().then((data) => {
                            console.log(data);
                            setData(data.tickets);
                        });
                    } else {
                        navigator('/login');
                    }
                })
                .catch((error) => {});
        }
    }, []);

    return (
        <div className="PDefault">
            <>
                {data && (
                    <div className="TicketContainer">
                        <div className="YourTickets">
                            <h2>
                                {data.length === 0 ? "Ви ще не купили жодного квитка" : "Ваші квитки"}
                            </h2>
                        </div>
                        <div className="Tickets">
                            {data.map((ticket) => (
                                <div key={ticket.id} className="Ticket">
                                    <div className="TicketInfo">
                                        <h3>{ticket.title}</h3>
                                        <p>Дата: {ticket.date}</p>
                                        <p>Час проведення: {ticket.time}</p>
                                        <p>Зала № {ticket.hall}</p>
                                        <p>Місце № {ticket.seat}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </>
        </div>
    );
}

export default Profile;
