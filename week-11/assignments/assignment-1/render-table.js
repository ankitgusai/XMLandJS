import data from "./data.json" assert { type: "json" };

let dataArray;

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

    const withFilters = Boolean(window.location.search);

    if (withFilters) {
        const params = new URLSearchParams(window.location.search);
        const fName = params.get(`first_name`).toLowerCase();
        const lName = params.get(`last_name`).toLowerCase();
        const email = params.get(`email`).toLowerCase();
        const gender = params.get(`gender`).toLowerCase();
        const ip = params.get(`ip_address`).toLowerCase();

        const inputFname = document.getElementById(`input-fname`);
        const inputLname = document.getElementById(`input-lanme`);
        const inputEmail = document.getElementById(`input-email`);
        const inputGender = document.getElementById(`input-gender`);
        const inputIP = document.getElementById(`input-ip`);
        
        dataArray = data;

        if(fName.length>0){
            inputFname.value = fName;
            dataArray = data.filter(({ first_name }) => first_name.toLowerCase().includes(fName));
        
        }
        
        if(lName.length>0){
            inputLname.value = lName;
            dataArray = data.filter(({ last_name }) => last_name.toLowerCase().includes(lName));
        
        }
        
        if(email.length>0){
            inputEmail.value = email;
            dataArray = data.filter(({ email }) => email.toLowerCase().includes(email));
        
        }
        
        if(gender.length>0){
            inputGender.value = gender;
            dataArray = data.filter(({ gender }) => gender.toLowerCase().includes(gender));
       
        }
        
        if(ip.length>0){
            inputIP.value = ip;
            dataArray = data.filter(({ ip_address }) => ip_address.toLowerCase().includes(ip));

        }

    }

    const rows = dataArray.map((row) =>
        table.appendChild(
            htmlToElement(

                `<tr><td>${row.id}</td>` +
                `<td>${row.first_name}</td>` +
                `<td>${row.last_name}</td>` +
                `<td>${row.email}</td>` +
                `<td>${row.gender}</td>` +
                `<td>${row.ip_address}</td></tr>`

            )
        )
    );
};

renderTable();