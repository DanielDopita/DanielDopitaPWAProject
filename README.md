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

### How to Use
- **Home**: Displays the main page featuring a carousel of popular games.
- **Games**: Navigate to a page that lists available games.
- **Genres**: Explore various game genres and their popular titles.
- **Platforms**: Learn more about different gaming platforms.
- **About**: Provides information about the project and its purpose.

### Service Worker
The service worker is a script that runs in the background, enabling the app to manage caching and offline functionality.

#### Key Features:
- **Caching of Essential Resources**: The service worker caches critical assets, including HTML, CSS, and JavaScript files, to ensure the app is accessible offline.
- **Fetch Event Handling**: It intercepts network requests to serve cached resources when the network is unavailable.

### Caching Strategy
The caching strategy used in this PWA is a "Cache First" approach. This means:
1. **Initial Load**: When the app is first loaded, the service worker caches all specified resources.
2. **Subsequent Loads**: For all network requests, the service worker checks the cache first and serves resources immediately if available; otherwise, it fetches from the network.

#### Cached Resources:
- `index.html`
- `about.html`
- `genres.html`
- `platforms.html`
- `materialize.min.css`
- `style.css`
- `materialize.min.js`
- Images and icons used in the application.

### Web App Manifest
The manifest file (`manifest.json`) provides metadata about the PWA, enhancing user experience when the app is installed.

#### Key Properties:
- **name**: The name of the app.
- **short_name**: A shorter version of the app name for the home screen.
- **description**: A brief description of the app's purpose.
- **icons**: Specifies the icons used for the app in various sizes.
- **start_url**: The initial page that loads when the app is opened.
- **display**: Set to `standalone` to provide a native-like feel.
- **background_color** and **theme_color**: Ensure colors match the app's design.

### Testing
To test the PWA functionality:
1. Open the app in a web browser.
2. Use Chrome DevTools (F12) to simulate offline mode.
3. Ensure the app remains functional without an internet connection.
