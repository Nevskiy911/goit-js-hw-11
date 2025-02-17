import axios from 'axios';

const API_KEY = '48883133-b45715c17a0625272bb81a0a3';
const BASE_URL = 'https://pixabay.com/api/';

export function fetchImages(query) {
  return axios
    .get(
      `${BASE_URL}?key=${API_KEY}&q=${query}&image_type=photo&orientation=horizontal&safesearch=true`
    )
    .then(response => response.data.hits)
    .catch(error => {
      console.error('Error fetching images:', error);
      return [];
    });
}
