import React, {useState} from "react";
import './App.css';
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import {navItems} from "./utils/constants";

const App = () => {
    const [currentPage, setCurrentPage] = useState(navItems[0])

        return (
            <div className="container-fluid">
                <Header changePage={setCurrentPage} currentPage={currentPage}/>
                <Main currentPage={currentPage}/>
                <Footer currentPage={currentPage}/>
            </div>
        );
}

export default App;
