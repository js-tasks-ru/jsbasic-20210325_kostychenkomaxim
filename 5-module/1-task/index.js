function hideSelf() {
  // ваш код...
  const buttonRef = document.querySelector('button');
  buttonRef.addEventListener('click', () => {
    buttonRef.hidden = true;
  });
}
