document.addEventListener('DOMContentLoaded', function () {
  const platformsData = [
    { name: 'PC', description: 'Personal Computer gaming platform' },
    { name: 'PlayStation', description: 'Sony gaming console' },
    { name: 'Xbox', description: 'Microsoft gaming console' },
    { name: 'Nintendo Switch', description: 'Hybrid gaming console by Nintendo' }
  ];

  const platformsList = document.getElementById('platformsList');
  const nameInput = document.getElementById('platformName');
  const descriptionInput = document.getElementById('platformDescription');
  const createButton = document.getElementById('createButton');
  const updateButton = document.getElementById('updateButton');
  const deleteButton = document.getElementById('deleteButton');

  // Function to render platforms list
  function renderPlatforms() {
    platformsList.innerHTML = '';
    platformsData.forEach((platform, index) => {
      const platformCard = document.createElement('div');
      platformCard.classList.add('col', 's12', 'm6', 'l4');
      platformCard.innerHTML = 
        `<div class="card blue-grey darken-1">
          <div class="card-content white-text">
            <span class="card-title">${platform.name}</span>
            <p>${platform.description}</p>
          </div>
        </div>`;
      platformCard.addEventListener('click', () => loadPlatform(index));
      platformsList.appendChild(platformCard);
    });
  }

  // Load platform data into form for editing or deletion
  function loadPlatform(index) {
    const platform = platformsData[index];
    nameInput.value = platform.name;
    descriptionInput.value = platform.description;
    
    // Change button visibility for Update/Delete
    createButton.style.display = 'none';
    updateButton.style.display = 'block';
    deleteButton.style.display = 'block';

    updateButton.onclick = () => updatePlatform(index);
    deleteButton.onclick = () => deletePlatform(index);
  }

  // Create new platform
  function createPlatform() {
    const name = nameInput.value.trim();
    const description = descriptionInput.value.trim();
    if (name && description) {
      platformsData.push({ name, description });
      renderPlatforms();
      nameInput.value = '';
      descriptionInput.value = '';
    } else {
      alert('Please fill out both fields.');
    }
  }

  // Update platform
  function updatePlatform(index) {
    const name = nameInput.value.trim();
    const description = descriptionInput.value.trim();
    if (name && description) {
      platformsData[index] = { name, description };
      renderPlatforms();
      nameInput.value = '';
      descriptionInput.value = '';
      createButton.style.display = 'block';
      updateButton.style.display = 'none';
      deleteButton.style.display = 'none';
    } else {
      alert('Please fill out both fields.');
    }
  }

  // Delete platform
  function deletePlatform(index) {
    platformsData.splice(index, 1);
    renderPlatforms();
    nameInput.value = '';
    descriptionInput.value = '';
    createButton.style.display = 'block';
    updateButton.style.display = 'none';
    deleteButton.style.display = 'none';
  }

  // Event listeners for CRUD actions
  createButton.addEventListener('click', createPlatform);

  renderPlatforms();
});
