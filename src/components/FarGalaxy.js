import React, {useState, useEffect} from 'react';
import {base_url} from '../utils/constants';
import styles from '../css/farGalaxy.module.css';

const FarGalaxy = (props) => {
    const [openingCrawl, setOpeningCrawl] = useState('');

    useEffect(() => {
        const openingCrawlFromSession = sessionStorage.getItem('opening_crawl');
        if (openingCrawlFromSession) {
            setOpeningCrawl(openingCrawlFromSession);
        } else {
            const film = Math.floor(Math.random() * 6) + 1;
            fetch(`${base_url}/v1/films/${film}`)
                .then((response) => response.json())
                .then((data) => {
                    sessionStorage.setItem('opening_crawl', data.opening_crawl);
                    setOpeningCrawl(data.opening_crawl);
                });
        }
    }, []);
    return <p className={styles.farGalaxy}>{openingCrawl}</p>;
};
export default FarGalaxy;

