import {urlParser} from '../utils/urlParser.js';
import {
    displayGallery,
    getMediasByPhotographerId,
    getPhotographerById,
    listenContactModal,
    showMediaModal
} from '../utils/functions.js';
import {displayPhotographerTopPresentation} from '../templates/photographerHeaderPresentation.js';
import {modalNavigator} from '../utils/modalNavigator.js';
import {createImgElement} from '../templates/photographerFactoryForModal.js';
import {displayLikesBloc} from '../templates/photographerLikesBloc.js';

export let imgIndex = 0;
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
    likes.forEach((like) => {
        like.addEventListener('click', (e) => {
            handleLikeEvent(like);
        });

        like.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                handleLikeEvent(like);
            }
        });
    });

    const handleLikeEvent = (like) => {
        const newMedia = addLike(like);
        if (!newMedia) {
            console.error('Vous avez déjà liké cette image');
        } else if (newMedia) {
            like.innerHTML = `${newMedia.likes} <i class="fa-solid fa-heart" title="heart"></i>`;
            totalLikes += 1;
            displayLikesBloc(totalLikes, currentPhotographer.price);
        }
    };
};


//LISTENERS

document.getElementById('orderBy').addEventListener('change', async (e) => {
    const valueToFilter = document.getElementById('orderBy').value;
    if (valueToFilter === 'Date') {
        currentMedias.sort((a, b) => {
            // ! typage ! => date : string
            return a.date.localeCompare(b.date);
        });
    }
    if (valueToFilter === 'Titre') {
        currentMedias.sort((a, b) => {
            return a.title.localeCompare(b.title);
        });
    }
    if (valueToFilter === 'Popularité') {
        currentMedias.sort((a, b) => {
            return a.likes - b.likes;
        });
    }
    console.log(currentMedias);
    await displayGallery(currentMedias);

});

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
    navigateModal('previous');
});

document.getElementById('nextModalButton').addEventListener('click', () => {
    navigateModal('next');
});

// Ajouter la navigation au clavier
document.addEventListener('keydown', (event) => {
    if (isMediaModalOpen()) {
        switch (event.key) {
            case 'ArrowLeft':
                navigateModal('previous');
                break;
            case 'ArrowRight':
                navigateModal('next');
                break;
            case 'Escape':
                showMediaModal(false);
                break;
            default:
                break;
        }
    }
});
const isMediaModalOpen = () => {
    const lightBox = document.getElementById('lightBox');
    return lightBox.ariaHidden === 'false';

};

const navigateModal = (direction) => {
    let mediaToDisplay;

    if (direction === 'previous') {
        mediaToDisplay = modalNavigator.goToPreviousIndex();
    } else if (direction === 'next') {
        mediaToDisplay = modalNavigator.goToNextIndex();
    }

    createImgElement(mediaToDisplay);
};


//call at loading page
initPhotograph();
// place 1t focus to h1
document.addEventListener('DOMContentLoaded', () => {
    const pageTitle = document.getElementById('logoFishEye');
    pageTitle.focus();
});