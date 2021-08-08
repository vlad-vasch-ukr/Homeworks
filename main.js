//task 1

function Emploee(employee) {
  if (typeof(employee) === 'object') {
    for (let key of Object.keys(employee)) {
      this[key] = employee[key]
    }
  }
}

//task 2

Emploee.prototype.getFullName = function () {
  return `${this.surname} ${this.name}`
}

//task 3

const createEmployesFromArr = (arr) => {
  const newArr = []
  arr.forEach(item => {
    newArr.push(new Emploee(item))
  })
  return newArr
}

const emplyeeConstructArr = createEmployesFromArr(emplyeeArr)

//task 4

const getFullNamesFromArr = (arr) => {
  return arr.map(item => item.getFullName())
}

getFullNamesFromArr(emplyeeConstructArr)

//task 5

const getMiddleSalary = (arr) => {
  return (arr.reduce((sum, nextItem) => sum + nextItem.salary, 0) / arr.length).toFixed(2)
}

getMiddleSalary(emplyeeConstructArr)

//task 6

const getRandomEmployee = (arr) => {
  return arr[Math.floor(Math.random() * arr.length)]
}
  
getRandomEmployee(emplyeeConstructArr)

//task 7

class Emploee2 {
  constructor(data) {
		this.id = data.id
		this.name = data.name
		this.surname = data.surname
		this.salary = data.salary
		this.workExperience = data.workExperience
		this.isPrivileges = data.isPrivileges
		this.gender = data.gender
	}

  get fullInfo() {
    let result = []
    for (let key of Object.keys(this)) {
      result.push(`${key} - ${this[key]}`)
    }
    return result.join(', ')
  }

  set fullInfo(obj) {
    for (const key of Object.keys(obj)) {
      if (this.hasOwnProperty(key)) {
        this[key] = obj[key]
      }
    }
  }
}
