import { addToIndexedDB } from './indexedDB.js';
import { addToFirebase } from './firebaseDB.js';

document.addEventListener('DOMContentLoaded', function() {
    const genresData = [
        { name: 'Action', description: 'Exciting and fast-paced games' },
        { name: 'Adventure', description: 'Explore new worlds and stories' },
        { name: 'RPG', description: 'Immersive role-playing experiences' },
        { name: 'Horror', description: 'Thrilling and scary games' }
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
