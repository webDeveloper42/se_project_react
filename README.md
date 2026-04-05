# WTWR (What To Wear?)

## About the Project

**WTWR** is a React web application that uses real-time weather data to suggest clothing items appropriate for current weather conditions. Users can register, log in, manage their wardrobe, and like items they want to wear.

## Functionality

- Detects the user's location via the browser's Geolocation API and fetches live weather data
- Displays clothing recommendations filtered by current temperature (hot / warm / cold)
- Supports Fahrenheit ↔ Celsius toggle
- User registration and login with JWT-based authentication
- Token persisted in `localStorage` — users stay logged in across page loads
- Protected `/profile` route — only accessible when logged in
- Add, view, and delete clothing items
- Like / unlike clothing items (synced with backend)
- Edit profile name and avatar

## Technologies & Techniques

- **React 18** — functional components, hooks (`useState`, `useEffect`, `useContext`)
- **React Router v6** — client-side routing with a protected route
- **Context API** — `CurrentUserContext` and `CurrentTemperatureUnitContext`
- **JWT Authentication** — token stored in `localStorage`, sent as `Bearer` header
- **OpenWeatherMap API** — live weather data by coordinates
- **Vite** — development server and bundler
- **BEM methodology** — CSS class naming convention
- **Custom hooks** — `useFormWithValidation` for form state and validation

## Backend Repository

[Link to backend repository](https://github.com/webDeveloper42/se_project_express)

## Demo

[Watch the project demo](https://www.loom.com/share/1e3f620fca114d8da3b0b22288aad406)
