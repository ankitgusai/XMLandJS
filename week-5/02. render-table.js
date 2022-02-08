const htmlToElement = (html) => {
  const template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
};

const renderTable = () => {
  const table = document.getElementById("table-main");

  if (!table) {
    throw new Error("No table element found");
  }

  let data = [
    { id: 0, name: "apple", value: 3 },
    { id: 1, name: "banana", value: 5 },
    { id: 2, name: "carrots", value: 35 },
  ];

  const withFilters = Boolean(window.location.search);

  if (withFilters) {
    const params = new URLSearchParams(window.location.search);
    const nameTerm = params.get(`name`).toLowerCase();
    const inputControl = document.getElementById(`input-name-term`);
    inputControl.value = nameTerm;

    data = data.filter(({ name }) => name.toLowerCase().includes(nameTerm));
  }

  const rows = data.map(({ id, name, value }) =>
    table.appendChild(
      htmlToElement(
        `<tr id="table-row-${id}"><td>${id}</td><td>${name}</td><td>${value}</td></tr>`
      )
    )
  );
};

renderTable();
