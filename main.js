//=====render cards========
const cardContainer = document.querySelector('#items')

const renderCards = () => {
  let html = ''
  items.forEach(item => {
    html += `
    <div class="outlet-items__item">
      <div class="outlet-card">
        <div class="outlet-card__top">
          <svg class="outlet-card__favorite">
            <use xlink:href="img/icons/sprite-symbols.svg#like-empty-icon"></use>
          </svg>
          <img src="img/${item.imgUrl}" draggable="false" class="outlet-card__preview">
          <span class="outlet-card__title">${item.name}</span>
          <span class="outlet-card__info">
            <svg class="outlet-card__stock">
              <use xlink:href="img/icons/sprite-symbols.svg#${item.orderInfo.inStock ? 'check' : 'close'}-icon"></use>
            </svg>
            <span>${item.orderInfo.inStock}</span> left in stock
          </span>
          <span class="outlet-card__info">
            Price: <span>${item.price}</span> $
          </span>
          <button type="button" ${!item.orderInfo.inStock ? 'disabled' : ''} class="outlet-card__button">
            Add to cart
          </button>
        </div>
        <div class="outlet-card__bottom">
          <div class="outlet-card__review">
            <span>
              <b>${item.orderInfo.reviews}%</b> Positive reviews
            </span>
            <span>Above avarage</span>
          </div>
          <div class="outlet-card__orders">
            <span>
              <b>571</b>
            </span>
            <span>orders</span>
          </div>
        </div>
      </div>
    </div>
    `
  })
  cardContainer.innerHTML = html
}

renderCards()

//=====init swiper=======
const swiper = new Swiper('.swiper-container', {
  direction: 'horizontal',
  loop: true,
  autoplay: {
    delay: 3500,
  },
  speed: 2000
});