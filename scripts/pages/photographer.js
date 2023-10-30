import {urlParser} from '../utils/urlParser.js';
import {getMediasByPhotographerId, getPhotographerById} from '../utils/functions.js';
import {photographerPresentation} from '../templates/photographerPresentation.js';
import {factoryForMedia} from '../templates/photographerFactoryForGallery.js';


const  displayGallery = async (medias) => {
    medias.forEach((media) => {
        //creates element with its Dom method
        const mediaModel = factoryForMedia(media);
        //applies the DOM method to display elements
        mediaModel.displayPictureDOM();
    });
}

const initPhotograph = async () => {
    const urlParams = urlParser();
    const currentPhotographer = await getPhotographerById(urlParams.id);
    const currentMedias = await getMediasByPhotographerId(urlParams.id);
    photographerPresentation(currentPhotographer);
    await displayGallery(currentMedias)
}
//call at loading page
initPhotograph()