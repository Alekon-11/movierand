import { useEffect, useState } from 'react';

import MovieDBService from '../../services/MovieDBService';
import Skeleton from '../../components/skeleton/Skeleton';

import './movieInfo.scss';
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
                <svg viewBox="0 0 19 18" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.54894 0.927051C8.8483 0.00574017 10.1517 0.00573993 10.4511 0.927051L11.8574 5.25532C11.9913 5.66734 12.3752 5.9463 12.8085 5.9463H17.3595C18.3282 5.9463 18.731 7.18592 17.9473 7.75532L14.2654 10.4303C13.9149 10.685 13.7683 11.1364 13.9021 11.5484L15.3085 15.8766C15.6078 16.798 14.5533 17.5641 13.7696 16.9947L10.0878 14.3197C9.7373 14.065 9.2627 14.065 8.91221 14.3197L5.23037 16.9947C4.44665 17.5641 3.39217 16.798 3.69153 15.8766L5.09787 11.5484C5.23174 11.1364 5.08508 10.685 4.7346 10.4303L1.05275 7.75532C0.269035 7.18592 0.67181 5.9463 1.64053 5.9463H6.19155C6.62477 5.9463 7.00873 5.66734 7.1426 5.25532L8.54894 0.927051Z" />
                </svg>
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