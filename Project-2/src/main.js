const { getAll } = require('./api/usersController');

const renderTable = (data, _name, _gender, _favoriteAnimal) => {
  const tableBody = document.getElementById("table-body");

  if (!tableBody) {
    throw new Error("No table element found");
  }

  const rows = data.reduce(
    (acc, { guid, name, gender, favoriteAnimal, address }) =>
      acc +
      `<tr id="table-row-${guid}">
          <td>${guid}</td>
          <td>${name}</td>
          <td>${favoriteAnimal}</td>
          <td>${gender}</td>
          <td>${address}</td></tr>`,
    ``
  );

  tableBody.innerHTML = rows;
};

global.onSubmit = function(event) {
  event.preventDefault();

  const name = event.target.name.value;
  const gender = event.target.gender.value;
  const favoriteAnimal = event.target.favoriteAnimal.value;
  

  getAll({name:name, gender:gender, favoriteAnimal:favoriteAnimal}).then(({ data }) => renderTable(data));
};

global.onReset = function() {
  getAll().then(({ data }) => renderTable(data));
  
}


getAll().then(({ data }) => renderTable(data));

