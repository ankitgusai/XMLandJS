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
        ({ nodeName }) => nodeName === `person`
    );

    nodes.map((node) => {
        table.appendChild(
            htmlToElement(generateTableRow(node))
        )
    }
    );
};

const getElementText = (node, elementTag) => {
    return Array.from(node.getElementsByTagName(elementTag))[0].textContent;
  }
  

const generateTableRow = (item) => {
    const id = item.attributes[0].textContent;
    const firstname = getElementText(item, 'first_name');
    const lastname = getElementText(item, 'last_name');
    const email = getElementText(item, 'email');
    const gender = getElementText(item, 'gender');
    const ip_address = getElementText(item, 'ip_address');
  
    return `<tr>
      <td>${id}</td>
      <td>${firstname} ${lastname}</td>
      <td>${email}</td>
      <td>$${gender}</td>
      <td>$${ip_address}</td>
    </tr>`;
  };


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


fetchData('http://localhost:8080/assignments/people.xml', renderTable)