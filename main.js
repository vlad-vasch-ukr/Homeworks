class Calendar {
  static #DAY_LENGTH = 10
  static #TIME_COUNTER = 8

  #root
  #data
  #path
  #intervals

  constructor(settings) {
    this.#data = null
    this.#intervals = null
    this.#root = settings.root
    this.#path = settings.path
  }

  create() {
    this.#root = document.querySelector(this.#root)
    const savedData = localStorage.getItem('calendar')
    if (savedData) {
      this.#data = JSON.parse(savedData)
      this.#createCalendarTable()
      this.#createControl()
    } else {
      this.#getData()
    }
  }

  #getData() {
    fetch(this.#path)
      .then((data) => data.json())
      .then((data) => this.#data = data)
      .then(() => {
        this.#createCalendarTable()
        this.#createControl()
      })
      .catch(err => console.log(err))
  }

  #createCalendarTable() {

    const tableWrap = document.createElement('div')
    tableWrap.classList.add('table-wrap')
    tableWrap.setAttribute('id', 'wrap')

    const table = document.createElement('table')
    table.setAttribute('id', 'table')
    table.classList.add('calendar')

    const tbody = document.createElement('tbody')
    table.append(tbody)

    for (let i = 0; i < Calendar.#DAY_LENGTH; i++) {
      const row = document.createElement('tr')
      row.classList.add('calendar__row')

      const tdTime = document.createElement('td')
      tdTime.classList.add('calendar__time')

      const tdTimeWrap = document.createElement('div')
      tdTimeWrap.classList.add('calendar__time-wrap')

      const hour = document.createElement('span')
      hour.classList.add('calendar__hour')
      hour.textContent = `${Calendar.#TIME_COUNTER}:00`
      tdTimeWrap.append(hour)

      if (Calendar.#TIME_COUNTER !== 17) {
        const half = document.createElement('span')
        half.classList.add('calendar__half')
        half.textContent = `${Calendar.#TIME_COUNTER}:30`
        tdTimeWrap.append(half)
      }

      tdTime.append(tdTimeWrap)

      const tdPeriod = document.createElement('td')
      tdPeriod.classList.add('calendar__period')

      row.append(tdTime, tdPeriod)
      tbody.append(row)
      Calendar.#TIME_COUNTER++
      
      // if (Calendar.#TIME_COUNTER === 13) {
      //   Calendar.#TIME_COUNTER = 1
      // }
    }

    table.append(tbody)
    tableWrap.append(table)
    this.#root.append(tableWrap)

    this.#prepareData()
    this.#createEvents()
    this.#createEventModal()
    document.querySelector('#wrap').addEventListener('click', this.#calendarHandler())
    this.#root.addEventListener('click', this.#clickOutside)
  }

  #createControl() {
    const control = document.createElement('div')
    control.classList.add('control')
    
    const controlTitle = document.createElement('span')
    controlTitle.classList.add('control__title')
    controlTitle.textContent = 'Create event'

    const inputStartWrap = document.createElement('div')
    inputStartWrap.classList.add('control__start-wrap')

    const inputStartHour = document.createElement('input')
    inputStartHour.setAttribute('type', 'number')
    inputStartHour.setAttribute('placeholder', 'H')
    inputStartHour.setAttribute('min', '8')
    inputStartHour.classList.add('control__start')

    const inputStartMin = document.createElement('input')
    inputStartMin.setAttribute('type', 'number')
    inputStartMin.setAttribute('placeholder', 'M')
    inputStartMin.setAttribute('min', '0')
    inputStartMin.classList.add('control__start-min')

    inputStartWrap.append(inputStartHour, inputStartMin)

    const inputDuration = document.createElement('input')
    inputDuration.setAttribute('type', 'number')
    inputDuration.setAttribute('placeholder', 'Duration')
    inputDuration.setAttribute('min', '0')
    inputDuration.classList.add('control__duration')

    const inputTitle = document.createElement('input')
    inputTitle.setAttribute('type', 'text')
    inputTitle.setAttribute('placeholder', 'Title')
    inputTitle.classList.add('control__input-title')

    const actions = document.createElement('div')
    actions.classList.add('control__actions')

    const save = document.createElement('button')
    save.setAttribute('type', 'button')
    save.classList.add('control__save')
    save.textContent = 'Save'

    const add = document.createElement('button')
    add.setAttribute('type', 'button')
    add.classList.add('control__add')
    add.textContent = 'Add'

    const reset = document.createElement('button')
    reset.setAttribute('type', 'button')
    reset.classList.add('control__reset')
    reset.textContent = 'Reset'

    actions.append(add, save, reset)
    control.append(controlTitle, inputStartWrap, inputDuration, inputTitle, actions)
    control.addEventListener('click', this.#controlHandler(control))

    this.#root.append(control)
  }

  #calendarHandler() {
    const modal = document.querySelector('.event-modal')
    modal.addEventListener('click', this.#modalHandler)
    const modalBody = modal.querySelector('.event-modal__body')
    return (e) => {
      e.stopPropagation()
      const event = e.target.closest('.calendar__event')
      if (event) {
        modalBody.classList.remove('show')
        const id = event.dataset.id
        const top = event.offsetTop
        const left = event.offsetLeft
        const eventWidth = getComputedStyle(event).width.replace('px', '')
        const eventHeight = getComputedStyle(event).height.replace('px', '')
        
        if (top < 400) {
          modal.classList.add('top-event')
          modal.style.top = top + parseInt(eventHeight) + 'px'
        } else {
          modal.style.top = top + 'px'
          modal.classList.remove('top-event')
        }
        modal.style.left = left + (eventWidth < 200 ? eventWidth / 2 - 100 : '') + 'px'
        modal.setAttribute('data-current', id)
        modal.classList.add('show')
      }
    }
  }

  #clickOutside() {
    const modal = document.querySelector('.event-modal')
    modal.classList.remove('show')
  }

  #clearCalendar() {
    const events = document.querySelectorAll('.calendar__event')
    const eventsArray = [...events]
    eventsArray.forEach(item => item.remove())
  }

  #modalHandler = (e) => {
    e.stopPropagation()
    const action = e.target
    const edit = action.closest('.event-modal__edit')
    const close = action.closest('.event-modal__close')
    const trash = action.closest('.event-modal__delete')
    const modal = action.closest('.event-modal')
    const modalBody = modal.querySelector('.event-modal__body')
    const input = modal.querySelector('.event-modal__input-title')
    const inputColor = modal.querySelector('.event-modal__input-color')
    const eventId = modal.getAttribute('data-current')
    const currentEvent = this.#data.find(item => item.id === parseInt(eventId))
    const saveTitle = action.closest('.event-modal__save-title')
    const saveColor = action.closest('.event-modal__save-color')
    const event = document.querySelector(`[data-id="${currentEvent.id}"]`)
    const eventStart = modal.querySelector('.event-modal__input-start')
    const eventDuration = modal.querySelector('.event-modal__input-duration')
    const eventIndex = this.#data.findIndex(item => item.id === parseInt(eventId))
    const saveEvent = action.closest('.event-modal__save-event')
    if (close) {
      modal.classList.remove('show')
      modalBody.classList.remove('show')
    } else if (trash) {
      this.#data.splice(eventIndex, 1)
      this.#prepareData()
      this.#clearCalendar()
      this.#createEvents()
      modal.classList.remove('show')
    } else if (edit) {
      input.value = currentEvent.title
      eventStart.value = currentEvent.start
      eventDuration.value = currentEvent.duration
      inputColor.value = currentEvent.eventColor
      modalBody.classList.toggle('show')
    } else if (saveTitle) {
      currentEvent.title = input.value
      event.textContent = input.value
    } else if (saveColor) {
      currentEvent.eventColor = inputColor.value
      event.style.backgroundColor = `rgba(${this.#convertHexToRgb(inputColor.value).join()}, .5)`
      event.style.borderLeft = `2px solid ${inputColor.value}`
    } else if (saveEvent) {
      if (currentEvent.start !== +eventStart.value || currentEvent.duration !== +eventDuration.value) {
        currentEvent.start = +eventStart.value
        currentEvent.duration = +eventDuration.value
        this.#prepareData()
        this.#clearCalendar()
        this.#createEvents()
      }
    }
  }

  #controlHandler(elem) {
    const control = elem
    return (e) => {
      e.stopPropagation()
      const action = e.target
      const add = action.closest('.control__add')
      const save = action.closest('.control__save')
      const reset = action.closest('.control__reset')
      if (save) {
        localStorage.setItem('calendar', JSON.stringify(this.#data))
        alert('Saved!')
      } if (reset) {
        localStorage.removeItem('calendar')
        location.reload()
      } if (add) {
        const inputStartHour = control.querySelector('.control__start')
        const inputStartMin = control.querySelector('.control__start-min')
        const inputDurationValue = control.querySelector('.control__duration')
        const inputTitle = control.querySelector('.control__input-title')
        const prepareHour = (inputStartHour.value - 8) * 60
        if (prepareHour >= 0 && inputStartMin.value >=0 && +inputStartMin.value <= 60 && inputTitle.value 
          && prepareHour + +inputStartMin.value + +inputDurationValue.value <= 540 && inputDurationValue.value > 0) {
            const newItem = {
              id: this.#createID(),
              start: prepareHour + +inputStartMin.value,
              duration: +inputDurationValue.value,
              title: inputTitle.value
            }
            this.#data.push(newItem)
            this.#data.sort((a, b) => a.start - b.start)
            this.#prepareData()
            this.#clearCalendar()
            this.#createEvents()
            inputStartHour.value = ''
            inputStartMin.value = ''
            inputDurationValue.value = ''
            inputTitle.value = ''
            console.log(newItem)
        } else {
          alert('Please enter correct data!')
        }
      }
    }
  }

  #createID() {
    const sorted = this.#data.sort((a, b) => b.id - a.id)
    const maxId = sorted[0].id
    return maxId + 1
  }

  #createNotification() {
    const notification = document.createElement('div')
    notification.classList.add('notification')

    const notificationTitle = document.createElement('span')
    notificationTitle.classList.add('notification__title')
  }

  #convertHexToRgb(hex) {
    return hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (r, g, b) => '#' + r + r + g + g + b + b)
    .substring(1).match(/.{2}/g)
    .map(x => parseInt(x, 16))
  }

  #createEvents() {
    for (const item of this.#intervals) {
      const event = document.createElement('div')
      event.classList.add('calendar__event')
      event.setAttribute('data-id', item.id)

      const index = String(item.start / 60)
      event.setAttribute('data-index', parseInt(index))

      const eventTitle = document.createElement('span')
      eventTitle.classList.add('calendar__event-title')
      eventTitle.textContent = item.title
      event.append(eventTitle)

      event.style.top = item.top + 'px'
      event.style.height = item.height + 'px'
      event.style.width = item.width + 'px'
      event.style.right = item.right + 'px'
      event.style.backgroundColor = `rgba(${this.#convertHexToRgb(item.eventColor).join()}, .5)`
      event.style.borderLeft = `2px solid ${item.eventColor}`

      const tableWrap = document.querySelector('#wrap')
      tableWrap.append(event)
    }
  }

  #prepareData() {
    const intervals = []

    for (let i = 0; i < Calendar.#DAY_LENGTH; i++) {
      this.#data.forEach(item => {
        const intervalStart = i * 100
        const top = (100 * item.start) / 60
        const height = (100 * item.duration) / 60

        if (top >= intervalStart && top < (intervalStart + 100)) {
          if (!item.eventColor) {
            item.eventColor = '#6E9ECF'
          }

          const newItem = Object.assign({}, item)
          newItem.interval = i
          newItem.top = top
          newItem.height = height

          intervals.push(newItem)
        }
      })
    }

    for (const item of intervals) {
      intervals.forEach(interval => {
        if (item.start > interval.start && item.start < interval.start + interval.duration || 
          item.start + item.duration > interval.start && item.start + item.duration < interval.start + interval.duration ||
          item.start <= interval.start && item.start + item.duration > interval.start + interval.duration) {
            item.hasConflict = true
            // if (item.hasConflict) {
            //   item.hasConflict.add(interval.id)
            // } else {
            //   item.hasConflict = new Set()
            //   item.hasConflict.add(interval.id)
            // }
        }

        if (item.interval === interval.interval && interval.start + interval.duration < item.start && interval.hasConflict) {
          item.subInterval = true
          if (item.affiliation) {
            item.affiliation.push(interval.id)
          } else {
            item.affiliation = [interval.id]
          }
          // if (item.affiliation) {
          //     item.affiliation.add(interval.id)
          //   } else {
          //     item.affiliation = new Set()
          //     item.affiliation.add(interval.id)
          //   }
        }
      })
    }

    for (let i = 0; i < Calendar.#DAY_LENGTH; i++) {
      const conflictParts = intervals.filter(item => {
        return item.hasConflict && !item.affiliation && item.interval === i
      })

      conflictParts.forEach((item, index) => {
        item.width = 200 / conflictParts.length
        item.right = index * item.width
      })
    }

    const subIntervals = intervals.filter(item => item.subInterval)
    
    subIntervals.forEach(item => {
      const affiliation = intervals.find(obj => obj.id === item.affiliation[0])
      item.width = item.affiliation.length * affiliation.width
      item.right = affiliation.right
    })

    this.#intervals = [...intervals]
  }

  #createEventModal() {
    const modal = document.createElement('div')
    modal.classList.add('event-modal')

    const actions = document.createElement('div')
    actions.classList.add('event-modal__actions')

    const close = document.createElement('button')
    close.setAttribute('type', 'button')
    close.classList.add('event-modal__close')

    const closeIcon = document.createElement('span')
    closeIcon.classList.add('icon-cancel-circle')

    close.append(closeIcon)

    const trash = document.createElement('button')
    trash.setAttribute('type', 'button')
    trash.classList.add('event-modal__delete')

    const trashIcon = document.createElement('span')
    trashIcon.classList.add('icon-bin')

    trash.append(trashIcon)

    const edit = document.createElement('button')
    edit.setAttribute('type', 'button')
    edit.classList.add('event-modal__edit')

    const editIcon = document.createElement('span')
    editIcon.classList.add('icon-pencil')

    edit.append(editIcon)

    actions.append(edit, trash, close)
    modal.append(actions)

    const modalBody = document.createElement('div')
    modalBody.classList.add('event-modal__body')

    const modalBodyTitle = document.createElement('span')
    modalBodyTitle.classList.add('event-modal__title')
    modalBodyTitle.textContent = 'Select event color'

    const chooseColor = document.createElement('input')
    chooseColor.setAttribute('type', 'color')
    chooseColor.classList.add('event-modal__input-color')

    const modalBodyInputTitle = document.createElement('span')
    modalBodyInputTitle.classList.add('event-modal__title')
    modalBodyInputTitle.textContent = 'Select event title'

    const chooseEventTitle = document.createElement('input')
    chooseEventTitle.setAttribute('type', 'text')
    chooseEventTitle.classList.add('event-modal__input', 'event-modal__input-title')

    const saveTitle = document.createElement('button')
    saveTitle.setAttribute('type', 'button')
    saveTitle.classList.add('event-modal__btn', 'event-modal__save-title')
    saveTitle.textContent = 'Save'

    const saveColor = document.createElement('button')
    saveColor.setAttribute('type', 'button')
    saveColor.classList.add('event-modal__btn', 'event-modal__save-color')
    saveColor.textContent = 'Save'


    const changeEventTitle = document.createElement('span')
    changeEventTitle.classList.add('event-modal__title')
    changeEventTitle.textContent = 'Change event'

    const changeStart = document.createElement('input')
    changeStart.setAttribute('type', 'number')
    changeStart.classList.add('event-modal__input-start', 'event-modal__input')

    const changeDuration = document.createElement('input')
    changeDuration.setAttribute('type', 'number')
    changeDuration.classList.add('event-modal__input-duration', 'event-modal__input')

    const saveEvent = document.createElement('button')
    saveEvent.setAttribute('type', 'button')
    saveEvent.classList.add('event-modal__btn', 'event-modal__save-event')
    saveEvent.textContent = 'Save'
    
    modalBody.append(changeEventTitle, changeStart, changeDuration, saveEvent, modalBodyInputTitle, 
      chooseEventTitle, saveTitle, modalBodyTitle, chooseColor, saveColor)
    modal.append(modalBody)

    const wrap = document.querySelector('#wrap')
    wrap.append(modal)
  }
}

new Calendar({
  root: '#root',
  path: '/data.json'
}).create()
