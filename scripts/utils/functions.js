import {modalNavigator} from './modalNavigator.js';
import {factoryForMedia} from '../templates/photographerFactoryForGallery.js';
import {openContactModal} from './contactModal.js';

const getData = async () => {
    const response = await fetch('../../data/photographers.json');
    return await response.json();
};

export const getPhotographers = async () => {
    const jsonData = await getData();
    return jsonData.photographers;
};

export const getMedias = async () => {
    const jsonData = await getData();
    return jsonData.media;
};

export const getPhotographerById = async (id) => {
    const jsonPhotographers = await getPhotographers();
    return jsonPhotographers.find((photographer) => photographer.id === id);
};

export const getMediasByPhotographerId = async (photographerId) => {
    const jsonData = await getMedias();
    return jsonData.filter((media) => media.photographerId === photographerId);

};

export const showMediaModal = (display = true) => {
    document.querySelector('.zoomDisplay').innerHTML = ('');
    const modalBackground = document.querySelector('.modalBackground');
    modalBackground.style.display = display ? 'flex' : 'none';
    modalBackground.ariaHidden = display ? 'false' : 'true';
    if (!display) {
        modalNavigator.resetData();
    }
};

export const listenContactModal = (name) => {
    document.getElementById('modal_opening').addEventListener('click', openContactModal);
    document.getElementById('contact_modal-Name').innerHTML = `${name}`;
    document.getElementById('contact-me').ariaLabel += ` ${name}`;
}

export const displayGallery = async (medias) => {
    document.querySelector('.photograph-gallery').innerHTML = "";
    medias.forEach((media) => {
        //creates element with its Dom method
        const mediaModel = factoryForMedia(media);
        //applies the DOM method to display elements
        mediaModel.displayPictureDOM(media);
    });
};

export const formValidator = (data) => {
    let isFormValid = true;
    for (let i of data) {
        switch (i.type) {
            case 'email' :
                const isAvailableEmail = /^[a-z0-9._-]+@[a-z0-9._-]+\.[a-z0-9._-]+$/.test(i.value);
                if (!isAvailableEmail) {
                    isFormValid = false;
                    return alert('Votre formulaire ne peux être envoyé, veuillez renseigner une adresse email valide')
                }
                break;
            case 'text' :
                const isAvailableString = i.value.length > 1;
                if (!isAvailableString) {
                    isFormValid = false;
                    return alert('Votre formulaire ne peux être envoyé, veuillez remplir tous les champs')
                }
                break;
            default:
                console.error('An error has occurred on a form')
                alert('Votre formulaire ne peux être envoyé pour le moment')
                break;
        }
    }
    return isFormValid;
}
export const submitForm = (e) => {
    const textArea = document.getElementById('yourMessage');
    const message = {value : textArea.value, type : 'text', id : textArea.id};
    const inputs = [...document.querySelectorAll('#contact_form input'), message];
    const isFormValid = formValidator(inputs);
    if(!isFormValid){
        return console.error('le formulaire ne peut être soumis')
    }
    const data = inputs.reduce( (acc, cur) => {
        return { ...acc, [cur.id] : cur.value}
    }, {} )
    console.table(data)
}