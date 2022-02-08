const submitForActivity = (event) => {
    event.preventDefault();

    const form = event.target;

    const inputValue = form.inputbox.value;
    const checkbox1Value = form.inputCheckbox1.checked;
    const checkbox2Value = form.inputCheckbox2.checked;

    let radioButton;

    for (var i = 0; i < form.fav_language.length; i++) {
        if (form.fav_language[i].checked) {
            radioButton = form.fav_language[i].value;
        }
    }

    console.log(`Input: ${inputValue}\ncheckbox1 checked? ${checkbox1Value} checkbox2 checked? ${checkbox2Value}\nRadio Button? ${radioButton}`);

    form.inputbox.value = "";
}