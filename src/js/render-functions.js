// Описаний у документації
import SimpleLightbox from "simplelightbox";
// Додатковий імпорт стилів
import "simplelightbox/dist/simple-lightbox.min.css";
const options = {
    overlay: true,
    nav: true,
    captionsData: 'alt',
    captionDelay: 250,
}

const lightbox = new SimpleLightbox('.gallery a', options);

const gallery = document.querySelector('.gallery');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.more-btn')

if (!loader) {
    console.warn("⚠️ Loader element not found in the DOM!");
}
if (!gallery) {
    console.warn("⚠️ Gallery element not found in the DOM!");
}
if (!loadMoreBtn) {
    console.warn("⚠️ Button Load more element not found in the DOM!");
}

function createGallery(images) {
    const markUp = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<li class="gallery-card">
        <a href="${largeImageURL}">
        <img class="gallery-photo" src="${webformatURL}" alt="${tags.split(',').slice(0, 10).join(',')}"/>
        </a>
        <ul class="card-list">
        <li><h3>Likes</h3><p>${likes}</p></li>
        <li><h3>Views</h3><p>${views}</p></li>
        <li><h3>Comments</h3><p>${comments}</p></li>
        <li><h3>Downloads</h3><p>${downloads}</p></li>
        </ul>
        </li>
    `}).join("");
    gallery.insertAdjacentHTML("beforeend", markUp);
    lightbox.refresh();
};

function clearGallery() {
    gallery.innerHTML = "";
};

function showLoader() {
    loader.classList.remove('hidden');
};

function hideLoader() {
    loader.classList.add('hidden');
};

function showLoadMoreButton() {
    loadMoreBtn.classList.remove('hidden');
};

function hideLoadMoreButton() {
    loadMoreBtn.classList.add('hidden');
}

export { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton };