document.addEventListener('DOMContentLoaded', () => {
  const timerLink = document.querySelector('a[href="/1-timer.html"]');
  const promiseLink = document.querySelector('a[href="/2-snackbar.html"]');

  timerLink.addEventListener('click', e => {
    console.log('Redirecting to Gallery');
  });

  promiseLink.addEventListener('click', e => {
    console.log('Redirecting to User Form');
  });
});
