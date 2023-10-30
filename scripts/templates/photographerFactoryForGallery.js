export const factoryForMedia = (media) => {
    media.image ? media.image = `./assets/photographers-sample/${media.image}` : null;
    media.video ? media.video = `./assets/photographers-sample/${media.video}` : null;

    const displayPictureDOM = () => {
        const imgHtml = `
                            <article>
                                <img src="${media.image}" alt="${media.title}" class="photograph-media" id="${media.id}">
                                <div class="gallery-text">
                                    <span>${media.title}</span>
                                    <span class="likesOf ${media.id}">${media.likes} <i class="fa-solid fa-heart" title="heart"></i></span>
                                </div>
                            </article>
                            `;
        const videoHtml = `
                            <article>
                                <video class="photograph-media" id="${media.id}">
                                <source src="${media.video}" type="video/mp4" >
                                    
                                </video>
                                <div class="gallery-text">
                                    <span>${media.title}</span>
                                    <span class="likesOf ${media.id}">${media.likes} <i class="fa-solid fa-heart" title="heart"></i></span>
                                </div>
                            </article>
                            `;
        if (media.image) {
            return document.querySelector('.photograph-gallery').innerHTML += imgHtml;
        }
        if (media.video) {
            return document.querySelector('.photograph-gallery').innerHTML += videoHtml;
        }
        return console.error('erreur sur un media')

    }
    return {media, displayPictureDOM: displayPictureDOM}
}