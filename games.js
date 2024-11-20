import { addToIndexedDB } from './indexedDB.js';
import { addToFirebase } from './firebaseDB.js';

document.addEventListener('DOMContentLoaded', function() {
    const gamesData = [
        { title: "Baldur's Gate 3", genre: 'RPG', price: '$59.99', imgSrc: 'game1.jfif' },
        { title: 'The Legend of Zelda: Tears of the Kingdom', genre: 'Action-Adventure', price: '$69.99', imgSrc: 'game2.jfif' },
        { title: 'Resident Evil 4', genre: 'Horror', price: '$59.99', imgSrc: 'game3.jfif' }
    ];

    const gamesListSection = document.getElementById('gamesList');

    gamesData.forEach(game => {
        const gameCard = document.createElement('div');
        gameCard.className = 'game-card';

        gameCard.innerHTML = `
            <img src="${game.imgSrc}" alt="${game.title}" class="responsive-img">
            <p><strong>${game.title}</strong></p>
            <p>Genre: ${game.genre}</p>
            <p>Price: ${game.price}</p>
        `;

        gamesListSection.appendChild(gameCard);
    });

    // Example: Create a new game record
    const newGame = { title: 'Cyberpunk 2077', genre: 'RPG', platform: 'PC' };
    createGameRecord(newGame);
});

async function createGameRecord(gameData) {
  if (navigator.onLine) {
    try {
      // Add to Firebase if online
      await addToFirebase('games', gameData);
      console.log('Data added to Firebase');
    } catch (error) {
      console.error('Error adding to Firebase:', error);
    }
  } else {
    try {
      // Fallback to IndexedDB if offline
      await addToIndexedDB('games', gameData);
      console.log('Data added to IndexedDB for later syncing');
    } catch (error) {
      console.error('Error adding to IndexedDB:', error);
    }
  }
}
