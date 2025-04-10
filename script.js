const API_KEY = "40bbd9b4"; // Replace with OMDb or TMDb API Key
const movieResults = document.getElementById("movieResults");
const searchInput = document.getElementById("searchInput");

// Fetch movie data based on search input
async function searchMovie() {
    let searchQuery = searchInput.value.trim();
    if (!searchQuery) return;

    let response = await fetch(`https://www.omdbapi.com/?s=${searchQuery}&apikey=${API_KEY}`);
    let data = await response.json();

    movieResults.innerHTML = "";

    if (data.Search) {
        data.Search.forEach(movie => {
            movieResults.innerHTML += `
                <div class="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
                    <img class="w-full h-60 object-cover rounded" src="${movie.Poster}" alt="${movie.Title}">
                    <h3 class="text-lg font-semibold mt-2">${movie.Title} (${movie.Year})</h3>
                </div>
            `;
        });
    } else {
        movieResults.innerHTML = "<p class='text-center text-red-500'>No movies found</p>";
    }
}

// Live search suggestions (triggers on keyup)
function liveSearch() {
    clearTimeout(window.searchTimeout);
    window.searchTimeout = setTimeout(searchMovie, 500);
}

// Toggle Dark Mode
// function toggleDarkMode() {
//     document.body.classList.toggle("bg-gray-900");
//     document.body.classList.toggle("text-white");
// }
