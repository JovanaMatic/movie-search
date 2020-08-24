const input = document.querySelector('.input');
const showDropdownItems = document.querySelector('.dropdown-content');
const dropDown = document.querySelector('.dropdown'); 
let showItem = document.querySelector('.show-item');
const errorMessage = document.querySelector('.error-message');

const fetchData = async (inputSearch) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '8f71e7d8',
            s: inputSearch
        }
    });
    if(response.data.Error) {
        errorMessage.innerHTML = `
            <h3>Ops, no movie with that title. Please try again.<h3>
        `;
        showItem.innerHTML = '';
        return [];
    }
    return response.data.Search;
};


const onInput = async (e) => {
    const movie = await fetchData(e.target.value);

    //if search input is empty, if there is no movies:
    if(!movie.length) {
        dropDown.classList.remove('is-active');
        return;
    }
    //hide messages and clear search input
    errorMessage.innerHTML = '';
    showDropdownItems.innerHTML = '';
    dropDown.classList.add('is-active');

    movie.forEach(movieItem => {
        dropDown.classList.add('is-active');
        const anchor = document.createElement('a');
        anchor.classList.add('dropdown-item');
        anchor.innerHTML += `
        <img src="${movieItem.Poster}">
        ${movieItem.Title}
        `;
        showDropdownItems.appendChild(anchor);
        anchor.addEventListener('click', () => {
            input.value = anchor.innerText;
            dropDown.classList.remove('is-active');
            renderItem(movieItem.imdbID);
        });
    });
   // resetInput();
};
const renderItem = async (data) => {
    const movieData = await fetchItemMovie(data);
    //fetch detailed movie by ID

    showItem.innerHTML = `
    <div class="shadow">
    <img class="main-img" src="${movieData.Poster}">
    <div class="half-2">
        <div class="title-1">
            <h3>${movieData.Title}(${movieData.Year})</h3>
            <p class="rated"><b>Rated: ${movieData.Rated}</b></p>
        </div>
        <div class="title-2">
            <div class="row-1">
                <p><b>Genre:</b> ${movieData.Genre}</p>
            </div>
            <div class="row-2">
            <p class="run-time"><i class="far fa-clock"></i>
            ${movieData.Runtime}</p>
            <p class="rating"><b>imdb rating:</b> ${movieData.imdbRating}</p>
            </div>
            <div>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <i class="fas fa-star"></i>
            <span class="rating-imdb"></span>
            </div>
            <p class="plot"><b>Plot:</b> ${movieData.Plot}</p>
            <p class="director"><b>Director:</b><span> ${movieData.Director}</span></p>
            <p class="writer"><b>Writer:</b><span> ${movieData.Writer}</span></p>
            <p class="actors"><b>Actors:</b><span> ${movieData.Actors}</span></p>
        </div>
    </div>
    </div>
`;
const stars = document.querySelectorAll('.fa-star'); 
const rating = parseInt(movieData.imdbRating);
const raitingOf = document.querySelector('.rating-imdb');

if(rating <= 2) {
    Array.from(stars)[0].style.color = '#ffb842';
    raitingOf.innerHTML = `(1/4)`;
} else if(rating > 2 && rating <= 5) {
    Array.from(stars)[0].style.color = '#ffb842';
    Array.from(stars)[1].style.color = '#ffb842';
    raitingOf.innerHTML = `(2/4)`;
} else if(rating > 5 && rating <7) {
    Array.from(stars)[0].style.color = '#ffb842';
    Array.from(stars)[1].style.color = '#ffb842'; 
    Array.from(stars)[2].style.color = '#ffb842'; 
    raitingOf.innerHTML = `(3/4)`;
}else {
    Array.from(stars).forEach(item => {
        item.style.color = '#ffb842';
        raitingOf.innerHTML = `(4/4)`;
    });
}

}
const fetchItemMovie = async (data) => {
    const responseMovie = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: '8f71e7d8',
            i: data
        }
    });
    return responseMovie.data;
}

input.addEventListener('input', debounce(onInput));
input.value = '';
