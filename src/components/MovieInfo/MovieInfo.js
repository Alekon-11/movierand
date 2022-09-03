import { useEffect, useState } from 'react';

import MovieDBService from '../../services/MovieDBService';
import Skeleton from '../../components/skeleton/Skeleton';

import './movieInfo.scss';
import star from '../../resources/star.png';
import imgError from '../../resources/img-error.jpg';

const MovieInfo = (props) => {
    const movieDBService = new MovieDBService()
    const [movieInfo, setMovieInfo] = useState(0);
    const [skeleton, setSkeleton] = useState(true);

    const content = skeleton ? <Skeleton /> : <View movieInfo={movieInfo} />;

    useEffect(() => {
        onMovieLoading();
    },[props.id])

    function onLoaded(data){
        setMovieInfo(data);
        setSkeleton(false);
    }

    function onError(){
        setSkeleton(true);
    }

    function onMovieLoading(){
        if(!props.id){
            return;
        }

        setSkeleton(true);

        movieDBService.getOneMovie(props.id)
        .then(onLoaded)
        .catch(onError);
    }

    return(
        <>
            {content}
        </>
    )
}

const View = ({movieInfo}) => {
    const [posterDef, setPosterDef] = useState(false);
    const {name, nameOrig, description, year, rate, poster, genres, filmLength, countries} = movieInfo;

    const baseTime = (+filmLength % 60) < 10 ? `0${+filmLength % 60}` : +filmLength % 60;
    const movieTime = `${Math.floor(+filmLength / 60)} ч. ${baseTime} мин.`;

    const moviePoster = posterDef ? imgError : poster;
    const movieDescr = description ? description : 'Ууупс! Описание не найдено!';

    function onSetDefPoster(){
        setPosterDef(true);
    }

    function onDetailedDescr(e){
        if(e.target.parentElement.style.height){
            e.target.parentElement.style.height = '';
            return;
        }
        e.target.parentElement.style.height = `${e.target.parentElement.scrollHeight + e.target.clientHeight}px`;
    }

    return(
        <div className="movie-info">
            <div className="movie-info__poster">
                <img onError={onSetDefPoster} src={moviePoster} alt={name ? name : nameOrig} />
            </div>
            <h2 className="movie-info__name">{name ? name : nameOrig}</h2>
            <h4 className="movie-info__name-original">{nameOrig} / <span>{year} г.</span></h4>
            <h6 className="movie-info__countries">{countries ? countries.join(', ') : null}</h6>
            <div className="movie-info__genres">{ genres ? genres.join(', ') : null}</div>
            <div className="movie-info__length">{movieTime}</div>
            <div className="movie-info__rate">
                <img src={star} alt="rate star" />
                {rate} <span>IMDb</span>
            </div>
            <div className="movie-info__description">
                <p>{movieDescr}</p>
                {description.length > 500 ? <button onClick={onDetailedDescr} type='button'>Читать полностью...</button> : null}
            </div>
        </div>
    )
}

export default MovieInfo;