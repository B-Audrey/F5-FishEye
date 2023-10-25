import {urlParser} from '../utils/urlParser.js';
import {getPhotographerById} from '../utils/functions.js';

const urlParams = urlParser();

const currentPhotographer = await getPhotographerById(urlParams.id);
console.log(currentPhotographer)