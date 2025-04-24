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
    this._elem = document.createElement('table');

    const thead = document.createElement('thead');
    thead.innerHTML = `
      <tr>
        <th>Имя</th>
        <th>Возраст</th>
        <th>Зарплата</th>
        <th>Город</th>
        <th></th>
      </tr>
    `;
    this._elem.appendChild(thead);

    const tbody = document.createElement('tbody');
    this._elem.appendChild(tbody);

    this._renderRows(rows);
    this._elem.addEventListener('click', this._onClickDelete.bind(this));
  }

  get elem() {
    return this._elem;
  }

  _renderRows(rows) {
    const tbody = this._elem.querySelector('tbody');

    rows.forEach(row => {
      const tr = document.createElement('tr');

      tr.innerHTML = `
        <td>${row.name}</td>
        <td>${row.age}</td>
        <td>${row.salary}</td>
        <td>${row.city}</td>
        <td><button>X</button></td>
      `;

      tbody.appendChild(tr);
    });
  }

  _onClickDelete(event) {
    if (event.target.tagName === 'BUTTON') {
      const tr = event.target.closest('tr');
      if (tr) {
        tr.remove();
      }
    }
  }
}