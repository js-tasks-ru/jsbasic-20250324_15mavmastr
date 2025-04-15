function highlight(table) {
  for (let row of table.tBodies[0].rows) {
    const ageCell = row.cells[1];
    const genderCell = row.cells[2];
    const statusCell = row.cells[3];

    if (statusCell.hasAttribute('data-available')) {
      if (statusCell.dataset.available === 'true') {
        row.classList.add('available');
      } else {
        row.classList.add('unavailable');
      }
    } else {
      row.hidden = true;
    }

    if (genderCell.textContent === 'm') {
      row.classList.add('male');
    } else if (genderCell.textContent === 'f') {
      row.classList.add('female');
    }

    if (parseInt(ageCell.textContent, 10) < 18) {
      row.style.textDecoration = 'line-through';
    }
  }
}