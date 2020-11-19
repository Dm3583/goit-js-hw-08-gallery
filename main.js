import imgSource from "./gallery-items.js";

// console.log(imgSource);

const gallery = document.querySelector('.js-gallery');

function renderImgs(imagesArr) {
    return imagesArr.reduce((renderString, img) => {
        const { preview, original, description } = img;
        // console.log(preview, original, description);
        renderString += `<li class="gallery__item">
                            <a class="gallery__link" href = "${original}">
                                <img
                                    class="gallery__image"
                                    src="${preview}"
                                    data-source="${original}"
                                    alt="${description}"
                                 />
                            </a>
                        </li>`;
        return renderString;
    }, '');
}

console.log(renderImgs(imgSource));
gallery.insertAdjacentHTML("afterbegin", renderImgs(imgSource));