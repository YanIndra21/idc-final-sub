document.addEventListener("DOMContentLoaded", function () {
	const BASE_URL = "https://api-listfilm.vercel.app";
	const moviesContainer = document.querySelector('#movies-container');
  
	if (!moviesContainer) {
	  console.error("Elemen #movies-container tidak ditemukan.");
	  return;
	}
  
	let output = '';
  
	fetch(`${BASE_URL}/movies`)
	  .then(response => response.json())
	  .then(data => {
		console.log(data);
  
		if (Array.isArray(data)) {
		  data.forEach(movie => {
			output += `<h1>${movie.title}</h1>`;
		  });
		} else if (data.movies && Array.isArray(data.movies)) {
		  data.movies.forEach(movie => {
			output += `<h1>${movie.title}</h1>`;
		  });
		} else {
		  console.error('Struktur data tidak sesuai.');
		}
  
		moviesContainer.innerHTML = output;
	  })
	  .catch(error => console.error('Error fetching data:', error));
  });
  
//  async function fetchMovies() {
//     try {
// 		const response = await fetch(`${BASE_URL}/movies`)
// 		if (!response.ok){
// 			throw new Error(`Error fetching movies`);
// 		}
// 		const data = await response.json()
// 		console.log(data)
//         const moviesContainer = document.getElementById('title');
//         moviesContainer.innerText = JSON.stringify(data.title)
// 	} catch (error) {
// 		console.log(error)
// 	}
// }