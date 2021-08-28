const galleryItems = [
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg',
    description: 'Hokkaido Flower',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg',
    description: 'Container Haulage Freight',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg',
    description: 'Aerial Beach View',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg',
    description: 'Flower Blooms',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg',
    description: 'Alpine Mountains',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg',
    description: 'Mountain Lake Sailing',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg',
    description: 'Alpine Spring Meadows',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg',
    description: 'Nature Landscape',
  },
  {
    preview:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg',
    original:
      'https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg',
    description: 'Lighthouse Coast Sea',
  },
];


const galerryContainer = document.querySelector('.js-gallery');
const lightBox = document.querySelector('.js-lightbox');
const imageLightBox = document.querySelector('.lightbox__image');
const overlay = document.querySelector('.lightbox__overlay');

const cardsGalerry = createGalerryElements(galleryItems);

galerryContainer.addEventListener('click', onGalerryContainerClick);
galerryContainer.insertAdjacentHTML('beforeend', cardsGalerry);
const item = galerryContainer.querySelectorAll('.gallery__image');

let url = imageLightBox.dataset.source; 

function createGalerryElements(galleryItems) {
  return galleryItems.map(({ preview, original, description }) => {
    return `
    <li class="gallery__item">
  <a
    class="gallery__link"
    href="${original}"
  >
    <img
      class="gallery__image"
      src="${preview}"
      data-source="${original}"
      alt="${description}"
    />
  </a>
</li>`;
  })
    .join('');
};
function onCloseModal(el) {
    console.log(el);
  lightBox.classList.remove('is-open');

  window.removeEventListener('keydown', onEscKeyPress);
  imageLightBox.removeAttribute('src');

};

function onEscKeyPress(event) {
  const ESC_KEY_CODE = 'Escape';
  const isEscKey = event.code === ESC_KEY_CODE;

  if (isEscKey) {
    onCloseModal();
  };
}


function onGalerryContainerClick(evt) {
  evt.preventDefault();
  if (evt.target.nodeName !== 'IMG') {
    return;
  }
  const elem = evt.target;
  const srcElem = elem.dataset.source;

  onOpenModal();
  imageLightBox.src = srcElem;
}
 
function onOpenModal(evt) {
  lightBox.classList.add('is-open');
  
  const btnClose = document.querySelector('.lightbox__button');
  btnClose.addEventListener('click', onCloseModal);
  window.addEventListener('keydown', onEscKeyPress);
  window.addEventListener('keydown', onRightKeyPress);
}

overlay.addEventListener('click', onOverlayClick)
function onOverlayClick(event) {
  if (event.currentTarget === event.target) {
    onCloseModal();
  }
}

  
function onRightKeyPress(event) {

  const RIGHT_KEY_CODE = 'ArrowRight';
  const isRightKey = event.code === RIGHT_KEY_CODE;
  const LEFT_KEY_CODE = 'ArrowLeft';
  const isLeftKey = event.code === LEFT_KEY_CODE;
  const el = event.target.firstElementChild;
  item.forEach((el, index) => {
    el.setAttribute('index', index);
  });
 
  

const indexImage = el.getAttribute('index');
let curIndex = Number(indexImage) + 1;
  
  if (isRightKey) {
    item.forEach((el, index, arr) => {
      if (el.dataset.source === url) {
        curIndex = index;
      }
    });
    curIndex = curIndex === item.length - 1 ? curIndex = -1 : curIndex;
       url = item[curIndex + 1].dataset.source;
   imageLightBox.setAttribute('src', url);
  
  }

  if (isLeftKey) {
       item.forEach((el, index, arr) => {
      if (el.dataset.source === url) {
         if (index === 0) {
            index = arr.length;
        }
        curIndex = index;
      }
  });
    url = item[curIndex - 1].dataset.source;
  imageLightBox.setAttribute('src', url);
  }
}
