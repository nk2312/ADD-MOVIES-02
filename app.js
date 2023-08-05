const btn =document.querySelector("header").firstElementChild.nextElementSibling;
const modalCard = document.getElementById("card");
const backDrop = document.getElementById("back-drop");
const btnAdd = document.getElementById("add");
const btnCancel = document.getElementById("cancel");
const userInputs = document.querySelectorAll("input");
const ul = document.querySelector("ul");
const box = document.getElementById("box");
let movies = [];

const backDropHandler = () => {
  backDrop.classList.toggle("visible");
};

const addMovieHandler = () => {
  modalCard.classList.toggle("visible");
  backDropHandler();
};
const noHandler = () => {
  backDropHandler();
  box.classList.remove("visible");

};

const confirmationHandler = (id) => {
 
  box.classList.add("visible");
  const no = box.lastElementChild.firstElementChild;
  const yes = box.lastElementChild.lastElementChild;
  yes.addEventListener("click", deleteMovie.bind(null,id));
  no.addEventListener("click", noHandler);
};

const deleteMovie = (id) => {
  let index = 0;
  for (const m of movies) {
    if (m.id == id) {
      break;
    }
    index++;
  }
  const newLiElement = document.querySelectorAll("li")[index];
  ul.removeChild(newLiElement);
  noHandler();

};

const deleteHandler = (id) => {
  backDropHandler();
  confirmationHandler(id);
};

const renderMoviesHandler = (id, title, img, rating) => {
  const newLiElement = document.createElement("li");
  newLiElement.className = "movie-element";
  newLiElement.innerHTML = `
    <div class='movie-div'>
        <div class='img'>
            <img src="${img}" alt="img"/>
        </div>
        <div class='des'>
            <p>${title}</p>
            <p class="rating">${rating}/5</p>
        </div>
    </div>`;
  ul.append(newLiElement);
  newLiElement.addEventListener("click", deleteHandler.bind(null, id));
};

const addMovies = () => {
  let title = userInputs[0].value;
  let img = userInputs[1].value;
  let rating = userInputs[2].value;
  if (title.trim() === "" || img.trim() === "" || rating > 5 || rating < 1) {
    alert("Invalid Inputs ! please enter again  ");
    return;
  }
  let id = Math.random() * 10;
  movies.push({ id, title, img, rating });
  addMovieHandler();
  renderMoviesHandler(id, title, img, rating);
  for (const i of userInputs) {
    i.value = "";
  }
};

btn.addEventListener("click", addMovieHandler);
backDrop.addEventListener("click", addMovieHandler);
btnAdd.addEventListener("click", addMovies);
btnCancel.addEventListener("click", addMovieHandler);
