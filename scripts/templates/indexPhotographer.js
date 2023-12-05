export const photographerTemplate = (photographer) => {
    photographer.portrait = `assets/photographers/personal-pictures/${photographer.portrait}`;
    const {name, portrait} = photographer;

    function displayUserCardDOM() {
        const html = `
                            <article >
                            <a href="./photographer.html?id=${photographer.id}">
                                <img src="${photographer.portrait}" alt="${photographer.name}">
                                <h2>${photographer.name}</h2>
                            </a>
                            <div class="text">
                            <h3>${photographer.city}, ${photographer.country}</h3>
                            <p>${photographer.tagline}</p>
                            <span>${photographer.price}€/jour</span>
                             </div>
                            </article>
                            `
        //add the HTML content
        return document.querySelector('.photographer_section').innerHTML += html;
    }
    return {name, portrait, displayUserCardDOM: displayUserCardDOM}
}