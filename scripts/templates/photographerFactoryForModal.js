const modalPlace = document.querySelector('.zoomDisplay');
export const createImgElement = (mediaToDisplay) => {
    modalPlace.innerHTML = ('');
    if (mediaToDisplay.image) {
        modalPlace.innerHTML = `<img class='gallery-item' src='${mediaToDisplay.image}' alt='${mediaToDisplay.title}' id='${mediaToDisplay.id} loading='lazy'>
    <p>${mediaToDisplay.title}</p>`;
    }
    if (mediaToDisplay.video) {
        modalPlace.innerHTML = `<video controls> 
                                <source class='gallery-item' src='${mediaToDisplay.video}' id='${mediaToDisplay.id} loading='lazy'>
                                </video>
<p>${mediaToDisplay.title}</p>`;
    }
}