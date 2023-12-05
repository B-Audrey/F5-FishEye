export const displayPhotographerTopPresentation = (photographer) => {
    const url = `./assets/photographers/personal-pictures/${photographer.portrait}`;
    const html = `
                        <div>
                            <h1>${photographer.name}</h1>
                            <h2>${photographer.city}, ${photographer.country}</h2>
                            <p>${photographer.tagline}</p>
                        </div>
                        <button class="contact_button" id="modal_opening" aria-label="Contact Me">Contactez-moi</button>
                        <img src="${url}" alt="view ${photographer.name} profile">
                        `;
    document.querySelector('.photograph-header').innerHTML += html;
};
