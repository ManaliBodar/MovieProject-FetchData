// selecting model ,button

const addMovieModel = document.getElementById("add-model");
const AddModelBtn = document.querySelector("header button");
const backDrop = document.getElementById("backdrop");
const cancelAddMovieBtn = addMovieModel.querySelector(".btn--passive");
const confirmAddMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs = addMovieModel.querySelectorAll("input");
const entryTextSection = document.getElementById("entry-text");
const deleteMovieModel = document.getElementById('delete-model');

const movies = [];

// function for backdrop show
const toggleBackDrop = () => {
  backDrop.classList.toggle("visible");
};

// closeMovieModel function
const closeMovieModel = () =>{
    addMovieModel.classList.remove('visible'); 
}
// function for toggle model
const showMovieModel = () => {
  addMovieModel.classList.add("visible");
  toggleBackDrop();
};

// for close backdrop
const closeBackDrop = () => {
      closeMovieModel();
      closeMovieDeletion();
      clearMovieInput();
};

// for close AddMovieModel
const cancelAddMovie = () => {
  closeMovieModel();
  toggleBackDrop();
  clearMovieInput();
  
};

// for fetching and validating userinput and click add button
const addMovieHandler = () => {
  const titleValue = userInputs[0].value;
  const ImageUrlValue = userInputs[1].value;
  const ratingValue = userInputs[2].value;

  if (
    titleValue.trim() === "" ||
    ImageUrlValue.trim() === "" ||
    ratingValue.trim() === "" ||
    parseInt.ratingValue > 5 ||
    +ratingValue < 1
  ) {
    alert("please enter valid information(rating enter between 1 to 5)");
    return;
  }

  const newMovie = {
    id: Math.random().toString(),
    title: titleValue,
    image: ImageUrlValue,
    rating: ratingValue,
  };
  movies.push(newMovie);

  closeMovieModel();
  toggleBackDrop();
  clearMovieInput();
  movieList(newMovie.id, newMovie.title, newMovie.image, newMovie.rating);
  updateUI();
};

// function for updateUI
const updateUI = () => {
  if (movies.length === 0) {
    entryTextSection.style.display = "block";
  } else {
    entryTextSection.style.display = "none";
  }
};

// for clearing movie data
const clearMovieInput = () => {
  for (const usrInput of userInputs) {
    usrInput.value = "";
  }
};

// deleteMovie from DOM
const deleteMovie = (movieId) => {
  let index = 0;
  for (const movie of movies) {
    if (movie.id === movieId) {
      break;
    }
    index++;
  }
  movies.splice(index, 1);
  const SetMovieEle = document.getElementById("movie-list");
  SetMovieEle.children[index].remove();
  closeMovieDeletion();
  // SetMovieEle.removeChild(SetMovieEle.children[index]);
};

// cancelMovieDeletion function
const closeMovieDeletion = () =>{
    toggleBackDrop();
    deleteMovieModel.classList.remove('visible');
};


// deletemoviehandler
const deleteMovieHandler = (movieId) => {
  
  deleteMovieModel.classList.add("visible");
  toggleBackDrop();
   const canceldeletionBtn = deleteMovieModel.querySelector('.btn--passive');
   const confirmDeletionBtn = deleteMovieModel.querySelector('.btn--danger');   

   canceldeletionBtn.addEventListener('click',closeMovieDeletion);
   confirmDeletionBtn.addEventListener('click',deleteMovie.bind(null,movieId));
  // deleteMovie(movieId);
};

// function for movie entry in DOM
const movieList = (id, title, imageURL, rating) => {
  const newMovieEle = document.createElement("li");
  newMovieEle.className = "movie-element";
  newMovieEle.innerHTML = `
    <div class="movie-element_image ">
        <img src="${imageURL}" alt="${title}" />
    </div>
    <div class="movie-element_info">
    <h2>${title}</h2>
    <p>${rating}/5 stars</p>
    </div>
    `;

  newMovieEle.addEventListener("click", deleteMovieHandler.bind(null, id));
  const SetMovieEle = document.getElementById("movie-list");
  SetMovieEle.append(newMovieEle);
};

// add event listener for open model on button click
AddModelBtn.addEventListener("click", showMovieModel);
backDrop.addEventListener("click", closeBackDrop);
cancelAddMovieBtn.addEventListener("click", cancelAddMovie);
confirmAddMovieBtn.addEventListener("click", addMovieHandler);
