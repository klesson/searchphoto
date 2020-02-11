const Unsplash = require('unsplash-js').default;

const unsplash = new Unsplash({ 
    accessKey: "1351f42e461314bb24eadc303fce74348ff776d91a08389d45f0dd54853f766a" 
});

const list = document.getElementById('list');
const search = document.getElementById('search');
const form = document.getElementById('form');
const nextPage = document.getElementById('next-page');
let page = 1;

function searchPhotos(searchStr) {
    unsplash.search.photos(searchStr, page, 21, { orientation: "squarish" })
    .then(toJson => toJson.json())
    .then(data => {
        console.log('data', data);
        drawItems(data);
        nextPage.classList.toggle('hidden', !(data.total_pages > page));
    });
}

function drawItems(data) {
    const newElements = data.results.map((item) => {
        const newContainer = document.createElement('div');
        newContainer.classList.add('item');
        const img = document.createElement('img');
        img.setAttribute('src', item.urls.thumb);
        newContainer.appendChild(img);
        return newContainer;
    });

    newElements.forEach(element => {
        list.appendChild(element);
    });
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    list.innerHTML = "";
    page = 1;
    searchPhotos(search.value);
});

nextPage.addEventListener('click', () => {
    page++;
    searchPhotos(search.value);
});