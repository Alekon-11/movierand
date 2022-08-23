
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

    getAllMovie = () => {
        return this.getRequest(`${this._apiBase}api/v2.2/films`);
    }
}

export default KinopoiskService;