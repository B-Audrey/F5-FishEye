import {modalNavigator} from './modalNavigator.js';
import {factoryForMedia} from '../templates/photographerFactoryForGallery.js';

const getData = async () => {
    const response = await fetch('../../data/photographers.json');
    return await response.json();
}

export const getPhotographers = async () => {
    const jsonData = await getData();
    return jsonData.photographers;
}

export const getMedias = async () => {
    const jsonData = await getData();
    return jsonData.media;
}

export const getPhotographerById = async (id) => {
    const jsonPhotographers = await getPhotographers();
    return jsonPhotographers.find((photographer) => photographer.id === id);
}

export const getMediasByPhotographerId = async (photographerId) => {
    const jsonData = await getMedias();
    return jsonData.filter( (media) => media.photographerId === photographerId )

}

export const showModal = (display = true) => {
    document.querySelector('.zoomDisplay').innerHTML=('');
    const modalBackground = document.querySelector('.modalBackground');
    modalBackground.style.display = display ? 'flex' : 'none';
    modalBackground.ariaHidden = display ? 'false' : 'true';
    if(!display){
        modalNavigator.resetData();
    }
}

export const  displayGallery = async (medias) => {
    medias.forEach((media) => {
        //creates element with its Dom method
        const mediaModel = factoryForMedia(media);
        //applies the DOM method to display elements
        mediaModel.displayPictureDOM();
    });
}