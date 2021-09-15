import Notiflix from "notiflix";
import axios from "axios";
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
let querySearch = "";
let totalHits = 0;
let currentHits = 0;
refs.loadMoreBtn.disabled = true; 
async function getCards(query,page) {
  const urlsearch =  new URLSearchParams ({
    key:`23372923-aa63da10459dab2a89fc14fe7`,
    q: query,image_type: `photo`,orientation: `horizontal`,safesearch: true,per_page: 40,page,
  })
    try {
const res = await axios.get(`https://pixabay.com/api/?${urlsearch}`)
  cardMarkup(res.data.hits);
  totalHits = await res.data.totalHits;
  if (res.data.hits.length === 0){ Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')}
} catch (error) {
    Notiflix.Notify.failure('Oops! Something went wrong 😱, try again later')
  }
};
const searchInput = (e) => {
  refs.loadMoreBtn.disabled = false; 
  page = 1;
  refs.gallery.innerHTML = ''
  e.preventDefault();
  querySearch = e.target.elements.searchQuery.value.trim();
  const get = getCards(querySearch,page);
  currentHits += 40
}
const searchButton = (e) => {

  if (totalHits>=currentHits){
    currentHits += 40
  page += 1
  const get = getCards(querySearch,page)}
  else {
    Notiflix.Notify.failure(`We're sorry, but you've reached the end of search results.`)
    refs.loadMoreBtn.disabled = true; 
  }
  console.log(currentHits);
}
refs.form.addEventListener('submit', searchInput)
refs.loadMoreBtn.addEventListener('click',searchButton)