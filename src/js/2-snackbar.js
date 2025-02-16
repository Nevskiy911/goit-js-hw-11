import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Отримуємо елементи форми
const form = document.querySelector('.form');
const delayInput = form.querySelector('input[name="delay"]');
const stateRadios = form.querySelectorAll('input[name="state"]');

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const delay = parseInt(delayInput.value, 10);
  const state = Array.from(stateRadios).find(radio => radio.checked)?.value;

  if (isNaN(delay) || !state) {
    iziToast.error({ message: 'Please provide valid input.' });
    return;
  }

  // Створюємо проміс
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  // Обробка виконання промісу
  promise
    .then((fulfilledDelay) => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${fulfilledDelay}ms`,
        position: "topCenter",
        progressBar: true, 
        close: false, 
        icon: "", 
        iconUrl: "", 
      });
    })
    .catch((rejectedDelay) => {
      iziToast.error({
        maxWidth: "383px",
        message: `❌ Rejected promise in ${rejectedDelay}ms`,
        position: "topRight",
        progressBar: true, 
        close: false, 
        icon: "", 
        iconUrl: "", 
      });
    });
});


iziToast.show({
  title: "Success",
  message: "Your message here",

});