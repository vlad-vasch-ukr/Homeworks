//task1
const arr = ['Vasya', 'Petya', 'Alexey']
const removeUser = (array, index) => {
  array.splice(index, 1)
}

//task2
const obj = { name: 'Vasya', age: 1}

const getAllKeys = (object) => {
  return Object.keys(object)
}

//task3
const getAllValues = (object) => {
  return Object.values(object)
}

//task4 
const firstObj = {
  id: 3,
  name: 'Vasya'
}

const secondObj = {
  id: 4,
  name: 'Katya'
}

const array = [
  {
    id: 1,
    name: 'Kolya'
  },
  {
    id: 2,
    name: 'Petya'
  },
];

const insertIntoarr = (object, id) => {
  const elemPosition = array.findIndex((item => item.id === id))
	elemPosition !== -1 ? array.splice(elemPosition, 0, object) : console.log('Wrong id!!!')
  return array
}

//task5
class Candidat {
  constructor(obj) {
    Object.assign(this, obj)
  }
  state() {
    return this.address.split(',')[2]
  }
}

//task6
const getCompanyNames = () => {
  const set = new Set()
  condidateArr.forEach(item => set.add(item.company))
  return [...set]
}

//task7
const getUsersByYear = (year) => {
  const arr = condidateArr.filter(item => {
    const userDate = new Date(Date.parse(item.registered.replace(' ', ''))).getFullYear()
    if (userDate === year) {
      return item._id
    }
  })
  return arr
}

//task8
const getCondidatesByUnreadMsg = (amount) => {
  const arr = condidateArr.filter(item => Number(item.greeting.replace(/[^\d]/g, '')) === amount)
  return arr
}

//task9
const getCondidatesByGender = (gender) => {
	return condidateArr.filter(condidate => condidate.gender === gender)
}

//task10
Object.defineProperty(Array.prototype, 'cJoin', {
	value: function (separator) {
		let result = null
		separator = separator || ','
		for (let index in this) {
		  index === '0' ? result = this[index] : result += separator + this[index]
	  }
		return result
	},
	enumerable: false
})

Object.defineProperty(Array.prototype, 'cReduce', {
	value: function (callback, value) {
		let res = value || 0
		for (let index in this) {
			res = callback(res, this[index], index, this)
		}
		return res
	},
	enumerable: false
})
