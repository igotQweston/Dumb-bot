const fetch = require('node-fetch');

const search = async (type) => {

    var url = `https://nekos.best/api/v2/${type}`

    const data = await fetch(url).then(handleResponse)
                       .then(handleData)
                       .catch(handleError);

    function handleResponse(response) {
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    }

    function handleData(data) {
        data=data.results[0]
        return data
    }

    function handleError(error) {
        console.error(error);
    }

    return {
        artist: data.artist_name,
        artistUrl: data.artist_href,
        animeTitle: data.anime_name,
        sourceUrl: data.source_url,
        imageUrl: data.url,
    }}


module.exports = {
  search
};