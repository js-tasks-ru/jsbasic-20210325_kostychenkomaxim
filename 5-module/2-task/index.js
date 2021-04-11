function toggleText() {
  // ваш код...
  const buttonRef = document.querySelector('button');
  const message = document.getElementById('text');
  buttonRef.addEventListener('click', () => {
    message.hidden = !message.hidden;
  });
}
