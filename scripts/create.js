document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('film-form').addEventListener('submit', async (e) => {
        e.preventDefault();
      
        const judul = document.getElementById('judul').value;
        const direktur = document.getElementById('direktur').value;
        const genre = document.getElementById('genre').value;
        const durasi = document.getElementById('durasi').value;
        const tahun = document.getElementById('tahun').value;
        const rating = document.getElementById('rating').value;

      
        const movieData = {
            title: judul,
            director: direktur,
            genre: genre,
            duration: durasi,
            year: tahun,
            rating: rating
        };

        try {
           
            const response = await fetch('https://api-listfilm.vercel.app/movies', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(movieData)
            });

            if (!response.ok) {
                throw new Error('Gagal menambahkan film');
            }

            
            alert('Film berhasil ditambahkan!');
            document.getElementById('film-form').reset(); 

        } catch (error) {
            console.error('Error:', error);
            alert('Terjadi kesalahan saat menambahkan film.');
        }
    });
});
