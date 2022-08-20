import Notiflix from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import { fetchImg } from './fetchImg';
import './css/styles.css';

const form = document.querySelector('.search-form');
// const submitBtn = document.querySelector('.js-submit-btn');
const loadMoreBtn = document.querySelector('.load-more');
const gallery = document.querySelector('.gallery');
const input = document.querySelector('input')
form.addEventListener('submit', onFormSubmit);
loadMoreBtn.addEventListener('click', OnLoadMoreBtnClick);
let currentPage = 1;
let searchValue = '';
loadMoreBtn.classList.add('is-hidden');

const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionPosition: 'bottom',
  captionDelay: 250,
});

function onFormSubmit(event) {
    event.preventDefault();
     searchValue = event.currentTarget.searchQuery.value.trim();
     fetchToImg(searchValue, currentPage)
     loadMoreBtn.classList.remove('is-hidden');
currentPage = 1;
clearImg();

  }
  

function OnLoadMoreBtnClick(){
    currentPage += 1;
  
    fetchToImg(searchValue, currentPage); 
}


async function fetchToImg(searchQuery, currentPage) {
  try {
    const fetchResult = await fetchImg(searchQuery, currentPage);
    if (currentPage === 1) {
      Notiflix.Notify.info(`Hooray! We found ${fetchResult.totalHits} images.`);
    }
    filterFetchResult(fetchResult);
  } catch (error) {
    console.log(error);
  }
}

function filterFetchResult(fetchResult) {
  if (fetchResult.total === 0) {
    Notiflix.Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    input.value = '';
    loadMoreBtn.classList.add('is-hidden');
    return;
  } else if (currentPage === Math.ceil(fetchResult.totalHits / 40)) {
    insertImgMarkup(fetchResult.hits);
    
    Notiflix.Notify.info(
      "We're sorry, but you've reached the end of search results."
    );
    loadMoreBtn.classList.add('is-hidden');
    lightbox.refresh();
    return;
  } else {
    insertImgMarkup(fetchResult.hits);
    loadMoreBtn.classList.remove('is-hidden');
  
    lightbox.refresh();
    return;
  }
}
function insertImgMarkup(arrayImg){
    const images = createList(arrayImg)
    gallery.insertAdjacentHTML('beforeend', images)

}
function createList (arrayImages) {
    return arrayImages.reduce((acc, item) => acc + createImgMarkup(item), "");
  }




function createImgMarkup(img) {
  return `<div class="photo-card">
  <a href="${img.largeImageURL}" class="gallery__link">
   <img class="gallery__image" src="${img.webformatURL}" alt="${img.tags}" width="300   px" loading="lazy" />
   </a>
 <div class="info">
       <p class="info-item">
       <b>Likes: ${img.likes}</b>
       </p>
       <p class="info-item">
       <b>Views: ${img.views}</b>
       </p>
       <p class="info-item">
       <b>Comments: ${img.comments}</b>
       </p>
       <p class="info-item">
       <b>Downloads: ${img.downloads}</b>
       </p>
 </div>
</div>
`;
}







function clearImg(){
    gallery.innerHTML = '';
}





