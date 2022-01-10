function submitForm() {
  let email = document.getElementById("AI-email").value;
  let html = "";

  if (email && email.length > 0) {
    html = `<span>Form submitted with email ${email}</span>`;
  } else {
    html = `<span>Email is required</span>`;
  }

  console.log(html);
  document.getElementById("submit_message").innerHTML = html;
}
