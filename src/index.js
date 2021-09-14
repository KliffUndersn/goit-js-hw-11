// import Notiflix from "notiflix";
import axios from "axios";
// import "@babel/polyfill";
const refs = {
  form: document.querySelector('#search-form'),
  loadMoreBtn: document.querySelector('.load-more'),
  gallery: document.querySelector('.gallery'),
}

const cardMarkup = (card) => {const markup = card.map(({tags,webformatURL,views,downloads,likes})=>{
  return `<div class="photo-card">
<img width="200"src="${webformatURL}" alt="${tags}" loading="lazy" />
<div class="info">
  <p class="info-item">
    <b>Likes ${likes}</b>
  </p>
  <p class="info-item">
    <b>Views ${views}</b>
  </p>
  <p class="info-item">
    <b>Downloads ${downloads}</b>
  </p>
</div>
</div>`
}).join('')
return refs.gallery.insertAdjacentHTML("beforeend",markup) ;
}
let page = 1;
let querySearch = ""

async function getCards(query,page) {
  const response = await fetch(`https://pixabay.com/api/?key=23372923-aa63da10459dab2a89fc14fe7&q=${query}&page=${page}&per_page=3`)
  const then = await response.data.hits;
return then
};

 async function searchInput(e) {
  page = 1;
  refs.gallery.innerHTML = ''
  e.preventDefault();
  querySearch = e.target.elements.searchQuery.value.trim();
  const get = await getCards(querySearch,page)
  try {
    console.log("object");
    cardMarkup({})
   } catch (error) {
     console.log(error);
   }
}
const searchButton = (e) => {
  page += 1
  const get = getCards(querySearch,page)
}
refs.form.addEventListener('input', searchInput)
refs.loadMoreBtn.addEventListener('click',searchButton)