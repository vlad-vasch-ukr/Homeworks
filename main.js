//task 1
const citiesAndCountries = {
	'Киев': 'Украина',
	'Нью-Йорк': 'США',
	'Амстердам': 'Нидерланды',
	'Берлин': 'Германия',
	'Париж': 'Франция',
	'Лиссабон': 'Португалия',
	'Вена': 'Австрия',
}

const capitals = (list) => {
  if (typeof(list) === 'object' && !Array.isArray(list)) {
    const result = []
    for (let key of Object.keys(list)) {
      result.push(`${key} - это ${list[key]}`)
    }
    console.log(result)
    return result
  }
}

capitals(citiesAndCountries)

//task 2

function getArray(amount) {
  if (typeof(amount) === 'number' && amount > 0 && amount % 3 === 0) {
    const subarrayLength = 3
    const result = []
    let subarray = []
    for (let i = 1; i <= amount; i++) {
      subarray.push(i)
      if (subarray.length === subarrayLength) {
        result.push(subarray)
        subarray = []
      }
    }
    console.log(result)
    return result
  } else console.log('Please enter a number greater than zero and a multiple of three!!!')
}

getArray(12)

//task 3

function getNameOfDay(lang, dayOfWeek) {
  if (typeof(lang) === 'string' && typeof(dayOfWeek) === 'number' && 0 < dayOfWeek && dayOfWeek <= 7 && Number.isInteger(dayOfWeek) ) {
    const namesOfDays = {
      ru: ['Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота' , 'Воскресенье'],
      en: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' , 'Sunday'],
    }
    console.log(namesOfDays[lang][dayOfWeek - 1])
    return namesOfDays[lang][dayOfWeek - 1]
  } else console.log('Incorrect data!!!')
}

getNameOfDay('en', 1)

//task 4

const array = [1, -1, 100, 500, [1,'c'], 'c', {}, 2]

function sum(arr) {
  if (Array.isArray(arr)) {
    const set = new Set()
    for (let item of arr) {
      if (typeof(item) === 'number' && item >= 0 && Number.isInteger(item)) {
        set.add(item)
      }
    }
    if (set.size >= 4) {
      const found = [...set].sort((item, nextItem) => item - nextItem).slice(0, 2)
      console.log(found[0] + found[1])
      return (found[0] + found[1])
    }
  }
}

sum(array)
