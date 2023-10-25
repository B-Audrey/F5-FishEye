import {urlParser} from '../utils/urlParser.js';
import {getPhotographerById} from '../utils/functions.js';
import {photographerPresentation} from '../templates/photographerPresentation.js';

const urlParams = urlParser();

const currentPhotographer = await getPhotographerById(urlParams.id);
console.log(currentPhotographer)

const initPhotograph = () => {
    photographerPresentation(currentPhotographer);
}
//call at loading page
initPhotograph()