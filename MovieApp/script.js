// get the API-url,Imagepath and SearchApi

const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=fdd5159e54a892ff5d57e0f7d70101f7&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API ='https://api.themoviedb.org/3/search/movie?api_key=fdd5159e54a892ff5d57e0f7d70101f7&query='


// select the Id from html file
const main = document.getElementById('main');
const form = document.getElementById('form');
const search = document.getElementById('search');

// call the function getmovies
getMovies(API_URL);


// create function getmovies for fetching movie list
async function getMovies(url)
{
    const res = await fetch(url);
    const data = await res.json();

    showMovies(data.results)
}

// create function for show movie title,overview,img and vote-average

function showMovies(movies)
{
    main.innerHTML=''
    movies.forEach(movie => {
        const {title , poster_path , vote_average ,overview} = movie


        // create div  and add movie class
        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        // set all things into movieElement which we want to display

        movieEl.innerHTML =`
        <img src="${IMG_PATH + poster_path}" alt="${title}">
        <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
        <h3>OverView</h3>
        ${overview}
    </div>
        `
        main.appendChild(movieEl);

    });
}
// create function for voteaverage 

function getClassByRate(vote)
{
    if(vote >= 8)
    {
        return 'green'
    }
    else if(vote >= 5)
    {
        return 'orange'
    }
    else{
        return 'red'
    }
}

// add submit eventlistener for search option

form.addEventListener('submit' ,(e) =>{
    e.preventDefault();
    const searchTerm = search.value
    if(searchTerm && searchTerm !== '')
    {
        getMovies(SEARCH_API + searchTerm)

        search.value =''
    }
    else{
        window.location.reload()
    }
})