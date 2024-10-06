document.addEventListener('DOMContentLoaded', function() {
    const genresData = [
        { name: 'Action', description: 'Exciting and fast-paced games' },
        { name: 'Adventure', description: 'Explore new worlds and stories' },
        { name: 'RPG', description: 'Immersive role-playing experiences' },
        { name: 'Horror', description: 'Thrilling and scary games' }
        // Add more genres as needed
    ];

    const genreListSection = document.getElementById('genreList');

    genresData.forEach(genre => {
        const genreCard = document.createElement('div');
        genreCard.classList.add('genre-card');

        const genreName = document.createElement('h2');
        genreName.textContent = genre.name;

        const genreDescription = document.createElement('p');
        genreDescription.textContent = genre.description;

        genreCard.appendChild(genreName);
        genreCard.appendChild(genreDescription);
        genreListSection.appendChild(genreCard);
    });
});
