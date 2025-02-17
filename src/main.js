import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.search-form');
  const inputField = document.querySelector("input[name='searchQuery']");
  const loader = document.querySelector('.loader');
  const gallery = document.querySelector('.gallery');

  if (!form || !inputField || !loader || !gallery) {
    console.error('One or more necessary elements are missing!');
    return;
  }

  form.addEventListener('submit', async event => {
    event.preventDefault();
    const query = inputField.value.trim();

    if (!query) {
      iziToast.error({
        title: 'Error',
        message: 'Please enter a search term!',
        position: 'topRight',
      });
      return;
    }

    gallery.innerHTML = '';
    loader.style.display = 'block';

    try {
      const images = await fetchImages(query);
      loader.style.display = 'none';

      if (images.length === 0) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return;
      }
      renderGallery(images);
    } catch (error) {
      loader.style.display = 'none';
      iziToast.error({
        message: 'Something went wrong. Please try again!',
        position: 'topRight',
      });
      console.error('Fetch error:', error);
    }
  });

  inputField.addEventListener('input', () => {
    inputField.style.border = inputField.value.trim()
      ? '2px solid blue'
      : '1px solid #808080';
  });
});
