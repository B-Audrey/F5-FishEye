export const photographerTemplate = (data) => {
    data.portrait = `assets/photographers/personal-pictures/${data.portrait}`;
    const {name, portrait} = data;

    function getUserCardDOM() {
        const html = `
                            <article >
                            <a href="./photographer.html?id=${data.id}">
                                <img src="${data.portrait}" alt="view ${data.name} profile">
                                <h2>${data.name}</h2>
                            </a>
                            <div class="text">
                            <h3>${data.city}, ${data.country}</h3>
                            <p>${data.tagline}</p>
                            <span>${data.price}€/jour</span>
                             </div>
                            </article>
                            `
        console.log(html)
        //add the HTML content
        return document.querySelector('.photographer_section').innerHTML += html;
    }
    return {name, portrait, getUserCardDOM}
}