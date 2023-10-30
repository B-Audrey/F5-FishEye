export const photographerPresentation = (photographer) => {
    photographer.portrait = `./assets/photographers/personal-pictures/${photographer.portrait}`;
    const html = `
                        <div>
                            <h1>${photographer.name}</h1>
                            <h2>${photographer.city}, ${photographer.country}</h2>
                            <p>${photographer.tagline}</p>
                        </div>
                        <button class="contact_button" onclick="displayModal()">Contactez-moi</button>
                        <img src="${photographer.portrait}" alt="view ${photographer.name} profile">
                        `
    return document.querySelector('.photograph-header').innerHTML += html;
}