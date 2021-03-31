function makeDiagonalRed(table) {
  // ваш код...
  for (let i = 0, row; row = table.rows[i]; i++) {
    table.rows[i].cells[i].style.backgroundColor = 'red';
  }
}
