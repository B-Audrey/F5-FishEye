const getData = async () => {
    const response = await fetch('../../data/photographers.json');
    return await response.json();
}

export const getPhotographers = async () => {
    const jsonData = await getData();
    return jsonData.photographers;
}

export const getMedias = async () => {
    const jsonData = await getData();
    return jsonData.media;
}



export const getPhotographerById = async (id) => {
    const jsonPhotographers = await getPhotographers();
    return jsonPhotographers.find((photographer) => photographer.id === id);
}

export const getMediasByPhotographerId = async (photographerId) => {
    const jsonData = await getMedias();
    return jsonData.filter( (media) => media.photographerId === photographerId )

}