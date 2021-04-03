function highlight(table) {
  // ваш код...
  const rows = table.getElementsByTagName("tr");
  Array.from(rows).forEach(
    (row) => {
      const statusTd = row.getElementsByTagName('td')[3];
      const genderTd = row.getElementsByTagName('td')[2];            
      const ageTd = row.getElementsByTagName('td')[1];
      if (!statusTd.dataset.available) {
        row.hidden = true;
      }
      else if (statusTd.dataset.available === "true") {
        row.classList.add('available');
      } 
      else if (statusTd.dataset.available === "false") {
        row.classList.add('unavailable');
      } 
      
      if (genderTd.textContent === 'm') {
        row.classList.add('male');
      }
      else if (genderTd.textContent === 'f') {
        row.classList.add('female');
      }

      if (Number(ageTd.textContent) < 18) {
        row.style.textDecoration = 'line-through';
      }
    }
  );
}
