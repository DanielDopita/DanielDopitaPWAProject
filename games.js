import { addToIndexedDB } from './indexedDB.js';
import { addToFirebase } from './firebaseDB.js';

document.addEventListener('DOMContentLoaded', function() {
  const gamesData = [
    { title: "Baldur's Gate 3", genre: 'RPG', price: '$59.99', imgSrc: 'game1.jfif' },
    { title: 'The Legend of Zelda: Tears of the Kingdom', genre: 'Action-Adventure', price: '$69.99', imgSrc: 'game2.jfif' },
    { title: 'Resident Evil 4', genre: 'Horror', price: '$59.99', imgSrc: 'game3.jfif' }
  ];

  const gamesListSection = document.getElementById('gamesList');
  gamesListSection.style.display = 'flex';
  gamesListSection.style.flexWrap = 'wrap';

  gamesData.forEach(game => {
    const gameCard = document.createElement('div');
    gameCard.className = 'col s12 m6 l4';
    gameCard.innerHTML = 
      `<div class="card">
        <div class="card-image">
          <img src="${game.imgSrc}" alt="${game.title}" class="responsive-img">
        </div>
        <div class="card-content">
          <p><strong>${game.title}</strong></p>
          <p>Genre: ${game.genre}</p>
          <p>Price: ${game.price}</p>
        </div>
      </div>`;
    gamesListSection.appendChild(gameCard);
  });

  // Add event listener for create, update, and delete buttons
  document.getElementById('createGameButton').addEventListener('click', function() {
    const newGame = {
      title: document.getElementById('gameTitle').value,
      genre: document.getElementById('gameGenre').value,
      price: document.getElementById('gamePrice').value,
      imgSrc: document.getElementById('gameImg').value
    };
    createGameRecord(newGame);
  });

  document.getElementById('updateGameButton').addEventListener('click', function() {
    const updatedGame = {
      title: document.getElementById('gameTitle').value,
      genre: document.getElementById('gameGenre').value,
      price: document.getElementById('gamePrice').value,
      imgSrc: document.getElementById('gameImg').value
    };
    updateGameRecord(updatedGame);
  });

  document.getElementById('deleteGameButton').addEventListener('click', function() {
    const gameTitle = document.getElementById('gameTitle').value;
    deleteGameRecord(gameTitle);
  });
});

async function createGameRecord(gameData) {
  if (navigator.onLine) {
    try {
      const docId = await addToFirebase('games', gameData);
      console.log('Data added to Firebase with ID:', docId);
    } catch (error) {
      console.error('Error adding to Firebase:', error);
    }
  } else {
    try {
      await addToIndexedDB('games', gameData);
      console.log('Data added to IndexedDB for later syncing');
    } catch (error) {
      console.error('Error adding to IndexedDB:', error);
    }
  }
}

async function updateGameRecord(gameData) {
  // Implement logic for updating game records in Firebase or IndexedDB
}

async function deleteGameRecord(gameTitle) {
  // Implement logic for deleting game records from Firebase or IndexedDB
}
