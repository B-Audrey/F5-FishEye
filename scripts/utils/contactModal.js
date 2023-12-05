import {submitForm} from './functions.js';

export const closeButton = document.getElementById('modal_close');
const mainHtmlContent = document.getElementById('main');
const contactModal = document.getElementById('contact_modal');

export const openContactModal = () => {
    contactModal.style.display = 'block';
    contactModal.ariaHidden = false ;
    mainHtmlContent.style.overflow = 'clip';
    mainHtmlContent.setAttribute('aria-hidden', true);
    closeButton.focus();
    closeButton.addEventListener('click', closeContactModal);
    document.getElementById('contact_modal-submit').addEventListener('click', (e) => {
        e.preventDefault();
        submitForm(e);
    });
};

export const closeContactModal = () => {
    contactModal.style.display = 'none';
    contactModal.ariaHidden = true
    mainHtmlContent.style.overflow = 'unset';
    mainHtmlContent.removeAttribute('aria-hidden');
    closeButton.removeEventListener('click', closeContactModal);
    document.getElementById('modal_opening').focus();
};
