const gallery = document.querySelector(".gallery");
const accesKey = "XlEFZNo448eCjf1xBGJMI2mLBHDiy-XKlpGgOPiGhZ8";
const next = document.querySelector(".next-btn");
const input = document.querySelector("input");
const searchBtn = document.querySelector(".search-btn");
const closeBtn = document.querySelector(".close-btn");
const pagination = document.querySelector(".pagination");
const paginationBtns = document.querySelector(".pagination__buttons-container");

let currentData;
let currentPage = 1;
let search = false;
let query = "random";
input.focus();
closeBtn.style.display = "none";

// GET DATA
async function getData(currentPage) {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?page=${currentPage}&per_page=30&query=${query}&orientation=landscape&client_id=${accesKey}`
  );
  const data = await res.json();
  displayData(data, 30, gallery, currentPage);
  setupPagination(data);
}

// PAGINATION
const setupPagination = (items) => {
  paginationBtns.innerHTML = "";
  let pageCount = items.total_pages;

  for (let i = 1; i < pageCount; i++) {
    let btn = paginationButton(i);
    paginationBtns.append(btn);
  }
};

paginationBtns.addEventListener("click", (e) => {
  if (e.target.classList.contains("pagination__button")) {
    currentPage = e.target.innerText;
    console.log(currentPage);
    getData(currentPage);
  }
});

function paginationButton(page) {
  let button = document.createElement("button");
  button.classList.add("pagination__button");
  button.innerText = page;
  if (currentPage == page) {
    button.classList.add("active");
  }
  return button;
}

// DISPALY DATA
function displayData(data, itemsPerPage, wrapper) {
  wrapper.innerHTML = "";
  for (let i = 0; i < itemsPerPage; i++) {
    const picture = document.createElement("div");
    picture.innerHTML = `<a class="picture" href="${data.results[i].urls.full}" target="_blank"><img class="picture__img" src=${data.results[i].urls.regular}></a>`;
    wrapper.append(picture);
  }
}

//const message = document.createElement("h2");
// message.innerText = "NOTHING FOUND";
// message.classList.add("message");
// wrapper.append(message);
//

// SEARCH
async function searchData(query) {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?page=${currentPage}&per_page=30&query=${query}&orientation=landscape&client_id=${accesKey}`
  );
  const data = await res.json();
  // console.log(data);
  displayData(data, 30, gallery, currentPage);
  setupPagination(data);
}

function searchDataEnter() {
  if (input.value === "") return;
  clear();
  search = true;
  searchData(query);
  closeBtn.style.display = "block";
  searchBtn.style.display = "none";
}

closeBtn.addEventListener("click", () => {
  input.value = "";
  closeBtn.style.display = "none";
  searchBtn.style.display = "block";
});

input.addEventListener("input", (e) => {
  e.preventDefault();
  query = e.target.value;
  closeBtn.style.display = "none";
  searchBtn.style.display = "block";
});

function clear() {
  input.value = input.value;
  document.querySelector(".gallery").innerHTML = "";
}

input.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchDataEnter();
  }
});

// ON PAGE LOAD
function load() {
  getData();
}

window.onload = load;
