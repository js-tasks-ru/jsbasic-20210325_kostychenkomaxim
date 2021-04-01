function camelize(str) {
  // ваш код...
  return str.split('-').map((elem, index) => index !== 0 ? elem.charAt(0).toUpperCase() + elem.slice(1) : elem).join('');
}
