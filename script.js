const apiKey = 'b0eb15e83655eff95a06324718f1a04b';
let currentPage = 1;

// Buscar filmes populares
function getPopularMovies() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=pt-BR&page=${currentPage}`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            displayMovies(data.results);

            // Mostrar botão de próxima página se houver mais páginas
            if (data.page < data.total_pages) {
                document.getElementById('nextPage').style.display = 'block';
            } else {
                document.getElementById('nextPage').style.display = 'none';
            }
        })
        .catch(error => console.error('Erro ao buscar filmes:', error));
}

// Exibir filmes na tela
function displayMovies(movies) {
    const container = document.getElementById('movies');
    container.innerHTML = ''; // Limpa antes de renderizar

    movies.forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('card-movie');

        const poster = movie.poster_path
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
            : 'https://via.placeholder.com/200x300?text=Sem+Imagem';

        card.innerHTML = `
            <img src="${poster}" alt="${movie.title}" width="200">
            <h3>${movie.title}</h3>
            <p>Nota: ${movie.vote_average}</p>
        `;

        card.addEventListener('click', () => openMovieModal(movie.id));
        container.appendChild(card);
    });
}

// Abrir modal com detalhes
function openMovieModal(movieId) {
    const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=pt-BR`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            document.getElementById('movieTitle').textContent = data.title;
            document.getElementById('moviePoster').src = `https://image.tmdb.org/t/p/w500${data.poster_path}`;
            document.getElementById('movieOverview').textContent = data.overview;
            document.getElementById('movieReleaseDate').textContent = data.release_date;
            document.getElementById('movieVoteAverage').textContent = data.vote_average;

            document.getElementById('movieModal').style.display = 'block';
        })
        .catch(error => console.error('Erro ao buscar detalhes:', error));
}

// Fechar modal
function closeModal() {
    document.getElementById('movieModal').style.display = 'none';
}

// Evento de fechar modal
document.addEventListener('DOMContentLoaded', () => {
    const closeBtn = document.querySelector('.close');
    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }
});

// Próxima página
document.getElementById('nextPage').addEventListener('click', () => {
    currentPage++;
    getPopularMovies();
});

// Inicializar
getPopularMovies();
