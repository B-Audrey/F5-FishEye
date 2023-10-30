import {getPhotographers} from '../utils/functions.js';
import {photographerTemplate} from '../templates/indexPhotographer.js';

const  displayData = async (photographers) => {
    photographers.forEach((photographer) => {
        //creates element with its Dom method
        const photographerModel = photographerTemplate(photographer);
        //applies the DOM method to display elements
        photographerModel.displayUserCardDOM();
    });
}

const initIndex = async ()=> {
    const jsonPhotographers = await getPhotographers();
    console.log(jsonPhotographers)
    await displayData(jsonPhotographers);
}

//call at loading page
initIndex();

    
