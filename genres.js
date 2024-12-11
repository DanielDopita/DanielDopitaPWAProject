import { addToIndexedDB } from './indexedDB.js';
import { addToFirebase } from './firebaseDB.js';

document.addEventListener('DOMContentLoaded', function() {
  const genresData = [
    { name: 'Action', description: 'Fast-paced games focused on physical challenges' },
    { name: 'Adventure', description: 'Games focused on exploration and narrative' },
    { name: 'Role-Playing', description: 'Games with in-depth character development' },
    { name: 'Strategy', description: 'Games focused on tactical gameplay' }
  ];

  const genresListSection = document.getElementById('genresList');
  genresListSection.style.display = 'flex';
  genresListSection.style.flexWrap = 'wrap'; // Allow genres to wrap

  genresData.forEach(genre => {
    const genreCard = document.createElement('div');
    genreCard.className = 'col s12 m6 l4'; // Materialize grid classes for responsiveness
    genreCard.innerHTML = 
      `<div class="card">
        <div class="card-content">
          <p><strong>${genre.name}</strong></p>
          <p>${genre.description}</p>
        </div>
      </div>`;
    genresListSection.appendChild(genreCard);
  });

  // Example: Create a new genre record
  const newGenre = { name: 'Simulation', description: 'Games that mimic real-world activities' };
  createGenreRecord(newGenre);
});

async function createGenreRecord(genreData) {
  if (navigator.onLine) {
    try {
      const docId = await addToFirebase('genres', genreData);
      console.log('Data added to Firebase with ID:', docId);
    } catch (error) {
      console.error('Error adding to Firebase:', error);
    }
  } else {
    try {
      await addToIndexedDB('genres', genreData);
      console.log('Data added to IndexedDB for later syncing');
    } catch (error) {
      console.error('Error adding to IndexedDB:', error);
    }
  }
}
