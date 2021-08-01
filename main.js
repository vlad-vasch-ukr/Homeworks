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