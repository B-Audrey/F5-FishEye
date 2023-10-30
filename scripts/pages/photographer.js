import {urlParser} from '../utils/urlParser.js';
import {displayGallery, getMediasByPhotographerId, getPhotographerById, showModal} from '../utils/functions.js';
import {displayPhotographerPresentation} from '../templates/displayPhotographerPresentation.js';
import {modalNavigator} from '../utils/modalNavigator.js';
import {createImgElement} from '../templates/photographerFactoryForModal.js';
import {factoryForMedia} from '../templates/photographerFactoryForGallery.js';

export let imgIndex = 0;
const previousButton = document.getElementById('previousModalButton');
const nextButton = document.getElementById('nextModalButton');
let navModalIndex = 1;
let currentMedias = [];
let currentPhotographer = {}
let urlParams = '';
let likes = [];
let votes = [];


// Functions --------------
const openModalWithSelectedMedia = (event) => {
    const imgId = +event.target.id;
    imgIndex = currentMedias.findIndex((element) => element.id === imgId);
    modalNavigator.init(imgIndex, currentMedias);
    showModal(true);
    createImgElement(modalNavigator.getCurrentImg());
}

const initPhotograph = async () => {
    urlParams = urlParser();
    currentPhotographer = await getPhotographerById(urlParams.id);
    currentMedias = await getMediasByPhotographerId(urlParams.id);
    displayPhotographerPresentation(currentPhotographer);
    await displayGallery(currentMedias)
    const htmlActualMedias = document.querySelectorAll('.photograph-media');
    for (const media of htmlActualMedias) {
        media.addEventListener('click', (event) => {
            openModalWithSelectedMedia(event);
        });
        media.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') {
                openModalWithSelectedMedia(event);
            }
        });
    }
    likes = document.querySelectorAll('.likesOf');
    likes.forEach((like) => like.addEventListener( ('click'), (event) => {
        addLike(like)
    })
    )

}


//LISTENERS

const addLike = (like) => {
    const likeId = like.className.split(' ')[1]
    const imgToLike = currentMedias.find((element) => element.id === +likeId);
    const hasAlreadyVote = votes.some((media) => media.id === +likeId)
    if(hasAlreadyVote) {
        return console.error('vous avez deja liké cette image')
    }
    votes.push(imgToLike)
    imgToLike.likes += 1 ;
    console.log(imgToLike.likes)
    console.log(imgToLike)
    imgToLike.displayPictureDOM();
}

document.querySelector('.closeModalButton').addEventListener('click', () => {
    showModal(false);
});

previousButton.addEventListener('click', () => {
    const previous = modalNavigator.goToPreviousIndex();
    createImgElement(previous);
});
nextButton.addEventListener('click', () => {
    const next = modalNavigator.goToNextIndex();
    createImgElement(next);
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
        showModal(false);
    }
    if (e.key === 'Tab' && modal) {
        e.preventDefault();
        const modalButtons = Array.from(document.querySelectorAll('.modalBackground button'));
        if (navModalIndex === 0) {
            navModalIndex++;
        } else if (navModalIndex === 1) {
            navModalIndex--;
        }
        modalButtons[navModalIndex].focus()
    }
});


//call at loading page
initPhotograph()