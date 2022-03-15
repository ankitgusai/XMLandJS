const loadData = (path) =>
    new Promise((resolve) => {
        const xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = ({ target }) => {
            if (target.readyState == 4 && target.status == 200) {
                resolve(JSON.parse(target.response));
            }
        };
        xhttp.open("GET", path, true);
        xhttp.send();
    });

const htmlToElement = (html) => {
    const template = document.createElement("template");
    html = html.trim(); // Never return a text node of whitespace as the result
    template.innerHTML = html;
    return template.content.firstChild;
};

const renderTable = (data, fName, lName, email, gender, ip) => {
    console.log(typeof data)

    const table = document.getElementById("table-body");

    if (!table) {
        throw new Error("No table element found");
    }

    const inputFname = document.getElementById(`input-fname`);
    const inputLname = document.getElementById(`input-lanme`);
    const inputEmail = document.getElementById(`input-email`);
    const inputGender = document.getElementById(`input-gender`);
    const inputIP = document.getElementById(`input-ip`);

    let source = data;


    if (fName != undefined && fName.length > 0) {
        inputFname.value = fName;
        source = source.filter(({ first_name }) => 
        first_name.toLowerCase().includes(fName)
        );

    }

    if (lName != undefined && lName.length > 0) {
        inputLname.value = lName;
        source = source.filter(({ last_name }) => last_name.toLowerCase().includes(lName));

    }

    if (email != undefined && email.length > 0) {
        inputEmail.value = email;
        source = source.filter(({ email }) => email.toLowerCase().includes(email));

    }

    if (gender != undefined && gender.length > 0) {
        inputGender.value = gender;
        source = source.filter(({ gender }) => gender.toLowerCase().includes(gender));

    }

    if (ip != undefined && ip.length > 0) {
        inputIP.value = ip;
        source = source.filter(({ ip_address }) => ip_address.toLowerCase().includes(ip));

    }

    const rows = source.reduce(
        (acc, row) =>
          acc +
          `<tr><td>${row.id}</td>` +
          `<td>${row.first_name}</td>` +
          `<td>${row.last_name}</td>` +
          `<td>${row.email}</td>` +
          `<td>${row.gender}</td>` +
          `<td>${row.ip_address}</td></tr>`,
        ``
      );
    
      table.innerHTML = rows;

};

const onSubmit = (event) => {
    event.preventDefault();

    const fname = event.target.first_name.value;
    const lname = event.target.last_name.value;
    const email = event.target.email.value;
    const gender = event.target.gender.value;
    const ip = event.target.ip_address.value;

    loadData(`./data.json`).then((data) => renderTable(data, fname, lname, email, gender, ip));
};

const onReset = () => {
    loadData(`./data.json`)
        .then(
            (data) => renderTable(data)
        );
};


loadData(`./data.json`)
    .then((data) => {
        console.log(typeof data)
        renderTable(data)
    }
    );

