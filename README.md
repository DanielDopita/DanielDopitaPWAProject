# DanielDopitaPWAProject

## Video Game Database PWA

### Project Description
The Video Game Database is a Progressive Web Application (PWA) designed to provide users with easy access to information about video games, genres, and platforms. Built using HTML, Materialize CSS, and JavaScript, the application features a responsive user interface that includes a carousel for popular games, navigation through different sections, and a mobile-friendly design.

### Features
- **Responsive Design**: The layout adapts to different screen sizes, from desktop to mobile.
- **Materialize CSS**: Utilizes a modern front-end framework for layout and components.
- **Carousel**: Showcases popular games with a carousel slider.
- **Sticky Navigation**: Features a sticky top navigation bar for easy access to all sections.
- **Mobile Support**: Includes a collapsible sidenav for better navigation on mobile devices.
- **PWA Functionality**: Offers offline support and installability through service workers and a manifest file.

### Technologies Used
- **HTML5**: Structure and content of the app.
- **CSS3**: Styling, utilizing Materialize CSS for design and layout.
- **Materialize CSS**: Pre-built CSS and JS for responsive design, navigation, and carousel features.
- **JavaScript**: Adds interactivity to the carousel and mobile sidenav.
- **Firebase**: Cloud-based NoSQL database used for storing and syncing game data in real-time.
- **IndexedDB**: Local storage solution for saving data while offline, which syncs with Firebase once online.

### Firebase and IndexedDB Integration
The application integrates **Firebase** and **IndexedDB** to handle data storage, enabling both **online** and **offline** functionality:

- **Firebase**: When the app is online, data is stored in Firebase, providing real-time synchronization across devices. Data is saved under the "games" collection in Firebase, and the Firebase IDs are generated automatically upon successful data submission.
- **IndexedDB**: When the app is offline, data is stored locally using IndexedDB, ensuring that the user can still interact with the app and add new entries. Once the app detects an internet connection, it syncs the locally stored data with Firebase.

### CRUD Operations (Online and Offline Modes)
The app supports CRUD (Create, Read, Update, Delete) operations for game data, working in both **online** and **offline** modes:

1. **Create**: Users can add new game records. When online, these are sent to Firebase. When offline, they are stored locally in IndexedDB until the connection is restored.
   
   Example:
   ```javascript
   const newGame = { title: 'Cyberpunk 2077', genre: 'RPG', platform: 'PC' };
   createGameRecord(newGame);
The createGameRecord function checks if the app is online. If yes, it adds the game data to Firebase. If not, it stores the data in IndexedDB for later syncing.

Read: Users can view game data from Firebase or IndexedDB. Data is displayed based on availability: if online, it loads from Firebase; if offline, it loads from IndexedDB.

Update: When a game record is modified, changes are sent to Firebase when the app is online. If offline, the changes are stored in IndexedDB until the app can sync with Firebase.

Delete: Users can remove game records, which will be deleted from both Firebase and IndexedDB once online. If offline, the records are marked for deletion and will be removed when the app reconnects.

Synchronization Process
The synchronization process ensures that data is kept consistent across online and offline sessions:

Data Storage: When the app is online, game data is added directly to Firebase. If the app is offline, data is stored in IndexedDB.
Syncing Data: Once the app reconnects to the internet, it automatically syncs the data stored in IndexedDB with Firebase. New records are added, updates are pushed, and deletions are reflected in Firebase.
Firebase IDs: Firebase generates unique IDs for each game record. When the app syncs offline data with Firebase, the locally stored data is updated with the Firebase-generated IDs, ensuring that both databases remain in sync.
Service Worker
The service worker is a script that runs in the background, enabling the app to manage caching and offline functionality.

Key Features:
Caching of Essential Resources: The service worker caches critical assets, including HTML, CSS, and JavaScript files, to ensure the app is accessible offline.
Fetch Event Handling: It intercepts network requests to serve cached resources when the network is unavailable.
Caching Strategy
The caching strategy used in this PWA is a "Cache First" approach. This means:

Initial Load: When the app is first loaded, the service worker caches all specified resources.
Subsequent Loads: For all network requests, the service worker checks the cache first and serves resources immediately if available; otherwise, it fetches from the network.
Cached Resources:
index.html
about.html
genres.html
platforms.html
materialize.min.css
style.css
materialize.min.js
Images and icons used in the application.
Web App Manifest
The manifest file (manifest.json) provides metadata about the PWA, enhancing user experience when the app is installed.

Key Properties:
name: The name of the app.
short_name: A shorter version of the app name for the home screen.
description: A brief description of the app's purpose.
icons: Specifies the icons used for the app in various sizes.
start_url: The initial page that loads when the app is opened.
display: Set to standalone to provide a native-like feel.
background_color and theme_color: Ensure colors match the app's design.
Testing
To test the PWA functionality:

Open the app in a web browser.
Use Chrome DevTools (F12) to simulate offline mode.
Ensure the app remains functional without an internet connection.