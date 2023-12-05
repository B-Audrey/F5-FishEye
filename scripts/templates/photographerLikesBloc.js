export const displayLikesBloc = (likes, price) => {
    const html = `<span class="likesBloc_likes" aria-label="likes"> ${likes} <i class="fa-solid fa-heart" title="heart"></i></span>
                          <span class="likesBloc_price"> ${price}€ / jour </span> `;
    document.querySelector('.likesBloc').innerHTML = '';
    return document.querySelector('.likesBloc').innerHTML += html;
}