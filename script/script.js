// boas vindas
if (document.getElementById("greetings")) {
    let greeting = document.getElementById("greetings");
    if (localStorage.getItem("loginAt")) {
        greeting.textContent = localStorage.getItem("loginAt")
    };
}

// logout
function logout() {
    if (!confirm(`Are you want to LogOut, Mr(s) ${localStorage.getItem("loginAt")}?`)) { return }
    localStorage.removeItem("loginAt");
    localStorage.removeItem("lName");
    localStorage.removeItem("email");
    localStorage.removeItem("session");
    window.location.href = "login.html";
}

// redirecionar páginas caso nao esteja logado
let isLogged = !!localStorage.getItem("loginAt");
if (!isLogged && !window.location.href.includes("login") && !window.location.href.includes("register")) {
    window.location.href = "login.html";
};

// msg caso não haja flats
// para o all flats
let flatList = JSON.parse(localStorage.getItem("flats")) || [];
let userFlats = flatList.filter(f => f.user == localStorage.getItem("email"));
if (userFlats == "") {
    if (window.location.href.includes("all-flats")) {
        document.querySelector("#all-flats-table").style.display = "none";
        document.querySelector(".filters").style.display = "none";
        document.querySelector(".hello-title").innerHTML =
            `<h2 class="hello-title">There's no Flats created <br><br> Please add a Flat on <a href="new-flat.html" class="links">new-flat</a></h2>`
    }
    if (window.location.href.includes("index")) {
        document.querySelector(".hello-title").innerHTML =
            `<h2 class="hello-title">There's no Flats created <br><br> Please add a Flat on <a href="new-flat.html" class="links">new-flat</a></h2>`
    }
}

// tempo para expirar login
function checkSession() {
    const sessionTime = localStorage.getItem("session");
    if (!sessionTime) return;

    console.log("verificacao do login")
    if ((Date.now() - sessionTime) > 60*60*1000) { //60*60*1000 => 1 hora
        alert("Session expired due to inativity")
        localStorage.removeItem("loginAt");
        localStorage.removeItem("lName");
        localStorage.removeItem("email");
        localStorage.removeItem("session");
        window.location.href = "login.html";
    }
}
setInterval(checkSession, 30*1000);

//mudar imagem do fundo
function changeBG() {
    let index = Math.floor((Math.random() * 11)+1);
    document.documentElement.style.setProperty("--bgi", `url("../images/background/bgi${index}.jpg")`);
}

setInterval(changeBG, 15*1000);
changeBG()