let flats = [
    // { id: 1, city: "lisboa", street: "aasdas", number: "5", area: "10", ac: false, year: "2020", price: 100, date: "10/02/2025", favorite: true, user: "ze@hotmail.com" },
    // { id: 2, city: "porto", street: "tgadaa", number: "25", area: "15", ac: false, year: "1995", price: 120, date: "10/02/2025", favorite: false, user: "gsc@hotmail.com" },
    // { id: 3, city: "braga", street: "sadwecasdf", number: "45", area: "20", ac: true, year: "2026", price: 150, date: "10/02/2025", favorite: true, user: "ze@hotmail.com" },
    // { id: 4, city: "gaia", street: "asfasetca", number: "51", area: "25", ac: true, year: "2008", price: 180, date: "10/02/2025", favorite: true, user: "gsc@hotmail.com" },
    // { id: 5, city: "sintra", street: "ryvasdga", number: "57", area: "30", ac: true, year: "2002", price: 200, date: "10/02/2025", favorite: true, user: "ze@hotmail.com" },
    // { id: 6, city: "setubal", street: "aasdas", number: "5", area: "10", ac: false, year: "2020", price: 100, date: "10/02/2025", favorite: true, user: "ze@hotmail.com" },
    // { id: 7, city: "alverca", street: "tgadaa", number: "25", area: "15", ac: false, year: "1995", price: 120, date: "10/02/2025", favorite: false, user: "gsc@hotmail.com" },
    // { id: 8, city: "amadora", street: "sadwecasdf", number: "45", area: "20", ac: true, year: "2026", price: 150, date: "10/02/2025", favorite: true, user: "ze@hotmail.com" },
    // { id: 9, city: "cascais", street: "asfasetca   na rua do meio da esquina", number: "51", area: "25", ac: true, year: "2008", price: 180, date: "10/02/2025", favorite: true, user: "gsc@hotmail.com" },
    // { id: 10, city: "morelinho", street: "ryvasdga", number: "57", area: "30", ac: false, year: "2002", price: 200, date: "10/02/2025", favorite: true, user: "ze@hotmail.com" },
];
// localStorage.setItem("flats", JSON.stringify(flats));
const date = new Date();
const today = date.toISOString().split("T")[0];
flats = JSON.parse(localStorage.getItem("flats")) || [];

// --------- home --------- //
// preencher cards
let favFlats = [];
function favFlatList() {
    if (!document.querySelector(".fav-flat-list")) { return }
    if (flats.length === 0) { return }
    let favFlatList = document.querySelector(".fav-flat-list");
    favFlatList.innerHTML = "";
    favFlats = flats.filter(fl => fl.favorite == true && fl.user == localStorage.getItem("email"));
    if (favFlats.length === 0) {
        document.querySelector(".hello-title").innerHTML =
            `<h2 class="hello-title">There's no favorite Flats<br><br> 
        Please add a favorite Flat on <a href="all-flats.html" class="links">all-flats</a><br><br> 
        or add a new Flat on <a href="new-flat.html" class="links">new-flat</a></h2>`
    }
    favFlats.forEach(favorites => {
        // console.log(favorites)
        let { id, city, street, number, area, ac, year, price, date } = { ...favorites };
        ac = ac ? "✔️" : "✖️"
        let html = `
            <div class="flat-card" id="card-${id}">
                <div class="flat-cardL">
                    <p class="card-city">${city}</p>
                    <p>${street}<span>, nº ${number}</span></p>
                    <p>Area: ${area} m2</p>
                    <p>Year: ${year}</p>
                    <p>AC ${ac}</p>
                </div>
                <div class="flat-cardR">
                    <p class="card-price">${price} €</p>
                    <button 
                        id="desfav-flat-${id}" 
                        class="desfav-flat"
                        onclick="desfavFlat(${id})" 
                        onmouseenter="heartIN(${id})" 
                        onmouseleave="heartOUT(${id})"
                        ><img src="images/fav.svg" class="logo" alt="logo"></img>
                    </button>
                    <button 
                        id="edit-flat-${id}"
                        class="edit-flat"
                        onclick="editFlat(${id})"
                        onmouseenter="editIN(${id})" 
                        onmouseleave="editOUT(${id})"
                        ><img src="images/edit.svg" class="logo" alt="logo"></img>
                    </button>
                    <p>Available: <br>${date}</p>
                </div>
            </div>
        `;
        favFlatList.innerHTML += html;
    })
};
favFlatList();


