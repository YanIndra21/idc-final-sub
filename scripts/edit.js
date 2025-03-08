
const urlParams = new URLSearchParams(window.location.search);
const movieId = urlParams.get('id');


if (!movieId) {
    alert('ID film tidak ditemukan!');
    window.location.href = 'index.html'; 
} else {

    fetchMovieData(movieId);
}


async function fetchMovieData(id) {
    try {
        const response = await fetch(`https://api-listfilm.vercel.app/movies/${id}`);
        if (!response.ok) {
            throw new Error('Gagal mengambil data film');
        }
        
        const movie = await response.json();
        populateForm(movie);
    } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan saat mengambil data film');
    }
}


function populateForm(movie) {
    document.getElementById('judul').value = movie.title;
    document.getElementById('direktur').value = movie.director;
    document.getElementById('genre').value = movie.genre;
    document.getElementById('durasi').value = movie.duration;
    document.getElementById('tahun').value = movie.year;
    document.getElementById('rating').value = movie.rating;
}


document.getElementById('edit-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const updatedMovie = {
        title: document.getElementById('judul').value,
        director: document.getElementById('direktur').value,
        genre: document.getElementById('genre').value,
        duration: document.getElementById('durasi').value,
        year: document.getElementById('tahun').value,
        rating: document.getElementById('rating').value
    };

    try {
        const response = await fetch(`https://api-listfilm.vercel.app/movies/${movieId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedMovie)
        });

        if (!response.ok) {
            throw new Error('Gagal memperbarui data film');
        }

        alert('Film berhasil diperbarui!');
        window.location.href = 'index.html';
    } catch (error) {
        console.error(error);
        alert('Terjadi kesalahan saat memperbarui data film');
    }
});
