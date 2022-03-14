const htmlToElement = (html) => {
  const template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
};

const loadData = (path, callback) => {
  const xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = ({ target }) => {
    if (target.readyState == 4 && target.status == 200) {
      callback(JSON.parse(target.response));
    }
  };
  xhttp.open("GET", path, true);
  xhttp.send();
};

const renderTable = (data) => {
  const table = document.getElementById("table-main");

  if (!table) {
    throw new Error("No table element found");
  }

  let source = data;

  const withFilters = Boolean(window.location.search);

  if (withFilters) {
    const params = new URLSearchParams(window.location.search);
    const nameTerm = params.get(`name`).toLowerCase();
    const inputControl = document.getElementById(`input-name-term`);
    inputControl.value = nameTerm;

    source = source.filter(({ name }) => name.toLowerCase().includes(nameTerm));
  }

  source.map(({ id, name, value }) =>
    table.appendChild(
      htmlToElement(
        `<tr id="table-row-${id}"><td>${id}</td><td>${name}</td><td>${value}</td></tr>`
      )
    )
  );
};

loadData(`./data.json`, (data) => renderTable(data));

const onReset = () => {
  window.location.replace(window.location.pathname);
};
