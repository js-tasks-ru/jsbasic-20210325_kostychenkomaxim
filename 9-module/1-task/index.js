export default function promiseClick(button) {
  // ваш код...
  return new Promise((resolve) => {
    button.addEventListener('click', (e) => {
      resolve(e);
    }, {once: true});
  });
}
