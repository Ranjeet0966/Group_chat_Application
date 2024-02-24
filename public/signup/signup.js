const form = document.getElementById("form");
const submitbtn = document.getElementById("submit");
const name1 = document.getElementById("fullname");
const email = document.getElementById("email");
const number = document.getElementById("phoneno");
const password = document.getElementById("password");

form.addEventListener("submit", async function (e) {
  if (!form.checkValidity()) {
    e.preventDefault();
  } else {
    e.preventDefault();

    let signUpDetails = {
      fullname: name1.value,
      email: email.value,
      phoneno: number.value,
      password: password.value,
    };

    try {
      const res = await axios.post(
        "http://localhost:4000/user/signup",
        signUpDetails
      );

      if (res.status === 201) {
        window.location.href = "../login/login.html";
      } else {
        throw new Error("Failed to Login");
      }
    } catch (error) {
      if (res.status === 409) {
        document.body.innerHTML += `<div style='color:red;'>${error.res.data.message}</div>`;
      } else {
        document.body.innerHTML += `<div style='color:red;'>${error}</div>`;
      }
    console.log(error);
    }

    name1.value = "";
    email.value = "";
    number.value = "";
    password.value = "";
  }
  form.classList.add("was-validated");
});