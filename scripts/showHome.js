document.addEventListener('DOMContentLoaded', () => {
    fetchMovies();
    document.getElementById('input-film').addEventListener('input', searchMovies);
});

// get movies
async function fetchMovies() {
    try {
        const response = await fetch('https://api-listfilm.vercel.app/movies');
        if (!response.ok) {
            throw new Error('Gagal mengambil data');
        }

        const movies = await response.json();
        displayMovies(movies);

    } catch (error) {
        console.error(error);
        document.getElementById('film-list').innerHTML = 
            `<p class="text-red-600 font-semibold">Terjadi kesalahan saat mengambil data.</p>`;
    }
}

function displayMovies(movies) {
    const movieList = document.getElementById('film-list');
    movieList.innerHTML = '';

    const movieCards = movies.map(movie => `
        <div class="max-w-2xl mx-auto px-6 py-1" id="movie-${movie.id}">
            <div class="bg-white rounded-xl border-2">
                <div class="accordion-header flex justify-between items-center p-4 cursor-pointer bg-gray-200">
                    <span class="font-semibold text-lg">${movie.title}</span>
                    <img src="assets/icons/arrow-down.svg" alt="">
                </div>
                <div class="accordion-body overflow-hidden max-h-0 transition-all duration-300">
                    <div class="p-4 border-t">
                        <h1>Judul : <span class="font-bold">${movie.title}</span></h1>
                        <h2>Direktur : <span class="font-bold">${movie.director}</span></h2>
                        <h2>Durasi : <span class="font-bold">${movie.duration}</span></h2>
                        <h2>Tahun rilis : <span class="font-bold">${movie.year}</span></h2>
                        <h2>Genre : <span class="font-bold">${movie.genre}</span></h2>
                        <h2>Rating : <span class="font-bold">${movie.rating}</span></h2>
                        <div class="flex items-center mt-4 gap-2">
                            <img src="assets/icons/trash.svg" alt="" class="trash-icon" data-id="${movie.id}">
                            <a href="edit.html?id=${movie.id}"><img src="assets/icons/edit.svg" alt=""></a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    movieList.innerHTML = movieCards;

    addAccordionListeners();
    addTrashEventListeners();
}

// searchbar function
function searchMovies() {
    const searchTerm = document.getElementById('input-film').value.trim().toLowerCase();
    if (searchTerm === '') {
        fetchMovies();
        return;
    }

    fetch('https://api-listfilm.vercel.app/movies')
        .then(response => response.json())
        .then(movies => {
            const filteredMovies = movies.filter(movie => {
                return (
                    movie.title.toLowerCase().includes(searchTerm) ||
                    movie.director.toLowerCase().includes(searchTerm) ||
                    movie.genre.toLowerCase().includes(searchTerm)
                );
            });
            displayMovies(filteredMovies);
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('film-list').innerHTML = 
                `<p class="text-red-600 font-semibold">Terjadi kesalahan saat mengambil data.</p>`;
        });
}

// Event listener untuk ikon trash
function addTrashEventListeners() {
    const trashIcons = document.querySelectorAll('.trash-icon');
    trashIcons.forEach(icon => {
        icon.addEventListener('click', async (e) => {
            const movieId = e.target.getAttribute('data-id');
            if (confirm('Apakah Anda yakin ingin menghapus film ini?')) {
                try {
                    const response = await fetch(`https://api-listfilm.vercel.app/movies/${movieId}`, {
                        method: 'DELETE',
                    });
                    if (response.ok) {
                        const movieElement = document.getElementById(`movie-${movieId}`);
                        movieElement.remove();
                        alert('Film berhasil dihapus!');
                    } else {
                        alert('Gagal menghapus film');
                    }
                } catch (error) {
                    console.error('Error:', error);
                    alert('Terjadi kesalahan saat menghapus film');
                }
            }
        });
    });
}
