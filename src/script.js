import {
    API_KEY, BASE_URL,
    IMG_URL,
    language,
  } from './api.js'

const url = BASE_URL;
const key = API_KEY;
const imgUrl = IMG_URL;
const moviePoster = document.getElementById('movie-poster');
const movieTitle = document.getElementById('movie-title');
const movieOverview = document.getElementById('movie-overview');
const findButton = document.getElementById('find-button');
const movieContainer = document.getElementById('movie_info');
let isGettingError = false;

async function getPopularMovies(){
  const popularListUrl = url + '/popular?api_key=' + key + "&" + language;
  let popularMovies = []
  await axios.get(popularListUrl).then(response => {
      isGettingError = false; 
      const data = response.data;
      popularMovies = data.results;
    })
    .catch(err => {
      console.log(err);
      isGettingError = true;
    })
  return popularMovies;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}

async function getRandomMovie(){
  const popularMoviesList = await getPopularMovies();  
  if(isGettingError == true){
    movieTitle.innerHTML = "Ops, hoje não é dia de assistir filme. Bora codar! 🚀";
    moviePoster.src = "../assets/error_poster.jpg";
    movieContainer.style.display = 'flex'; 
  }else{
    const randomMovie = popularMoviesList[getRandomInt(0, popularMoviesList.length)];
    moviePoster.src = imgUrl + randomMovie.poster_path;
    movieTitle.innerHTML = randomMovie.title;
    movieOverview.innerHTML = randomMovie.overview;
    movieContainer.style.display = 'flex';  
  }
}

findButton.addEventListener('click', ()=>{getRandomMovie()});