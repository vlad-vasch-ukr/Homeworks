class Student {
  static id = 0

  static getStudentId() {
    return this.id += 1
  }

  static listOfStudents = []

  constructor(enrollee) {
    this.id = Student.getStudentId(),
    this.name = enrollee.name,
    this.surname = enrollee.surname,
    this.ratingPoint = enrollee.ratingPoint,
    this.schoolPoint = enrollee.schoolPoint,
    this.isSelfPayment = Student.isSelfPayment(this, this.ratingPoint, this.schoolPoint)
  }

  static isSelfPayment(student) {
    if (student.ratingPoint >= 800 && Student.listOfStudents.length < 5) {
      Student.listOfStudents.push(student)
      return true
    } else if (student.ratingPoint >= 800) {
      Student.listOfStudents.sort((a,b) => a.ratingPoint - b.ratingPoint)
      if (student.ratingPoint > Student.listOfStudents[0].ratingPoint) {
        Student.listOfStudents.splice(0, 1 , student)
      } else if (student.ratingPoint === Student.listOfStudents[0].ratingPoint) {
          const lesser = Student.listOfStudents.filter(item => item.ratingPoint === student.ratingPoint).sort((a,b) => a.schoolPoint - b.schoolPoint)[0]
          const index = Student.listOfStudents.findIndex(item => item.id === lesser.id)
          Student.listOfStudents.splice(index, 1 , student)
        }
      }
    }
  }

for (let i = 0; i < studentArr.length; i++) {
	new Student(studentArr[i])
}

console.log(Student.listOfStudents)

//task 2

class CustomString {
  reverse(value) {
    if (typeof(value) === 'string') {
      let accum = ''
      for (let i = value.length - 1; i >= 0; i--) {
        accum += value[i]
      }
      return accum
    } else {
      console.log('Enter the string!!!')
    }
  }

  ucFirst(value) {
    if (typeof(value) === 'string') {
      let result = value[0].toUpperCase()
      for (let i = 1; i < value.length; i++) {
        result += value[i]
      }
      return result
    } else {
      console.log('Enter the string!!!')
    }
  }

  ucWords(value) {
    if (typeof(value) === 'string') {
      let result = value[0] !== ' ' ? value[0].toUpperCase() : ''
      for (let i = 0; i < value.length; i++) {
        if (value[i] === ' ' && value[i + 1] !== ' ') {
          result += value[i] + value[i + 1].toUpperCase()
        } else result += value[i]
      }
      return result
    } else {
      console.log('Enter the string!!!')
    }
  }
}

const myString = new CustomString()
myString.ucWords('gtfkgvhjfg dfsadf dfasdf')
