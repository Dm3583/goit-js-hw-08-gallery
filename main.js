import imgSource from "./gallery-items.js";

// console.log(imgSource);

const refGallery = document.querySelector('.js-gallery');
const refModal = document.querySelector('.js-lightbox');
const refCloseModalBtn = document.querySelector('[data-action="close-lightbox"]');
const modalImg = refModal.querySelector('.lightbox__image');
console.log(refModal);

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

function openModalHandler(event) {
    event.preventDefault();
    const currImg = event.target;
    refModal.classList.add('is-open');
    modalImg.src = currImg.dataset.source;
}

function closeModalHandler() {
    refModal.classList.remove('is-open');
    modalImg.src = "";
}



// console.log(renderImgs(imgSource));
refGallery.insertAdjacentHTML("afterbegin", renderImgs(imgSource));

refGallery.addEventListener('click', openModalHandler);

refCloseModalBtn.addEventListener('click', closeModalHandler);