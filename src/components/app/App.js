import { useState } from 'react';

import Header from '../header/Header';
import MainPage from '../mainPage/MainPage';
import ListingsPage from '../listingsPage/ListingsPage';
import Footer from '../footer/Footer';

import "./app.scss";

const App = () => {
    const [page, setPage] = useState('main');

    const mainPage =  page === 'main' ? <MainPage /> : null;
    const listingssPage =  page === 'listings' ? <ListingsPage /> : null;

    function onSwitchPage(e){
        const page = e.currentTarget.getAttribute('data-page');
        setPage(page);
    }

    return (
        <div className="app">
            <Header onSwitchPage={onSwitchPage}/>
            <div className="container">
                {mainPage}
                {listingssPage}
            </div>
            <Footer />
        </div>
    )

}

export default App;