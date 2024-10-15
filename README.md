

# Artist Comparison Game

## Overview

The Artist Comparison Game interactive game where players guess whether an artist has a higher or lower number of followers than another artist. 

## Technologies Used

- React
- Vite
- Tailwind CSS
- Spotify API (for fetching random artists)

## Getting Started

To run this project locally, follow these steps:

### Prerequisites

- Node.js (v14 or above)
- npm or yarn

### Installation

1. **Clone the repository:**

   ```bash
   git clone <your-repo-url>
   cd <your-repo-directory>
   ```

2. **Install the dependencies:**

   Using npm:
   ```bash
   npm install
   ```

   Or using yarn:
   ```bash
   yarn install
   ```

3. **Set up the Spotify API:**

   - Create a Spotify Developer account if you don't have one.
   - Create a new app in the Spotify Developer Dashboard.
   - Get your `Client ID` and `Client Secret`.
   - Set up your `getRandomArtist` function in `spotifyService.js` to fetch data from the Spotify API using your credentials.

### Running the App

1. **Start the development server:**

   Using npm:
   ```bash
   npm run dev
   ```

   Or using yarn:
   ```bash
   yarn dev
   ```

2. **Open your browser:**

   Navigate to `http://localhost:3000` (or the specified port) to see the game in action.

 
