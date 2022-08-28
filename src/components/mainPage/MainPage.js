import MovieInfo from '../movieInfo/MovieInfo';

import './mainPage.scss';

const MainPage = () => {
    return (
        <section className="section main-page">
            <div className="section__title">Случайный фильм</div>
            <MovieInfo />
        </section>
    )
}

export default MainPage;