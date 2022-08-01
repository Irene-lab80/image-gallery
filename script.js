const url = `https://api.unsplash.com/search/photos?query=random&per_page=30&orientation=landscape&client_id=XlEFZNo448eCjf1xBGJMI2mLBHDiy-XKlpGgOPiGhZ8`;
const gallery = document.querySelector(".gallery");
const accesKey = "XlEFZNo448eCjf1xBGJMI2mLBHDiy-XKlpGgOPiGhZ8";
const next = document.querySelector(".next-btn");
const input = document.querySelector("input");
const searchBtn = document.querySelector(".search-btn");
const closeBtn = document.querySelector(".close-btn");
const pagination = document.querySelector(".pagination");

let currentPage = 1;
let search = false;
let query = "";
input.focus();
closeBtn.style.display = "none";

async function getData() {
  const res = await fetch(url);
  const data = await res.json();
  displayData(data, 30, gallery);
  console.log(data);
  // setupPagination(data);
}

const setupPagination = (items) => {
  const leftBtn = document.createElement("button");
  leftBtn.innerHTML = '<i class="fa-solid fa-arrow-left"></i>';
  leftBtn.classList.add("pagination__button");

  const rightBtn = document.createElement("button");
  rightBtn.innerHTML = '<i class="fa-solid fa-arrow-right"></i>';
  rightBtn.classList.add("pagination__button");

  let pageCount = items.total_pages;
  pagination.append(leftBtn);
  for (let i = 1; i < pageCount + 1; i++) {
    let btn = paginationButton(i);
    pagination.append(btn);
  }
  pagination.append(rightBtn);
};

function paginationButton(page) {
  let button = document.createElement("button");
  button.classList.add("pagination__button");
  button.innerText = page;
  if (currentPage == page) {
    button.classList.add("active");
  }
  return button;
}

function displayData(data, itemsPerPage, wrapper) {
  wrapper.innerHTML = "";
  const loopStart = itemsPerPage * currentPage;
  const paginatedItems = data.results.slice(
    loopStart,
    loopStart + itemsPerPage
  );
  console.log(paginatedItems);
  for (let i = 0; i < itemsPerPage; i++) {
    const picture = document.createElement("div");
    picture.innerHTML = `<a class="picture" href="${data.results[i].urls.full}" target="_blank"><img class="picture__img" src=${data.results[i].urls.regular}></a>`;
    wrapper.append(picture);
  }
}

async function searchData(query) {
  const res = await fetch(
    `https://api.unsplash.com/search/photos?query=${query}&per_page=30&orientation=landscape&client_id=XlEFZNo448eCjf1xBGJMI2mLBHDiy-XKlpGgOPiGhZ8`
  );
  const data = await res.json();
  console.log(data);
  displayData(data, 30, gallery);
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

function load() {
  getData();
}

window.onload = load;
