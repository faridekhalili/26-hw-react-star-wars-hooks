import React, {useEffect, useState} from 'react';
import {base_url} from "../utils/constants";
import Loader from "./Loader";
import {checkExpirationDate} from "../utils/sevice";

const AboutMe = () => {
    const [hero, setHero] = useState()
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
            const heroFromLs = JSON.parse(localStorage.getItem("hero"));
            if (heroFromLs && checkExpirationDate(heroFromLs.time)) {
                setHero(heroFromLs.payload);
                setIsLoading(false)
            } else {
                fetch(`${base_url}/v1/peoples/1`)
                    .then(response => response.json())
                    .then(data => {
                            const heroModel = {
                                name: data.name,
                                birthYear: data.birth_year,
                                eyeColor: data.eye_color,
                                hairColor: data.hair_color,
                                gender: data.gender,
                                imgUrl: `${base_url}/${data.image}`
                            };
                            setHero(heroModel)
                            const info = {
                                payload: heroModel,
                                time: new Date().toString()
                            }
                            localStorage.setItem('hero', JSON.stringify(info));
                            setIsLoading(false);
                        }
                    )
            }
            return () => console.log("About me unmount")
        }, []
    )
    if (isLoading) {
        return (
            <Loader/>
        )
    } else {
        return (
            <>
                {(hero) &&
                    <div className='meinContainer aboutMe'>
                        <h2 className="aboutMe-title">{hero.name}</h2>
                        <div className="cardContainer">
                            <div className="cardPhoto">
                                <img src={hero.imgUrl} alt='sw hero'/>
                            </div>
                            <div className="cardInfo">
                                <p className="cardText">Birth year:
                                    <span>{hero.birthYear}</span>
                                </p>
                                <p className="cardText">Eye color:
                                    <span>{hero.eyeColor}</span>
                                </p>
                                <p className="cardText">Hair color:
                                    <span>{hero.hairColor}</span>
                                </p>
                                <p className="cardText">Gender:
                                    <span>{hero.gender}</span>
                                </p>
                            </div>
                        </div>
                    </div>
                }
            </>
        )
    }
}

export default AboutMe;