export const getPhotographers = async () => {
    const response = await fetch('../../data/photographers.json');
    const jsonData = await response.json();
    console.log(jsonData)
    return jsonData.photographers;
}

export const getPhotographerById = async (id) => {
    const jsonPhotographers = await getPhotographers();
    return jsonPhotographers.find((photographer) => photographer.id === id);
}