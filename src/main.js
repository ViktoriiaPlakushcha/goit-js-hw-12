// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";
import { getImagesByQuery } from "./js/pixabay-api.js";
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton, loadMoreBtn } from "./js/render-functions.js"


const form = document.querySelector('.form');

form.addEventListener('submit', handleSubmit);
let searchWord = null;
let page = 1;
let totalPages = null;
let cardMesure;

async function handleSubmit(event) {
    event.preventDefault();
    searchWord = event.target.elements['search-text'].value.toLowerCase().trim();
    if (!searchWord) {
        showToast({
            message: 'Please, enter word for search!',
        });
        return;
    }
    clearGallery();
    hideLoadMoreButton();
    showLoader();
    page = 1;
    totalPages = null;
    try {
        const responce = await getImagesByQuery(searchWord, page);
        const images = responce.hits;

        if (images.length === 0) {
            showToast({
                message: 'Sorry, there are no images matching your search query. Please try again!',
            });
            return;
        };

        createGallery(images); 
        totalPages = Math.ceil(responce.totalHits / images.length);

    } catch (error) {
        iziToast.show({
            message: error.message,
        });
    } finally {
        hideLoader();
    };

    if (totalPages > 1) {
        showLoadMoreButton();
    } else {
        showToast({
            message: "We're sorry, but you've reached the end of search results.",
            backgroundColor: "yellow",
            messageColor: 'black',
        });
    };
};

loadMoreBtn.addEventListener('click', handleClick);

async function handleClick() {
    page += 1;
    hideLoadMoreButton();
    try {
        showLoader();
        const results = await getImagesByQuery(searchWord, page);
        createGallery(results.hits);
        hideLoader();
        let galleryCard = document.querySelector('.gallery-card');
        if (galleryCard) {
            cardMesure = galleryCard.getBoundingClientRect();
            window.scrollBy({
                top: cardMesure.height*2,
                behavior: "smooth",
            });}
        if (page === totalPages) {
            showToast({
                message: "We're sorry, but you've reached the end of search results.",
                backgroundColor: "yellow",
                messageColor: 'black',
            })
            hideLoadMoreButton();
            return;
        }
        showLoadMoreButton();
    } catch (error) {
        showToast({
            message: error.message,
        });
    };
};

function showToast({
    message = '',
    backgroundColor = 'red',
    messageColor = 'white',
    position = 'topRight',
    maxWidth = 380,
    messageSize = '16',
    className = 'my-toast',
}) {
    iziToast.show({
    message,
    messageColor,
    backgroundColor,
    position,
    maxWidth,
    messageSize,
    class: className,
});
}