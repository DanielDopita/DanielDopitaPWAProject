document.addEventListener('DOMContentLoaded', function() {
    const gamesData = [
        { title: "Baldur's Gate 3", genre: 'Rpg', price: '$59.99', imgSrc: 'game1.jfif' },
        { title: 'The Legend of Zelda: Tears of the Kingdom', genre: 'Action-Adventure', price: '$69.99', imgSrc: 'game2.jfif' },
        { title: 'Resident Evil 4', genre: 'Horror', price: '$59.99', imgSrc: 'game3.jfif' }
    ];

    const gamesListSection = document.getElementById('gamesList');

    gamesData.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';

        gameCard.innerHTML = `
            <img src="${game.imgSrc}" alt="${game.title}">
            <p>${game.title}</p>
            <p>Genre: ${game.genre}</p>
            <p>Price: ${game.price}</p>
        `;

        gamesListSection.appendChild(gameCard);
    });
});
