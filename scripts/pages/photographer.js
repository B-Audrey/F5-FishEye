import {urlParser} from '../utils/urlParser.js';
import {
    displayGallery,
    getMediasByPhotographerId,
    getPhotographerById,
    listenContactModal,
    showMediaModal
} from '../utils/functions.js';
import {displayPhotographerTopPresentation} from '../templates/photographerTopPresentation.js';
import {modalNavigator} from '../utils/modalNavigator.js';
import {createImgElement} from '../templates/photographerFactoryForModal.js';
import {displayLikesBloc} from '../templates/photographerLikesBloc.js';
import {closeContactModal} from '../utils/contactModal.js';

export let imgIndex = 0;
let filterValue = '';
let currentMedias = [];
let likesVotes = [];


// Functions --------------
const openModalWithSelectedMedia = (event) => {
    const imgId = +event.target.id;
    imgIndex = currentMedias.findIndex((element) => element.id === imgId);
    modalNavigator.init(imgIndex, currentMedias);
    showMediaModal(true);
    createImgElement(modalNavigator.getCurrentImg());
};

const initPhotograph = async () => {
    const urlParams = urlParser();
    const currentPhotographer = await getPhotographerById(urlParams.id);

    currentMedias = await getMediasByPhotographerId(urlParams.id);
    let totalLikes = 0;
    for (const media of currentMedias) {
        totalLikes += media.likes;
    }

    displayPhotographerTopPresentation(currentPhotographer);
    await displayGallery(currentMedias);

    displayLikesBloc(totalLikes, currentPhotographer.price);

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

    listenContactModal(currentPhotographer.name);

    const likes = document.querySelectorAll('.likesOf');
    likes.forEach((like) => like.addEventListener(('click'), (e) => {
            const newMedia = addLike(like);
            if (!newMedia) {
                console.error('vous avez déjà liké cette image');
            }
            else if (newMedia) {
                like.innerHTML = `${newMedia.likes} <i class="fa-solid fa-heart" title="heart"></i>`;
                totalLikes += 1;
                displayLikesBloc(totalLikes, currentPhotographer.price);
            }
        })
    );
};


//LISTENERS

document.getElementById('orderBy').addEventListener('change', (e) => {
    const valueToFilter = document.getElementById('orderBy').value;
    console.log(currentMedias);
    const sortedMedias = currentMedias.sort( (a, b) => {
       a(b)
    })
    console.log(sortedMedias);
})

const addLike = (like) => {
    const likeId = like.className.split(' ')[1];
    const imgToLike = currentMedias.find((element) => element.id === +likeId);
    const hasAlreadyVote = likesVotes.some((media) => media.id === +likeId);
    if (hasAlreadyVote) {
        return false;
    }
    likesVotes.push(imgToLike);
    imgToLike.likes += 1;
    return imgToLike;

};

document.querySelector('.closeModalButton').addEventListener('click', () => {
    showMediaModal(false);
});

document.getElementById('previousModalButton').addEventListener('click', () => {
    const previous = modalNavigator.goToPreviousIndex();
    createImgElement(previous);
});
document.getElementById('nextModalButton').addEventListener('click', () => {
    const next = modalNavigator.goToNextIndex();
    createImgElement(next);
});

window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' || e.key === 'Esc') {
        showMediaModal(false);
        closeContactModal();
    }
});


//call at loading page
initPhotograph();