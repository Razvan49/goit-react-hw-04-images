const API_KEY = '40063941-d21e853174aec231e07e7c8ff'; // Cheia personală
const BASE_URL = 'https://pixabay.com/api/';
const PICS_ON_PAGE = 12;

// Funcția pentru obținerea căutării
export const getSearch = (searchText, page) => {
  // Parametrii pentru cerere
  const params = new URLSearchParams({
    q: searchText,
    page: page,
    key: API_KEY,
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: PICS_ON_PAGE,
  });

  return fetch(`${BASE_URL}?${params}`);
};
