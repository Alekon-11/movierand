import { useEffect, useState } from 'react';

import MovieDBService from '../../services/MovieDBService';
import Skeleton from '../../components/skeleton/Skeleton';

import './movieInfo.scss';
import star from '../../resources/star.png';

const MovieInfo = (props) => {
    const movieDBService = new MovieDBService()

    const [movieInfo, setMovieInfo] = useState(0);
    const [error, setError] = useState(false);
    const [skeleton, setSkeleton] = useState(true);

    // const loading = skeleton ? <Skeleton /> : <View movieInfo={movieInfo} />;

    useEffect(() => {
        onMovieLoading();
    },[props.id])

    function onLoaded(data){
        console.log(data);
        setMovieInfo(data);
        setSkeleton(false);
    }

    function onError(){
        setError(true);
    }

    function onMovieLoading(){
        movieDBService.getOneMovie(props.id)
        .then(onLoaded)
        .catch(onError);
    }

    return(
        <>
            <View movieInfo={movieInfo} />
        </>
    )
}

const View = (props) => {
    const {name, nameOrig, description, year, rate, poster, genres, filmLength, countries} = props.movieInfo;

    return(
        <div className="movie-info">
            <div className="movie-info__poster"><img src={poster} alt={name ? name : nameOrig} /></div>
            <h2 className="movie-info__name">{name ? name : nameOrig}</h2>
            <h4 className="movie-info__name-original">{nameOrig} / <span>{year} г.</span></h4>
            <h6 className="movie-info__countries">{countries ? countries.join(', ') : null}</h6>
            <div className="movie-info__genres">{ genres ? genres.join(', ') : null}</div>
            {/* <div className="movie-info__length">{filmLength} мин.</div> */}
            <div className="movie-info__length">{Math.floor(+filmLength / 60)} ч. {Math.floor(+filmLength % 60)} мин.</div>
            <div className="movie-info__rate">
                <img src={star} alt="rate star" />
                {rate} <span>IMDb</span>
            </div>
            <p className="movie-info__description">{description ? description : 'Ууупс! Описание не найдено!'}</p>
        </div>
    )
}

export default MovieInfo;