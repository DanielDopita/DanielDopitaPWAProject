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
});