// desfavoritar cards
function desfavFlat(idSel) {
    flats = JSON.parse(localStorage.getItem("flats"));
    flats.forEach(ff => {
        if (ff.id == idSel) {
            ff.favorite = false;
            localStorage.setItem("flats", JSON.stringify(flats));
            // console.log(ff.favorite)
        }
    });
    favFlatList();
};

// --------- new-flat --------- //
class FLAT {
    constructor(lastID, inCity, inStreet, inNumber, inArea, hasAC, inYear, inPrice, inDateAvailable) {
        this.id = lastID + 1,
            this.city = inCity,
            this.street = inStreet,
            this.number = inNumber,
            this.area = inArea,
            this.ac = hasAC,
            this.year = inYear,
            this.price = inPrice,
            this.date = inDateAvailable,
            this.favorite = true,
            this.user = localStorage.getItem("email")
    }
    addToFlats() {
        flats.push({ ...this });
        localStorage.setItem("flats", JSON.stringify(flats));
    }
};

function CreateFlat() {
    let inCity = document.getElementById("inCity").value;
    let inStreet = document.getElementById("inStreet").value;
    let inNumber = document.getElementById("inNumber").value;
    let inArea = document.getElementById("inArea").value;
    let hasAC = document.getElementById("hasAC").checked;
    let inYear = document.getElementById("inYear").value;
    let inPrice = document.getElementById("inPrice").value;
    let inDateAvailable = document.getElementById("inDateAvailable").value;

    inArea = Number(parseFloat(inArea.replace(',', '.')).toFixed(2));
    inPrice = Number(parseFloat(inPrice.replace(',', '.')).toFixed(2));

    if (!inCity || !inStreet || !inNumber || !inArea || !inYear || !inPrice || !inDateAvailable) {
        alert("All fields must be filled in");
        return
    }

    let error = // retorna qlqer coisa para dar erro. Se estiver certo, retorna false
        validateCity(inCity) ||
        validateArea(inArea) ||
        validateYear(inYear) ||
        validateAvailable(inDateAvailable) ||
        validatePrice(inPrice);

    if (error) {
        alert(error)
        return
    }

    let lastID;
    if (flats.length === 0) {
        lastID = 0;
    } else {
        flats = JSON.parse(localStorage.getItem("flats"));
        lastID = Math.max(...flats.map(last => last.id));
    }

    let newFlat = new FLAT(lastID, inCity, inStreet, inNumber, inArea, hasAC, inYear, inPrice, inDateAvailable)
    newFlat.addToFlats();
    window.location.href = "all-flats.html";
    console.log(flats)
}
// validacoes
function validateCity(c) {
    if (c.length < 2) { return "The name must be longer than 2 characters." }
    const regex = /^[A-Za-záàâãéèêíïóôõöúçñÁÀÂÃÉÈÍÏÓÔÕÖÚÇÑ' -]+$/;
    const verify = regex.test(c);
    if (!verify) {
        return "Invalid City Name"
    }
    else { return false }
}
function validateArea(a) {
    if (Number.isNaN(a) || a <= 0) { return "Invalid area value" }
    else { return false }
}
function validateYear(y) {
    if (y > date.getFullYear()) { return "The construction year cannot be in the future." }
    const regex = /^[1-9]\d{3}$/;
    const verify = regex.test(y);
    if (!verify) { return "Invalid Year" }
    else { return false }
}
function validateAvailable(av) {
    if (av < today) { return "The availability date cannot be in the past." }
    else { return false }
}
function validatePrice(p) {
    if (Number.isNaN(p) || p <= 0) { return "Invalid Price" }
    else { return false }
}

// --------- all-flats --------- //
// renderizador
function flatLister(listOfFlats) {
    let allFlatList = document.querySelector("#allFlatList");
    if (!allFlatList) { return }

    allFlatList.innerHTML = "";
    listOfFlats = listOfFlats.filter(f => f.user == localStorage.getItem("email"))
    listOfFlats.forEach(list => {
        // console.log(list)
        let { id, city, street, number, area, ac, year, price, date, favorite } = { ...list };
        ac = ac ? "✔️" : "✖️";
        favorite = favorite 
        ? `<img src="images/fav.svg" class="logo" alt="logo"></img>` 
        : `<img src="images/unfav.svg" class="logo" alt="logo"></img>`;

        let html = `
        <tr class="tr-content">
            <td>${city}</td>
            <td>${street}, ${number}</td>
            <td>${area} m<sup>2</sup></td>
            <td>${year}</td>
            <td>${ac}</td>
            <td>${price} €</td>
            <td>${date}</td>
            <td class="table-favdel">
                <button onclick="toogleFav(${id})" id="toogleFav-${id}">${favorite}</td>
            <td class="table-favdel">
                <button onclick="editFlat(${id})"><img src="images/edit.svg" class="logo" alt="logo"></img></td>
            <td class="table-favdel">
                <button onclick="deleteFlat(${id})"><img src="images/delete.svg" class="logo" alt="logo"></img></td>
        </tr>
        `;
        allFlatList.innerHTML += html;
    })
}
flatLister(flats);

// filtros
let activeCityFilter = "";
let activeSort = "";
let sortDirection = "";
let activeMinPrice = null;
let activeMaxPrice = null;
let activeMaxArea = null;
let activeMinArea = null;

function applyFiltersAndSort() {
    let result = [...JSON.parse(localStorage.getItem("flats"))];
    result = result.filter(f => f.user == localStorage.getItem("email"));

    //filtros
    if (activeCityFilter.trim() !== "") {
        result = result.filter(f => f.city.toUpperCase().includes(activeCityFilter.toUpperCase()))
    };
    if (activeMinPrice !== null && activeMaxPrice !== null) {
        result = result.filter(f => f.price >= activeMinPrice && f.price <= activeMaxPrice)
    };
    if (activeMinArea !== null && activeMaxArea !== null) {
        result = result.filter(f => f.area >= activeMinArea && f.area <= activeMaxArea)
    };

    // ordenar
    if (activeSort == "city") {
        result.sort((a, b) =>
            sortDirection === "up"
                ? a.city.localeCompare(b.city)
                : b.city.localeCompare(a.city)
        );
    };
    if (activeSort == "area") {
        result.sort((a, b) =>
            sortDirection === "up"
                ? a.area - b.area
                : b.area - a.area
        );
    };
    if (activeSort == "price") {
        result.sort((a, b) =>
            sortDirection === "up"
                ? a.price - b.price
                : b.price - a.price
        );
    };

    if (result.length === 0) {
        let helloTitle = document.querySelector(".hello-title");
        let allFlatsTable = document.querySelector("#all-flats-table")
        helloTitle.textContent = "There's no Flats according to your filters";
        allFlatsTable.style.display = "none"
    } else {
        let allFlatsTable = document.querySelector("#all-flats-table")
        let helloTitle = document.querySelector(".hello-title");
        helloTitle.textContent = "All Flats List";
        allFlatsTable.style.display = "block"
    }

    flatLister(result);
}

function cleanFilters() {
    activeCityFilter = "";
    activeMinPrice = null;
    activeMaxPrice = null;
    activeMinArea = null;
    activeMaxArea = null;
    activeSort = "";
    sortDirection = "";

    // Resetar inputs visuais
    let filterCity = document.getElementById("filterCity");
    if (!filterCity) return
    filterCity.value = "";

    flats = flats.filter(f => f.user == localStorage.getItem("email")) || [];
    if (flats.length === 0) return

    document.getElementById("filterPriceMin").value =
        Math.min(...flats.map(f => f.price));

    document.getElementById("filterPriceMax").value =
        Math.max(...flats.map(f => f.price));

    document.getElementById("filterAreaMin").value =
        Math.min(...flats.map(f => f.area));

    document.getElementById("filterAreaMax").value =
        Math.max(...flats.map(f => f.area));

    applyFiltersAndSort();
};
cleanFilters();

// filtro cidade
function flatFilterCity() {
    activeCityFilter = document.getElementById("filterCity").value;
    applyFiltersAndSort();
};

// filtro preco e area
function flatFilterPMin() {
    let filterPriceMin = Number(document.getElementById("filterPriceMin").value);
    let filterPriceMaxInput = document.getElementById("filterPriceMax");
    let filterPriceMax = Number(filterPriceMaxInput.value);

    if (filterPriceMin >= filterPriceMax) {
        filterPriceMax = filterPriceMin + 1;
        filterPriceMaxInput.value = filterPriceMax;
    }
    activeMinPrice = filterPriceMin;
    activeMaxPrice = filterPriceMax;
    applyFiltersAndSort();
};
function flatFilterPMax() {
    let filterPriceMax = Number(document.getElementById("filterPriceMax").value);
    let filterPriceMinInput = document.getElementById("filterPriceMin");
    let filterPriceMin = Number(filterPriceMinInput.value);

    if (filterPriceMax <= filterPriceMin) {
        filterPriceMin = filterPriceMax - 1;
        if (filterPriceMin < 0) {
            filterPriceMin = 0;
        }
        filterPriceMinInput.value = filterPriceMin;
    }
    activeMinPrice = filterPriceMin;
    activeMaxPrice = filterPriceMax;
    applyFiltersAndSort();
};
function flatFilterAMin() {
    let filterAreaMin = Number(document.getElementById("filterAreaMin").value);
    let filterAreaMaxInput = document.getElementById("filterAreaMax");
    let filterAreaMax = Number(filterAreaMaxInput.value);

    if (filterAreaMin >= filterAreaMax) {
        filterAreaMax = filterAreaMin + 1;
        filterAreaMaxInput.value = filterAreaMax;
    }
    activeMaxArea = filterAreaMax;
    activeMinArea = filterAreaMin;
    applyFiltersAndSort();
};
function flatFilterAMax() {
    let filterAreaMax = Number(document.getElementById("filterAreaMax").value);
    let filterAreaMinInput = document.getElementById("filterAreaMin");
    let filterAreaMin = Number(filterAreaMinInput.value);

    if (filterAreaMax <= filterAreaMin) {
        filterAreaMin = filterAreaMax - 1;
        if (filterAreaMin < 0) {
            filterAreaMin = 0;
        }
        filterAreaMinInput.value = filterAreaMin;
    }
    activeMaxArea = filterAreaMax;
    activeMinArea = filterAreaMin;
    applyFiltersAndSort();
};

// ordenar
function sortCity() {
    activeSort = "city"
    if (sortDirection === "up") {
        sortDirection = "down"
        document.getElementById("sortCityIcon").src = "images/order-down.svg";
        document.getElementById("sortAreaIcon").src = "images/order-mid.svg";
        document.getElementById("sortPriceIcon").src = "images/order-mid.svg";
    } else {
        sortDirection = "up"
        document.getElementById("sortCityIcon").src = "images/order-up.svg";
        document.getElementById("sortAreaIcon").src = "images/order-mid.svg";
        document.getElementById("sortPriceIcon").src = "images/order-mid.svg";
    }
    applyFiltersAndSort();
};
function sortArea() {
    activeSort = "area"
    if (sortDirection === "up") {
        sortDirection = "down"
        document.getElementById("sortAreaIcon").src = "images/order-down.svg" ;
        document.getElementById("sortCityIcon").src = "images/order-mid.svg";
        document.getElementById("sortPriceIcon").src = "images/order-mid.svg";
    } else {
        sortDirection = "up"
        document.getElementById("sortAreaIcon").src = "images/order-up.svg";
        document.getElementById("sortCityIcon").src = "images/order-mid.svg";
        document.getElementById("sortPriceIcon").src = "images/order-mid.svg";
    }
    applyFiltersAndSort();
};
function sortPrice() {
    activeSort = "price"
    if (sortDirection === "up") {
        sortDirection = "down"
        document.getElementById("sortPriceIcon").src = "images/order-down.svg";
        document.getElementById("sortAreaIcon").src = "images/order-mid.svg";
        document.getElementById("sortCityIcon").src = "images/order-mid.svg";
    } else {
        sortDirection = "up"
        document.getElementById("sortPriceIcon").src = "images/order-up.svg";
        document.getElementById("sortAreaIcon").src = "images/order-mid.svg";
        document.getElementById("sortCityIcon").src = "images/order-mid.svg";
    }
    applyFiltersAndSort();
};

// favoritos edit delete
function toogleFav(id) {
    flats = JSON.parse(localStorage.getItem("flats"));
    flats.forEach(flat => {
        if (flat.id == id) {
            if (flat.favorite) {
                flat.favorite = false;
                document.getElementById(`toogleFav-${id}`).innerHTML = `<img src="images/unfav.svg" class="logo" alt="logo"></img>`
            } else {
                flat.favorite = true;
                document.getElementById(`toogleFav-${id}`).innerHTML = `<img src="images/fav.svg" class="logo" alt="logo"></img>`
            }
        }
    })
    localStorage.setItem("flats", JSON.stringify(flats));
};
// edit flat
const modalFlat = document.getElementById("modalFlat");
const closeModalFlat = document.getElementById("closeModalFlat");
if (closeModalFlat){
    closeModalFlat.addEventListener("click", () => modalFlat.close());
}
let editedFlat = null;

function editFlat(id) {
    modalFlat.showModal();
    let flatModal = JSON.parse(localStorage.getItem("flats"));
    flatModal = flatModal.find(f => f.id == id);
    editedFlat = id;
    // console.log(flatModal)
    // console.log(editedFlat)

    document.getElementById("inCity").value = flatModal.city;
    document.getElementById("inStreet").value = flatModal.street;
    document.getElementById("inNumber").value = flatModal.number;
    document.getElementById("inArea").value = flatModal.area;
    document.getElementById("hasAC").checked = flatModal.hasAC;
    document.getElementById("inYear").value = flatModal.year;
    document.getElementById("inPrice").value = flatModal.price;
    document.getElementById("inDateAvailable").value = flatModal.date;
}
function saveEditFlat() {
    let inCity = document.getElementById("inCity").value;
    let inStreet = document.getElementById("inStreet").value;
    let inNumber = document.getElementById("inNumber").value;
    let inArea = document.getElementById("inArea").value;
    let hasAC = document.getElementById("hasAC").checked;
    let inYear = document.getElementById("inYear").value;
    let inPrice = document.getElementById("inPrice").value;
    let inDateAvailable = document.getElementById("inDateAvailable").value;

    inArea = Number(parseFloat(inArea.replace(',', '.')).toFixed(2));
    inPrice = Number(parseFloat(inPrice.replace(',', '.')).toFixed(2));

    if (!inCity || !inStreet || !inNumber || !inArea || !inYear || !inPrice || !inDateAvailable) {
        alert("All fields must be filled in");
        return
    }

    let error = // retorna qlqer coisa para dar erro. Se estiver certo, retorna false
        validateCity(inCity) ||
        validateArea(inArea) ||
        validateYear(inYear) ||
        validateAvailable(inDateAvailable) ||
        validatePrice(inPrice);

    if (error) {
        alert(error)
        return
    }

    flats = JSON.parse(localStorage.getItem("flats"));
    flats.forEach(f => {
        if (f.id == editedFlat){
            f.city = inCity,
            f.street = inStreet,
            f.number = inNumber,
            f.area = inArea,
            f.ac = hasAC,
            f.year = inYear,
            f.price = inPrice,
            f.date = inDateAvailable
        }
    })
    localStorage.setItem("flats", JSON.stringify(flats));
    flatLister(flats);
    favFlatList();
    alert("Flat Updated Sucessfully")
    modalFlat.close();
};

function deleteFlat(id) {
    if (!confirm("Do you want to remove this Flat?")) { return };
    flats = JSON.parse(localStorage.getItem("flats"));
    flats = flats.filter(i => i.id != id);
    console.log(flats)
    localStorage.setItem("flats", JSON.stringify(flats));
    applyFiltersAndSort()
};

// hover no home para favoritos e edits
function heartIN(id) {
    favFlats.forEach(ff => {
        if (ff.id == id) {
            document.getElementById(`desfav-flat-${id}`).innerHTML =`<img src="images/unfav.svg" class="logo" alt="logo"></img>`
        }
    });
};
function heartOUT(id) {
    favFlats.forEach(ff => {
        if (ff.id == id) {
            document.getElementById(`desfav-flat-${id}`).innerHTML =`<img src="images/fav.svg" class="logo" alt="logo"></img>`
        }
    });
};
function editIN(id) {
    favFlats.forEach(ff => {
        if (ff.id == id) {
            document.getElementById(`edit-flat-${id}`).innerHTML =`<img src="images/undit.svg" class="logo" alt="logo"></img>`
        }
    });
};
function editOUT(id) {
    favFlats.forEach(ff => {
        if (ff.id == id) {
            document.getElementById(`edit-flat-${id}`).innerHTML =`<img src="images/edit.svg" class="logo" alt="logo"></img>`
        }
    });
};

// area de testes \/

// let inputRaw = "10.658";
// inputRaw = Number(parseFloat(inputRaw.replace(',', '.')).toFixed(2));
// let valorCorrigido = parseInt(inputRaw.replace(',', '.'));

// console.log(inputRaw)

// const modalFlat = document.getElementById("modalFlat");
// const openModalFlat = document.getElementById("openModalFlat");
// const closeModalFlat = document.getElementById("closeModalFlat");

// openModalFlat.addEventListener("click", ()=> modalFlat.showModal());
// closeModalFlat.addEventListener("click", ()=> modalFlat.close());