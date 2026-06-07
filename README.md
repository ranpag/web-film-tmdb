<div align="center">
  <img src="https://raw.githubusercontent.com/ranpag/web-film-tmdb/main/preview.png" alt="web-film-tmdb preview" width="900" />
</div>

<br>

# 🎬 web-film-tmdb

A movie discovery web application built with React and Vite, powered by the [TMDB API](https://www.themoviedb.org/documentation/api). This project was developed as a final assignment for a React course, covering real-world concepts such as state management with Redux, client-side routing, and consuming a third-party REST API.
 
**Live demo →** [ranpag.github.io/web-film-tmdb](https://ranpag.github.io/web-film-tmdb/)

<br>

## Features

- Browse movies by genre, popularity, and top rated
- Search and explore people (actors, directors)
- View detailed movie information including cast and overview
- Save movies to favorites, watchlist, and rated list (persisted locally)
- Light and dark theme toggle
- Fully responsive layout

<br>

## Tech stack

| Category | Technology |
|---|---|
| Framework | React 18 + Vite |
| Styling | Tailwind CSS |
| State management | Redux (actions + reducers) |
| Routing | React Router |
| API | TMDB REST API |
| Deployment | GitHub Pages + GitHub Actions |

<br>

## Project structure

```
web-film-tmdb/
├── .github/
│   └── workflows/          # CI/CD GitHub Actions pipeline
├── public/
│   └── 404.html            # Custom fallback for GitHub Pages SPA routing
├── src/
│   ├── assets/             # Static assets (images, icons)
│   ├── components/         # Reusable UI components
│   │   ├── Card.jsx
│   │   ├── Footer.jsx
│   │   ├── Navbar.jsx
│   │   └── SeeMoreCard.jsx
│   ├── lib/
│   │   └── api.js          # TMDB API client and endpoint helpers
│   ├── pages/              # Feature-based page modules
│   │   ├── detail/         # Movie detail page
│   │   ├── error/          # 404 error page
│   │   ├── explore/        # Browse by genre and people
│   │   ├── favorite/       # Favorited movies
│   │   ├── home/           # Landing / homepage
│   │   ├── movie/          # Movie list views
│   │   ├── rated/          # Rated movies
│   │   └── watchlist/      # Watchlist page
│   ├── stores/
│   │   ├── actions/        # Redux action creators
│   │   ├── reducers/       # Redux reducers
│   │   └── store.js        # Redux store configuration
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── setup.sh                # One-command setup script
├── tailwind.config.js
└── vite.config.js
```

<br>

## Getting started

### Prerequisites

- Node.js `>= 18.x`
- npm `>= 9.x`
- A TMDB API key — get one free at [themoviedb.org](https://www.themoviedb.org/settings/api)

### Installation

**Option A — using the setup script (recommended)**

```bash
git clone https://github.com/ranpag/web-film-tmdb.git
cd web-film-tmdb
chmod +x setup.sh && ./setup.sh
```

**Option B — manual setup**

```bash
# 1. Clone the repository
git clone https://github.com/ranpag/web-film-tmdb.git
cd web-film-tmdb

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
```

### Environment variables

Open `.env` and fill in your credentials:

```env
TMDB_API_KEY=your_tmdb_api_key_here
```

| Variable | Description | Required |
|---|---|---|
| `TMDB_API_KEY` | Your TMDB v3 API key | ✅ |

> You can obtain a free API key by creating an account at [themoviedb.org](https://www.themoviedb.org/settings/api).

### Running the app

```bash
# Start development server
npm run dev

# or Build
npm run build

# Run build
npm run preview
```

The app will be available at `http://localhost:5173` by default.

<br>

## Deployment

This project is deployed automatically to GitHub Pages via GitHub Actions on every push to the `main` branch. The workflow is defined in `.github/workflows/`.

<br>

## License

Distributed under the MIT License. See [`LICENSE`](./LICENSE) for more information.

<br>

## Acknowledgements

This project was built as part of a structured React learning program. Special thanks to:

- [TMDB](https://www.themoviedb.org/) for providing a comprehensive and free movie database API
- The React and Vite communities for excellent documentation and tooling

> This product uses the TMDB API but is not endorsed or certified by TMDB.

---

<div align="center">
  <sub>Made by ranpag as a final project — 2024</sub>
</div>
