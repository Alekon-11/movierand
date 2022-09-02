import { useState } from 'react';
import MovieGenerator from '../movieGenerator/MovieGenerator';
import MovieInfo from '../movieInfo/MovieInfo';

import './mainPage.scss';

const MainPage = () => {
    const [id, setId] = useState(0);

    function getMovieId(id){
        setId(id);
    }

    return (
        <section className="section main-page">
            <div className="section__title">Случайный фильм</div>
            <div className="section__wrapper">
                <MovieInfo id={id} />
                <MovieGenerator getMovieId={getMovieId}/>
            </div>
        </section>
    )
}

export default MainPage;