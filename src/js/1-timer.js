import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

document.addEventListener("DOMContentLoaded", () => {
  let userSelectedDate = 0;
  let intervalId = null;
  let dif = null;
  let timerFinished = false; // Змінна для перевірки чи показано повідомлення

  const input = document.querySelector("#datetime-picker");
  const btnStart = document.querySelector("button[data-start]");
  const days = document.querySelector("[data-days]");
  const hours = document.querySelector("[data-hours]");
  const minutes = document.querySelector("[data-minutes]");
  const seconds = document.querySelector("[data-seconds]");

  // Функція для додавання нуля, якщо число менше 10
  function addLeadingZero(value) {
    return String(value).padStart(2, "0");
  }

  // Функція для конвертації мілісекунд у дні, години, хвилини і секунди
  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
  }

  const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      userSelectedDate = selectedDates[0];

      if (userSelectedDate <= new Date()) {
        iziToast.show({
          title: "Помилка",
          message: "Please choose a date in the future",
          position: "topRight",
          backgroundColor: "#ff0000",
          timeout: 3000,
        });

        btnStart.setAttribute("disabled", "");
        userSelectedDate = 0;
      } else {
        btnStart.removeAttribute("disabled");
      }
    },
  };

  if (!input) {
    console.error("Елемент #datetime-picker не знайдено!");
    return;
  }

  flatpickr(input, options);

  // Запуск таймера
  btnStart.addEventListener("click", () => {
    if (!userSelectedDate) {
      iziToast.show({
        title: "Помилка",
        message: "Please choose a valid future date",
        position: "topRight",
        backgroundColor: "#ff0000",
        timeout: 3000,
      });
      return;
    }

    // Якщо таймер вже запущений або завершений, нічого не робимо
    if (intervalId || timerFinished) {
      return;
    }

    // Дезактивуємо інпут та кнопку після запуску таймера
    input.setAttribute("disabled", "");
    btnStart.setAttribute("disabled", "");

    intervalId = setInterval(() => {
      const currentTime = new Date();
      dif = userSelectedDate - currentTime;

      if (dif <= 0) {
        clearInterval(intervalId);
        btnStart.setAttribute("disabled", "");
        input.removeAttribute("disabled");

        if (!timerFinished) {
          iziToast.show({
            title: "Timer Finished",
            message: "The time has arrived!",
            position: "topRight",
            backgroundColor: "#28a745",
            timeout: 3000,
          });

          timerFinished = true;
        }
        return;
      }

      // Використовуємо функцію convertMs для отримання днів, годин, хвилин, секунд
      const { days: daysLeft, hours: hoursLeft, minutes: minutesLeft, seconds: secondsLeft } = convertMs(dif);

      // Форматування часу з додаванням нуля
      days.textContent = addLeadingZero(daysLeft);
      hours.textContent = addLeadingZero(hoursLeft);
      minutes.textContent = addLeadingZero(minutesLeft);
      seconds.textContent = addLeadingZero(secondsLeft);
    }, 1000);
  });
});
