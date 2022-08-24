
class KinopoiskService{
    _apiKey = 'd6a2af2f-ddaf-4bf0-bcba-a6322a5c79f7';
    _apiBase = 'https://kinopoiskapiunofficial.tech/';

    getRequest = async (url) => {
        const res = await fetch(url,{
            method: 'GET',
            headers: {
                'X-API-KEY': this._apiKey,
                'Content-Type': 'application/json',
            },
        });

        if(!res.ok){
            throw new Error(alert(`We have a problem! Status:${res.status}`));
        }

        return res.json();
    }

    getAllMovie = async () => {
        const res = await this.getRequest(`${this._apiBase}api/v2.2/films/`);
        return this._trasformResponse(res);
    }

    getOneMovie = async (id) => {
        const res = await this.getRequest(`${this._apiBase}api/v2.2/films/${id}`);
        return this._trasformResponse(res);
    }

    _trasformResponse = (res) => {
        return {
            description: res.description,
            posterUrl: res.posterUrl,
            genres: res.genres.map(item => item.genre),
            rate: res.ratingKinopoisk,
            filmLength: res.filmLength,
            id: res.kinopoiskId,
            name: res.nameRu
        }
    }
}

export default KinopoiskService;