let users = [];

const date = new Date();
users = JSON.parse(localStorage.getItem("users")) || [];
let isLogin;
let user = users.find(f => f.fname == localStorage.getItem("loginAt")) || [];

function checkLogin() {
   return !!localStorage.getItem("loginAt");
}

// --------- register --------- //
class NEWUSER {
   constructor(fname, lname, birth, email, pass) {
      this.fname = fname;
      this.lname = lname;
      this.birth = birth;
      this.email = email;
      this.pass = pass;
   }
   addToUsers() {
      users.push({ ...this })
      localStorage.setItem("users", JSON.stringify(users))
   }
};

function register() {
   let inFName = document.getElementById("rFName").value;
   let inLName = document.getElementById("rLName").value;
   let inDate = document.getElementById("rDate").value;
   let inEmail = document.getElementById("inEmail").value;
   let inPassword = document.getElementById("inPassword").value;
   let inConfirmPassword = document.getElementById("inConfirmPassword").value;

   let actualUsers = JSON.parse(localStorage.getItem("users")) || [];
   let userExists = actualUsers.some(user => user.email.toLowerCase() === inEmail.toLowerCase());

   if (userExists) {
      alert(`Email ${inEmail} is already registered! Try another.`)
      return;
   }

   if (!inFName || !inLName || !inDate || !inEmail || !inPassword) {
      alert("All fields must be filled in")
      return;
   };

   let error = // retorna a msg do erro das funcoes de validacao
      validateName(inFName, inLName) ||
      validateBirth(inDate) ||
      validateEmail(inEmail) ||
      validatePass(inPassword, inConfirmPassword);

   if (error) {
      alert(error)
      return
   }
   let newUser = new NEWUSER(inFName, inLName, inDate, inEmail, inPassword);
   newUser.addToUsers();
   console.log(users);
   localStorage.setItem("loginAt", inFName);
   localStorage.setItem("lName", inLName);
   localStorage.setItem("email", inEmail);
   localStorage.setItem("session", Date.now());
   isLogin = checkLogin();
   window.location.href = "index.html";
}
// validacoes
function validateName(f, l) {
   if (f.length < 2 || l.length < 2) { return "The name must be longer than 2 characters." }
   const regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ' -]+$/;
   const verifyF = regex.test(f);
   const verifyL = regex.test(l);
   if (!verifyF || !verifyL) { return "Invalid Name" }
   else { return false }
}
function validateBirth(bd) {
   const birthDate = new Date(bd);
   const subtraction = Date.now() - birthDate.getTime();
   const fullAge = new Date(subtraction);
   const age = Math.abs(fullAge.getUTCFullYear() - 1970)
   // console.log(age)
   if (age < 18 || age >= 120 || isNaN(age)) { return "Invalid age or does not meet the requirements." }
   else { return false }
}
function validateEmail(email) {
   const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
   const verify = regex.test(email);
   if (!verify) { return "Invalid Email" }
   else { return false }
}
function validatePass(pass1, pass2) {
   const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d\s]).+$/;
   const verify = regex.test(pass1);

   if (pass1.length < 6) { return "The password must be longer than 6 digits." }
   else if (pass1 !== pass2) { return "The passwords don't match." }
   else if (!verify) { return "The password requires number, letter, and symbol." }
   else { return false }
}
// nas passwords colocar o zoinho


// --------- login --------- //

// let loginName = "";

function login() {
   const loginEmail = document.getElementById("loginEmail").value;
   const loginPassword = document.getElementById("loginPassword").value;

   users = JSON.parse(localStorage.getItem("users")) || [];
   console.log(users)
   user = users.find(f => f.email == loginEmail && f.pass == loginPassword);

   if (!user) {
      alert("Incorrect username or password")
   } else {
      localStorage.setItem("loginAt", user.fname);
      localStorage.setItem("lName", user.lname);
      localStorage.setItem("email", loginEmail);
      localStorage.setItem("session", Date.now());
      isLogin = checkLogin();
      window.location.href = "index.html";
   }
}
// LOGOUT ficou no script.js (para nao ter conflito com o date)

// apagar conta
function delRegister() {
   user = (localStorage.getItem("loginAt"));
   let userMail = (localStorage.getItem("email"));
   users = JSON.parse(localStorage.getItem("users"));
   isLogin = checkLogin()
   if (isLogin) {                         // caso esteja na pagina profile
      if (!confirm(`Are you sure to remove: ${user} ?`)) { return }

      delRegisterFlats();
      users = users.filter(u => u.email != userMail);
      localStorage.setItem("users", JSON.stringify(users));
      localStorage.removeItem("loginAt");
      localStorage.removeItem("lName");
      localStorage.removeItem("email");
      alert("User deleted");
      window.location.href = "login.html";
      return
   }
   else {
      let delEmail = document.getElementById("delEmail").value;
      if (!users.find(u => u.email == delEmail)) {
         alert(`This email "${delEmail}" does not exist`)
         return
      }
      if (!confirm(`Are you sure to remove: ${delEmail} ?`)) { return }

      delRegisterFlats()
      users = users.filter(u => u.email != delEmail);
      localStorage.setItem("users", JSON.stringify(users))
      alert("User deleted");
      console.log(users)
   }
};
// apagar os flats do user apagado
function delRegisterFlats() {
   let flats = JSON.parse(localStorage.getItem("flats"));
   userMail = localStorage.getItem("email");
   flats = flats.filter(f => f.user !== userMail);
   localStorage.setItem("flats", JSON.stringify(flats));
}


// --------- profile --------- //
if (document.querySelector("#show-fName")) {
   document.querySelector("#show-fName").textContent = localStorage.getItem("loginAt");
   document.querySelector(".profile-email").textContent = localStorage.getItem("email");
};

if (document.getElementById("inFName")) {
   document.addEventListener("DOMContentLoaded", function () {
      user = JSON.parse(localStorage.getItem("users")).find(f => f.fname == localStorage.getItem("loginAt"))

      document.getElementById("inFName").value = user.fname;
      document.getElementById("inLName").value = user.lname;
      document.getElementById("inDate").value = user.birth;
   })
};

function updateProfile() {
   let inFName = document.getElementById("inFName").value;
   let inLName = document.getElementById("inLName").value;
   let inDate = document.getElementById("inDate").value;
   let inPassword = document.getElementById("inPassword").value;
   let inConfirmPassword = document.getElementById("inConfirmPassword").value;

   if (!inFName || !inLName || !inDate || !inPassword) {
      alert("All fields must be filled in")
      return;
   };

   let error = // retorna a msg do erro das funcoes de validacao
      validateName(inFName, inLName) ||
      validateBirth(inDate) ||
      validatePass(inPassword, inConfirmPassword);

   if (error) {
      alert(error)
      return
   }

   users = JSON.parse(localStorage.getItem("users"));
   users.forEach(u => {
      if (u.email == localStorage.getItem("email")) {
         u.fname = inFName;
         u.lname = inLName;
         u.birth = inDate;
         u.pass = inPassword;
         localStorage.setItem("users", JSON.stringify(users));
         localStorage.setItem("loginAt", inFName);
         localStorage.setItem("email", user.email);
      }
   })
   console.log(users);
   alert("User Details Updated Sucessfully!");
   window.location.href = "index.html";
}
