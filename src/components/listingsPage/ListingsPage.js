import { useState } from 'react';


import ListingsList from '../listingsList/ListingsList';
import MoviesList from '../moviesList/MoviesList';

import './listingsPage.scss';

const ListingsPage = () => {
    const [data, setData] = useState([]);
    const [selected, setSelected] = useState(null);

    return(
        <div className="section listings-page">
            <h2 className="section__title">Ваши списки</h2>
            <div className="listings-page__wrapper">
                <MoviesList />
                <ListingsList data={data} setData={setData} selected={selected} setSelected={setSelected}/>
            </div>
        </div>
    );
}

export default ListingsPage;