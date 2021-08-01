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