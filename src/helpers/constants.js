

export const options = {
  method: 'GET',
  url: 'https://flight-radar1.p.rapidapi.com/flights/list-in-boundary',
  params: {
    bl_lat: '34.048175',
    bl_lng: '24.692942',
    tr_lat: '43.016756',
    tr_lng: '45.654855',
    limit: '300'
  },
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
    'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
  }
};

export const options2 = {

  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
    'X-RapidAPI-Host': 'flight-radar1.p.rapidapi.com'
  }
};