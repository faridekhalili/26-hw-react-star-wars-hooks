import React, {useState} from 'react';
import Hero from "./Hero";
import DreamTeam from "./DreamTeam";
import FarGalaxy from "./FarGalaxy";
import Loader from "./Loader";
import styles from "../css/clearfix.module.css"

const Home = () => {
    const [isLoading, setIsLoading] = useState(false);

    const changeLoading = () => {
        setIsLoading(!isLoading);
    };

    return (
        <main className={styles.clearfix}>
            {isLoading ? <Loader /> : null}
            <Hero />
            <DreamTeam />
            <FarGalaxy changeLoading={changeLoading} />
        </main>
    );
}

export default Home;