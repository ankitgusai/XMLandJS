const { getAll } = require('./api/usersController');

const renderTable = (data, _name, _gender, _favoriteAnimal) => {
  const tableBody = document.getElementById("table-body");

  if (!tableBody) {
    throw new Error("No table element found");
  }

  let source = data;

  if (_name) {
    source = source.filter(({ name }) => _name.toLowerCase().includes(name));
  }

  if (_gender) {
    source = source.filter(({ gender }) => _gender.toLowerCase().includes(gender));
  }
  
  if (_favoriteAnimal) {
    source = source.filter(({ favoriteAnimal }) => _favoriteAnimal.toLowerCase().includes(favoriteAnimal));
  }


  const rows = source.reduce(
    (acc, { guid, name, favoriteAnimal, address }) =>
      acc +
      `<tr id="table-row-${guid}">
          <td>${guid}</td>
          <td>${name}</td>
          <td>${favoriteAnimal}</td>
          <td>${address}</td></tr>`,
    ``
  );

  tableBody.innerHTML = rows;
};

const onSubmit = (event) => {
  event.preventDefault();

  const name = event.target.name.value;
  const gender = event.target.gender.value;
  const favoriteAnimal = event.target.favoriteAnimal.value;
  

  getAll().then(({ data }) => renderTable(data, name, gender, favoriteAnimal));
};

const onReset = () => {
  getAll().then(({ data }) => renderTable(data));
};


getAll().then(({ data }) => renderTable(data));