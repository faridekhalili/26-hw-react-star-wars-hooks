import React, {useEffect, useState} from 'react';
import {base_url} from "../utils/constants";
import Button from "./Button";
import Loader from "./Loader";
import Select from "./Select";
import {checkExpirationDate} from "../utils/sevice"

const Contact = () => {
    const [planets, setPlanets] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const planetsFromLs = JSON.parse(localStorage.getItem("planets"));
        if (planetsFromLs && checkExpirationDate(planetsFromLs.time)) {
            setPlanets(planetsFromLs.payload);
            setIsLoading(false);
        } else {
            fetch(`${base_url}/v1/planets`)
                .then(response => response.json())
                .then(data => data.map(d => d.name))
                .then(planetNames => {
                    setPlanets(planetNames);
                    setIsLoading(false);
                    const info = {
                        payload: planetNames,
                        time: new Date().toString()
                    };
                    localStorage.setItem('planets', JSON.stringify(info));
                })
                .catch(error => console.error(error));
        }
    }, []);

    if (isLoading) {
        return (
            <Loader/>
        )
    } else {
        return (
            <div className="form-container">
                <form className="">
                    <label htmlFor="fname">First Name</label>
                    <input type="text" id="fname" name="firstname" placeholder="Your name.."/>

                    <label htmlFor="lname">Last Name</label>
                    <input type="text" id="lname" name="lastname" placeholder="Your last name.."/>

                    <label htmlFor="planet">Planet</label>
                    <Select planets={planets}/>
                    <label htmlFor="subject">Subject</label>
                    <textarea id="subject" name="subject" placeholder="Write something.."
                              style={{height: "200px"}}></textarea>
                    <Button/>
                </form>
            </div>
        );
    }
};

export default Contact;