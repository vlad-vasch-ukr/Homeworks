//task3
class Aplication {
  constructor(settings) {
    this.data = null
    this.filterPath = ''
    Object.assign(this, settings)
  }

  init() {
    this.root = document.querySelector(this.root)
    this.filters = document.querySelector(this.filters)
    this.filters.addEventListener('input', this.filterCharacters())

    const valid = this.valid()
    if (valid) {
      this.getData(this.charactersId)
    } else {
      const error = new Error('Incorrect data')
      console.log(error)
    }
  }

  valid() {
    if (Array.isArray(this.charactersId)) {
      for (const value of this.charactersId) {
        if (!Number.isInteger(+value)) {
          return false
        }
      }
      return true
    }
  }

  getData(query) {
    fetch(`https://rickandmortyapi.com/api/character/${query}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          this.data = data.results
        } else {
          this.data = data
        }
      })
      .then(() => {
        this.clearCardContainer()
        this.renderCards()
      })
      .catch((err) => console.log(err))
  }

  createCard(item) {
    const card = document.createElement('div')
    card.classList.add('card')
  
    const cardInfo = document.createElement('div')
    cardInfo.classList.add('card-info')
  
    const titleWrap = document.createElement('div')
    titleWrap.classList.add('title')
  
    const h1 = document.createElement('h1')
    h1.textContent = item.name
  
    const status = document.createElement('div')
    status.classList.add('status')
  
    const liveStatus = document.createElement('div')
    liveStatus.classList.add('live-status')
    item.status === 'Dead' ? liveStatus.classList.add('dead') : ''
  
    const statusP = document.createElement('p')
    statusP.textContent = `${item.species} -- ${item.status}`
  
    status.append(liveStatus, statusP)
    titleWrap.append(h1, status)
  
    const content = document.createElement('div')
    content.classList.add('content')
  
    const contentP = document.createElement('p')
    contentP.textContent = item.location.name

    cardInfo.append(titleWrap)
    content.append(contentP)
    cardInfo.append(content)
  
    const cardImgWrap = document.createElement('div')
    cardImgWrap.classList.add('card-image')
  
    const cardImg = document.createElement('img')
    cardImg.setAttribute('src', item.image)
  
    cardImgWrap.append(cardImg)
    card.append(cardInfo, cardImgWrap)

    this.root.append(card)
  }

  clearCardContainer() {
    while (this.root.firstChild) {
      this.root.firstChild.remove();
    }
  }

  filterCharacters = () => {
    const obj = {
      gender: '',
      status: ''
    }
    return (e) => {
      const checkbox = e.target
      if (checkbox.id === 'male' || checkbox.id === 'female') {
        if (checkbox.id === obj.gender) {
          document.querySelector(`#${obj.gender}`).checked = false
          obj.gender = ''
        } else {
          obj.gender ? document.querySelector(`#${obj.gender}`).checked = false : ''
          obj.gender = checkbox.id
          document.querySelector(`#${obj.gender}`).checked = true
        }
      } else if (checkbox.id === 'alive' || checkbox.id === 'dead') {
        if (checkbox.id === obj.status) {
          document.querySelector(`#${obj.status}`).checked = false
          obj.status = ''
        } else {
          obj.status ? document.querySelector(`#${obj.status}`).checked = false : ''
          obj.status = checkbox.id
          document.querySelector(`#${obj.status}`).checked = true
        }
      }
      const genderParam = obj.gender ? `gender=${obj.gender}` : ''
      const statusParam = obj.status ? `status=${obj.status}` : ''
      if (!genderParam && !statusParam) {
        this.getData(this.charactersId)
      } else if (genderParam && statusParam) {
        const path = `?${genderParam}&${statusParam}`
        this.getData(path)
      } else {
        const path = `?${genderParam}${statusParam}`
        this.getData(path)
      }
    }
  }
  
  renderCards() {
    this.data.forEach(item => {
      this.createCard(item)
    })
  }
  
}

const aplication = new Aplication({
  root: '.container',
  filters: '.form-container',
  charactersId: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30]
})

aplication.init()
