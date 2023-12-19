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
    await displayData(jsonPhotographers);
}

//call at loading page
initIndex();
// place 1t focus to h1
document.addEventListener('DOMContentLoaded', () => {
    // Sélectionnez le titre h1
    const pageTitle = document.getElementById('logoFishEye"');

    // Mettez le focus sur le titre h1
    pageTitle.focus();
});

    
