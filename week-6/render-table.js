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
      callback(target.responseXML);
    }
  };
  xhttp.open("GET", path, true);
  xhttp.send();
};

const generateTableRow = (item) => {
  const title = Array.from(item.getElementsByTagName(`title`))[0];
  const language = title.attributes[0].textContent;
  const authors = Array.from(item.getElementsByTagName(`author`)).map(
    ({ textContent }) => textContent
  );
  const year = Array.from(item.getElementsByTagName(`year`))[0];
  const price = Array.from(item.getElementsByTagName(`price`))[0];

  return `<tr>
    <td>${title.textContent}</td>
    <td>${language}</td>
    <td>${authors.join(`, `)}</td>
    <td>${year.textContent}</td>
    <td>$${price.textContent}</td>
  </tr>`;
};

const renderTable = (xmlData) => {
  const table = document.getElementById("table-main");

  if (!table) {
    throw new Error("No table element found");
  }

  const nodes = Array.from(xmlData.documentElement.childNodes).filter(
    ({ nodeName }) => nodeName === `book`
  );

  nodes.map((bookNode) =>
    table.appendChild(htmlToElement(generateTableRow(bookNode)))
  );
};

loadData(`http://localhost:8080/books.xml`, renderTable);

const onReset = () => {
  window.location.replace(window.location.pathname);
};
