import imgSource from "./gallery-items.js";

const refGallery = document.querySelector('.js-gallery');
const refModalOverlay = document.querySelector('.lightbox__overlay');
const refModal = document.querySelector('.js-lightbox');
const refCloseModalBtn = document.querySelector('[data-action="close-lightbox"]');
const modalImg = refModal.querySelector('.lightbox__image');

function renderImgs(imagesArr) {
    return imagesArr.reduce((renderImages, img) => {
        const { preview, original, description } = img;
        renderImages += `<li class="gallery__item">
                            <a class="gallery__link" href = "${original}">
                                <img
                                    class="gallery__image"
                                    src="${preview}"
                                    data-source="${original}"
                                    alt="${description}"
                                 />
                            </a>
                        </li>`;
        return renderImages;
    }, '');
};

function openModalHandler(event) {
    if (event.target.nodeName !== "IMG") {
        return;
    }
    event.preventDefault();
    const currImg = event.target;
    refModal.classList.add('is-open');
    modalImg.src = currImg.dataset.source;
    window.addEventListener('keydown', keyHandler);
    document.body.classList.add('stop-scrolling');
}

function closeModalHandler() {
    refModal.classList.remove('is-open');
    clearImgSrc();
    window.removeEventListener('keydown', keyHandler);
    document.body.classList.remove('stop-scrolling');
}

function clearImgSrc() {
    modalImg.src = "";
}

function keyHandler({ code }) {
    const index = currentImgIndex();

    switch (code) {
        case "Escape":
            closeModalHandler();
            break;
        case "KeyA":
        case "ArrowLeft":

            if (index - 1 < 0) {
                modalImg.src = imgSource[0].original;
            } else {
                modalImg.src = imgSource[decrement(index)].original;
                // console.log("Left ", code, decrement(index));
            }
            break;

        case "KeyD":
        case "ArrowRight":
            if (index + 1 > imgSource.length - 1) {
                modalImg.src = imgSource[imgSource.length - 1].original;
            } else {
                modalImg.src = imgSource[increment(index)].original;
                // console.log("Right ", code, increment(index));
            };
            break;
    };
};

function currentImgIndex() {
    let img = modalImg;
    // for (let i = 0; i < imgSource.length; i += 1) {
    //     if (img.src === imgSource[i].original) {
    //         return i;
    //     };
    // };
    let currImg = imgSource.find(el => img.src === el.original);
    console.log(imgSource.indexOf(currImg));
    return imgSource.indexOf(currImg);
};

function increment(i) {
    return i += 1;
};

function decrement(i) {
    return i -= 1;
};


refGallery.insertAdjacentHTML("afterbegin", renderImgs(imgSource));
refGallery.addEventListener('click', openModalHandler);

refCloseModalBtn.addEventListener('click', closeModalHandler);
refModalOverlay.addEventListener('click', closeModalHandler);