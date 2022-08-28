
class MovieDBService{
    _apiKey = '22c09ee379d68610073c00aed4d35681';
    _apiBase = 'https://api.themoviedb.org/3';
    _apiImageBase = 'https://image.tmdb.org/t/p/w500';
    _apiLang = 'ru'

    getRequest = async (url) => {
        const res = await fetch(url);

        if(!res.ok){
            throw new Error();
        }

        return res.json();
    }

    // getOneMovie = (id) => {
    //     return this.getRequest(`${this._apiBase}/movie/${id}?api_key=${this._apiKey}&language=${this._apiLang}`);
    // }

    getOneMovie = async (id) => {
        const res = await this.getRequest(`${this._apiBase}/movie/${id}?api_key=${this._apiKey}&language=${this._apiLang}`);
        return this._trasformResponse(res);
    }


    _trasformResponse = (res) => {
        return {
            name: res.title,
            nameOrig: res.original_title,
            description: res.overview,
            year: res.release_date.slice(0,4),
            rate: res.vote_average.toFixed(1),
            poster: `${this._apiImageBase}${res.poster_path}`,
            genres: res.genres.map(item => item.name[0].toUpperCase() + item.name.slice(1)),
            filmLength: res.runtime,
            id: res.id,
            countries: res.production_countries.map(item => item.name)
        }
    }
}

export default MovieDBService;