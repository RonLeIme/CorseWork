import React, {useEffect, useState} from "react";
import * as api from "../api/Api.js";
import "../Styles/MainPage.css";
import {Link} from "react-router-dom";
import "../Styles/ScrollBar.css";

//import react media request
function MainPage() {
    const [data, setData] = useState(null);

    useEffect(() => {
        api.schedule()
            .then((response) => {
                response.json().then((data) => {
                    console.log(data);
                    setData(data["schedule"]);
                });
            })
            .catch(() => {
            });
    }, []);

    return (
        <div className="MainPage">
            <div className="MovieList">
                {data &&
                    data.map((item) => (
                        <div className="MovieItem" key={item.id}>
                            <Link to={`/tickets/${item.id}`} className="MovieLink">
                                <div className="MovieItemContent">
                                    <img src={item.img} alt={item.title} className="poster" />
                                    <div className="TitleOverlay">
                                        <div className="TitleText">{item.title}</div>
                                    </div>
                                </div>
                                <div className="MovieInfo">
                                    <p>Дата: {item.date}<br/>Час: {item.time}<br/>Ціна: {item['price']} грн <br/>Рейтинг: {item['imdb_rating']}
                                    </p>
                                </div>
                            </Link>
                        </div>
                    ))}
            </div>
        </div>
    );
}

export default MainPage;
