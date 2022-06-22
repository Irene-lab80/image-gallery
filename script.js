const url = 'https://api.unsplash.com/search/photos?query=random&per_page=30&orientation=landscape&client_id=XlEFZNo448eCjf1xBGJMI2mLBHDiy-XKlpGgOPiGhZ8';
const gallery = document.querySelector('.gallery');
const accesKey = "XlEFZNo448eCjf1xBGJMI2mLBHDiy-XKlpGgOPiGhZ8"
const next = document.querySelector('.next-btn');
const input = document.querySelector('input');
const searchBtn = document.querySelector('.search-btn');
const closeBtn = document.querySelector('.close-btn');
const button = document.querySelector('.button');


let pagenr = 1;
let search = false;
let query = "";
input.focus();
closeBtn.style.display = 'none';


async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data)
    showData(data);
}

getData();

function showData(data) {
    for(let i = 0; i < 30; i++){
        const picture = document.createElement('div');
        picture.innerHTML = `<a href="${data.results[i].urls.full}" target="_blank"><img src=${data.results[i].urls.regular}></a>`
        gallery.append(picture);
    }
}

async function searchData(query) {
    const res = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=30&orientation=landscape&client_id=XlEFZNo448eCjf1xBGJMI2mLBHDiy-XKlpGgOPiGhZ8`);
    const data = await res.json();
    console.log(data)
    showData(data);
}

function searchDataEnter(){
    if (input.value === "") return;
    clear();
    search = true;
    searchData(query);
    closeBtn.style.display = 'block';
    searchBtn.style.display = 'none';
}

searchBtn.addEventListener('click', searchDataEnter)

closeBtn.addEventListener('click', () => {
    input.value = "";
    closeBtn.style.display = 'none';
    searchBtn.style.display = 'block';

})


input.addEventListener("input", (e) => {
    e.preventDefault();
    query = e.target.value;
        closeBtn.style.display = 'none';
    searchBtn.style.display = 'block';
    
})







function clear(){
    input.value = input.value;
    
    document.querySelector('.gallery').innerHTML = "";
}

input.addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        searchDataEnter()
    }
});

