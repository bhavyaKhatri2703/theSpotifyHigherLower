import axios from 'axios'

const clientId = import.meta.env.VITE_SPOTIFY_CLIENT_ID;
const clientSecret = import.meta.env.VITE_SPOTIFY_CLIENT_SECRET;


export const getToken = async () => {
    const result = await axios.post('https://accounts.spotify.com/api/token', 
      'grant_type=client_credentials', {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(clientId + ':' + clientSecret)
      }
    });
    return result.data.access_token;
  };

  export const getRandomArtist = async () => {
    setTimeout(()=>{

    }, 3000)
    const token = await getToken();
  
    
    const genres = ['pop', 'rock', 'hip-hop', 'electronic', 'indie'];
    const randomGenre = genres[Math.floor(Math.random() * genres.length)];
  
    const result = await axios.get(`https://api.spotify.com/v1/search?q=genre:${randomGenre}&type=artist&limit=50`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  
    const artists = result.data.artists.items;
  
    
    const artist = artists[Math.floor(Math.random() * artists.length)];
    

    return artist
  };

 
  