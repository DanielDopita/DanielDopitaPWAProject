import { addToIndexedDB } from './indexedDB.js';
import { addToFirebase } from './firebaseDB.js';

document.addEventListener('DOMContentLoaded', function() {
    const platformsData = [
        { name: 'PC', description: 'Personal Computer gaming platform' },
        { name: 'PlayStation', description: 'Sony gaming console' },
        { name: 'Xbox', description: 'Microsoft gaming console' },
        { name: 'Nintendo Switch', description: 'Hybrid gaming console by Nintendo' }
    ];

    function createPlatformCards(platforms, containerId) {
        const container = document.getElementById(containerId);

        platforms.forEach(platform => {
            const platformCard = document.createElement('div');
            platformCard.classList.add('genre-card');

            const platformName = document.createElement('h2');
            platformName.textContent = platform.name;

            const platformDescription = document.createElement('p');
            platformDescription.textContent = platform.description;

            platformCard.appendChild(platformName);
            platformCard.appendChild(platformDescription);
            container.appendChild(platformCard);
        });
    }

    createPlatformCards(platformsData, 'platformsList');

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
