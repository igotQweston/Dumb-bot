const fetch = require('node-fetch');
const TurndownService = require("turndown");
const turndownService = new TurndownService();

var query = `
query ($search: String, $type: MediaType) {
  Media (search: $search, type: $type) {
    siteUrl
    title {
      romaji
    }
    coverImage {
      large
    }
    description
    status(version:2)
    format
    genres
    startDate {
      year
      month
      day
    }
    endDate {
      year
      month
      day
    }
    episodes
    chapters
    duration
    volumes
    averageScore
  }
}
`;

turndownService.remove("span");

const htmlUp = str => {
    const markdown = turndownService.turndown(str);
    return markdown;
};

const search = async (searchArg, type) => {

    var url = 'https://graphql.anilist.co',
        options = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify({
            query: query,
            variables: {search: searchArg, type: type}
        })
    };

    const data = await fetch(url, options).then(handleResponse)
                       .then(handleData)
                       .catch(handleError);

    function handleResponse(response) {
        return response.json().then(function (json) {
            return response.ok ? json : Promise.reject(json);
        });
    }

    function handleData(data) {
        data=data.data.Media
        console.log(data)
        return data
    }

    function handleError(error) {
        console.error(error);
    }

    const startDate = [data.startDate.year, data.startDate.month, data.startDate.day]
    const endDate = [data.endDate.year, data.endDate.month, data.endDate.day]
    const date = [startDate.filter(Boolean).join('-'), endDate.filter(Boolean).join('-')].filter(Boolean).join('** to **')
    const genres = data.genres.filter(Boolean).join(', ')

    return {
        title: data.title.romaji,
        url: data.siteUrl,
        imageUrl: data.coverImage.large,
        description: (data.description !== null) ? String(htmlUp(data.description)):' ',
        status: (data.status !== null) ? data.status:'-',
        format: (data.format !== null) ? data.format.replace("_"," "):'-',
        genres:  (genres !== null) ? genres:'-',
        date: (date !== null) ? '**'.concat(date+'**'):'-',
        episodes: (data.episodes !== null) ? String(data.episodes):'?',
        chapters: (data.chapters !== null) ? String(data.chapters):'?',
        duration: (data.duration !== null) ? String(data.duration).concat(' mn'):'?',
        volumes: (data.volumes !== null) ? String(data.volumes):'?',
        averageScore: (data.averageScore !== null) ? String(data.averageScore).concat('/100'):'N/A',
    }}


module.exports = {
  search
};