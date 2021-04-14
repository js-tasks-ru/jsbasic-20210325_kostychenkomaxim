/**
 * Компонент, который реализует таблицу
 * с возможностью удаления строк
 *
 * Пример одного элемента, описывающего строку таблицы
 *
 *      {
 *          name: 'Ilia',
 *          age: 25,
 *          salary: '1000',
 *          city: 'Petrozavodsk'
 *      }
 *
 */
export default class UserTable {
  constructor(rows) {
    this.elem = document.createElement('table');
    this.elem.insertAdjacentHTML('afterbegin', tableCaption);
    this.tableBody = document.createElement('tbody');
    this.elem.appendChild(this.tableBody);

    rows.map(elem => {
      const row = document.createElement("tr");
    
      row.innerHTML = tableTd(elem);
      this.tableBody.appendChild(row);

      const buttonRef = row.querySelector('button');

      buttonRef.addEventListener('click', () => {
        buttonRef.closest('tr').remove();
      });

    });
  } 

}

const tableCaption =
  `<thead>
  <tr>
      <th>Имя</th>
      <th>Возраст</th>
      <th>Зарплата</th>
      <th>Город</th>
      <th></th>
  </tr>
`;

const tableTd = user => `<td>${user.name}</td><td>${user.age}</td><td>${user.salary}</td><td>${user.city}</td><td><button>X</button></td>`;