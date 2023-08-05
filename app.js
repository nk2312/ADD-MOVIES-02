const addBtn = document.getElementById("add-btn");
const search=document.getElementById("search");
const list=document.getElementById("list");
const movies = [];

const renderMoviesHandler=(filter='')=>{
  const ulElement=list.querySelector('ul');
  ulElement.innerHTML=''

  if(movies.length===0){
    return
  }
  else{
    list.classList.add("display");
  }



  const filteredMovies=!filter? movies: movies.filter((input)=>{return input.info.title.includes(filter)})
  filteredMovies.forEach((movie)=>{
    
    const {info}=movie;
    let {getFormattedInput}=movie;
    getFormattedInput=getFormattedInput.call(movie);
    let text=movie.getFormattedInput() + ' ';
    // const {title:movieTitle}=info; //object destructuring ,pulling title and assigning to movieTitle
    for(const keys in info){
       if(keys!=='title'){
        text += `${keys} : ${info[keys]}`;
       }
    }
    const newElement = document.createElement('li');
    newElement.innerHTML=text;  
    newElement.classList.add('des');
    ulElement.appendChild(newElement);
  })

 


}

const addMovieHandler = () => {

const movieTitle = document.getElementById("movie-title").value;
const extraLabel = document.getElementById("extra-label").value;
const extraValue = document.getElementById("extra-value").value;

if(movieTitle.trim()==''|| extraLabel.trim()=='' || extraValue.trim()==''){
  alert("Empty Inputs ! Please enter again ")
  return
}

  const moviesObject = {
    info: {
      title: movieTitle,
      [extraLabel]: extraValue,
    },
    id: Math.random() * 10,
    getFormattedInput(){
      return this.info.title.toUpperCase();
    }
  };
  movies.push(moviesObject);
  renderMoviesHandler();
  
};

const searchHaandler=()=>{
  const searchInput=document.getElementById("filter-title").value;
  renderMoviesHandler(searchInput);
}

addBtn.addEventListener("click", addMovieHandler);
search.addEventListener('click', searchHaandler)
