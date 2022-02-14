const htmlToElement = (html) => {
  const template = document.createElement("template");
  html = html.trim(); // Never return a text node of whitespace as the result
  template.innerHTML = html;
  return template.content.firstChild;
};

const renderTable = (xmlData) => {
  const table = document.getElementById("table-main");

  if (!table) {
    throw new Error("No table element found");
  }
const nodes = Array.from(xmlData.documentElement.childNodes).filter(
    ({ nodeName }) => nodeName === `student`
  );

  nodes.map((node) => {
    table.appendChild(
      htmlToElement(generateTableRow(node))
    )
  }
  );
};

const generateTableRow = (item) => {
const rollNumber = item.attributes[0].textContent;
  const firstname = getElementText(item, 'firstname');
  const lastname = getElementText(item, 'lastname');
  const nickname = getElementText(item, 'nickname');
  const marks = getElementText(item, 'marks');

  return `<tr>
    <td>${rollNumber}</td>
    <td>${firstname} ${lastname}</td>
    <td>${nickname}</td>
    <td>$${marks}</td>
  </tr>`;
};

const getElementText = (node, elementTag) => {
  return Array.from(node.getElementsByTagName(elementTag))[0].textContent;
}

const fetchData = (url, renderCallback) => {
  const xhttp = new XMLHttpRequest();

  xhttp.onreadystatechange = ({ target }) => {
    if (target.readyState == 4 && target.status == 200) {
      renderCallback(target.responseXML);
    }
  };
  xhttp.open("GET", url, true);
  xhttp.send();

}


fetchData('http://localhost:8080/assignments/students.xml', renderTable)