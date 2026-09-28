import React, { useState } from "react";
import Search from "./components/search";

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return ( 
        <main>
            <div className="pattern">
                <div className="wrapper"></div>
                <header>
                    <img src="/hero.png" alt="hero" />
                    <h1>Find <span className="text-gradient">movies</span> you enjoy without the hassle</h1>
                </header>
                
                <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

                <h1 className="text-white"> {searchTerm} </h1>
            </div>
        </main>
     );
}

export default App;