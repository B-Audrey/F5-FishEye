export const factoryForMedia = (media) => {

    const generateMediaPath = (mediaPath) => {
        return mediaPath.startsWith('./assets/photographers-sample/') ? mediaPath : `./assets/photographers-sample/${mediaPath}`;
    };

    media.image ? media.image = generateMediaPath(media.image) : null;
    media.video ? media.video = generateMediaPath(media.video) : null;

    if(media.video){
        media.poster = `${media.video.split('.')[1]}.png`
    }

    const displayPictureDOM = (media) => {
        const imgHtml = `
                            <article >
                                <img tabindex="0" src="${media.image}" alt="${media.title}" class="photograph-media" id="${media.id}" aria-label="${media.title}">
                                <div class="gallery-text">
                                    <span>${media.title}</span>
                                    <div aria-label="likes" tabindex="0" class="likesOf ${media.id}">${media.likes} <i class="fa-solid fa-heart" title="heart"></i></div>
                                </div>
                            </article>
                            `;
        const videoHtml = `
                            <article>
                                <video tabindex="0" class="photograph-media" id="${media.id}" poster="${media.poster}" aria-label="${media.title}">
                                <source src="${media.video}" type="video/mp4" >
                                    
                                </video>
                                <div class="gallery-text">
                                    <span>${media.title}</span>
                                    <div aria-label="likes" tabindex="0" class="likesOf ${media.id}">${media.likes} <i class="fa-solid fa-heart" title="heart"></i></div>
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