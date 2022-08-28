import MovieInfo from '../MovieInfo/MovieInfo';

import './mainPage.scss';

const MainPage = () => {
    return (
        <section className="section">
            <div className="section__title">Случайный фильм</div>
            <MovieInfo />
        </section>
    )
}

export default MainPage;