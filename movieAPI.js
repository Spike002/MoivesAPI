
document.querySelector('#searchText').addEventListener('input', function (e){
  e.preventDefault();
  const searchText = e.target.value;
  getMovies(searchText);
})
function getMovies(searchText){
  axios.get('http://www.omdbapi.com/?s='+searchText+'&apikey=2f471baf')
  .then((response) => {
    console.log(response);
    const movies = response.data.Search;
    let output = '';
    movies.forEach(function(movie){
      output +=`
        <div class="col-md-3">
          <div class=" well text-center">
            <img src="${movie.Poster}">
            <h5>${movie.Title}</h5>
            <button onClick="movieSelected('${movie.imdbID}')" >Movie Detail</button>

          </div>
        </div>
      `;
    });
    document.querySelector('#movies').innerHTML = output;
  })
  .catch((error) => {
    console.log(error)
  })
}

function movieSelected(id) {
  sessionStorage.setItem('movieId', id);
  window.location = 'movie.html';
  return false;
}

function getMovie(){
  let movieId = sessionStorage.getItem('movieId');
  axios.get('http://www.omdbapi.com/?i='+movieId+'&apikey=2f471baf')
  .then((response) => {
    console.log(response);
    console.log(movieId);
    let movie = response.data;
    let output =`
    <div class="row">
      <div class="col-md-4">
        <img src="${movie.Poster}" class="thumbnail">
      </div>
      <div class="col-md-8">
        <h2>${movie.Title}</h2>
        <ul class="list-group">
          <li class="list-group-item"><strong>Awards:</strong> ${movie.Awards}</li>
          <li class="list-group-item"><strong>Language:</strong> ${movie.Language}</li>
          <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
          <li class="list-group-item"><strong>Release:</strong> ${movie.Released}</li>
          <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
          <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
          <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
          <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
          <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
        </ul>
      </div>
    </div>
    <div class="row">
      <div class="well">
        <h3>Plot</h3>
        ${movie.Plot}
        <hr>
        <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" id="go-to-movieIMDBID">View IMDB</a>
        <a href="index.html" id="go-to-index" >Go to Search</a>
      </div>
    </div>
    `
    document.querySelector('#movies').innerHTML = output;
  })
  .catch((error) => {
    console.log(error)
  })
}
