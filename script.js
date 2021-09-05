//task1
const createFormFields = () => {
  const amountFields = parseInt(prompt('Please enter the number of fields!!!'))

  if (amountFields) {
    const regBtn = document.querySelector('form > .button')
    
    for (let i = 1; i <= amountFields; i++) {
      const input = document.createElement('input')
      input.setAttribute('type', 'text')
      input.setAttribute('value', `Input ${i}`)
      input.classList.add('input-item')
      i === amountFields ? input.classList.add('margin-zero') : ''
      i % 2 ? input.classList.add('yellow') : ''
      !(i % 3) ? (input.removeAttribute('value'), input.setAttribute('placeholder', 'Some text')) : ''
      regBtn.before(input)
    }
  } else console.log('Please enter the correct number!!!')
}

createFormFields()

//task2
const clock = () => {
  const buttonStart = document.createElement('button')
  buttonStart.textContent = 'Start'
  const buttonStop = document.createElement('button')
  buttonStop.textContent = 'Stop'
  const clockTitle = document.createElement('h2')
  const clockContainer = document.createElement('div')
  clockContainer.append(buttonStart, buttonStop, clockTitle)
  document.forms[0].after(clockContainer)

  let interval = null

  const getTime = () => {
    clockTitle.textContent = new Date().toLocaleTimeString()
  }

  buttonStart.addEventListener('click', () => {
    !interval ? interval = setInterval(getTime, 1000) : ''
  })

  buttonStop.addEventListener('click', () => {
    clearInterval(interval)
    interval = null
  })
}

clock()

//task3
const createBaseHtml = () => {
  const arrayParagraphs = ['I am first paragraph', 'I am second paragraph', 'I am last paragraph']

  const wrapper = document.createElement('div')
  wrapper.setAttribute('id', 'wrapper')

  const footer = document.createElement('div')
  footer.setAttribute('id', 'footer')

  const h1 = document.createElement('h1')
  h1.textContent = 'Footer'
  footer.append(h1)

  const main = document.createElement('div')
  main.setAttribute('id', 'main')

  arrayParagraphs.forEach(item => {
    const p = document.createElement('p')
    p.textContent = item
    main.append(p)
  })

  wrapper.append(footer, main)

  document.forms[0].nextElementSibling.after(wrapper)
}

createBaseHtml()

const changeBackground = () => {
  const lastParagraph = document.querySelector('#main > p:last-child')
  lastParagraph.style.background = '#ff0000'
}

changeBackground()

const changeFooterPosition = () => {
  const wrapper = document.querySelector('#wrapper')
  const footer = document.querySelector('#footer')
  wrapper.append(footer)
}

changeFooterPosition()

//task4
const createMenu = () => {
  const INGREDIENTS = {
    "cocoa": ["cocoa powder", "milk", "sugar"],
    "cappuccino": ["milk", "coffee"],
    "smoothie": ["banana", "orange", "sugar"],
    "matcha frappe": ["matcha", "milk", "ice"]
  }

  const menuWrapper = document.createElement('div')
  
  const title = document.createElement('h1')
  title.textContent = 'Menu'

  const list = document.createElement('ul')
  list.setAttribute('id', 'menu')

  for (const key in INGREDIENTS) {
    const listItem = document.createElement('li')
    listItem.textContent = key
    list.append(listItem)
  }

  menuWrapper.append(title, list)

  list.addEventListener('click', (e) => {
    const selectedElement = e.target.closest('li')

    if (selectedElement) {
      const hasSubList = selectedElement.querySelector('ol')
      if (hasSubList) {
        hasSubList.remove()
      } else {
        const subList = document.createElement('ol')

        INGREDIENTS[selectedElement.textContent].forEach(item => {
          const subListItem = document.createElement('li')
          subListItem.textContent = item
          subList.append(subListItem)
        })

        selectedElement.append(subList)
      }
    }
  })

  document.body.lastElementChild.before(menuWrapper)
}

createMenu()
