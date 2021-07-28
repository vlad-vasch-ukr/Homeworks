//task 1

for (let i = 1; i <= 10; i++) {
  if (i % 3 === 0) {
    console.log('FizBuz')
  } else if (i % 2 === 0) {
    console.log('Fiz')
  } else console.log('Buz')
}

//task 2

const factorial = (num) => {
  if (num <= 0 || typeof(num) !== 'number' || !Number.isInteger(num)) {
    console.log('Please enter an integer greater than zero!!!')
    return
  }
  let total = 1
  for (let i = 1; i <= num; i++) {
    total *= i
  }
  console.log(total)
}

factorial(7)

//task 3

function paperCalculator(sheetsInReamPaper, consumptionPerWeek, weeksAmount) {
  for (let i = 0; i < arguments.length; i++) {
    if (arguments[i] <= 0 || typeof(arguments[i]) !== 'number' || !Number.isInteger(arguments[i])) {
      console.log('Please enter an integer greater than zero!!!')
      return
    }
  }
  let amountPaperStr = (consumptionPerWeek * weeksAmount) / sheetsInReamPaper
  if (!Number.isInteger(amountPaperStr)) {
    const result = Number(String(amountPaperStr).split('.')[0]) + 1
    console.log(result)
  } else console.log(amountPaperStr)
}

paperCalculator(500, 1200, 8)

//task 4

function delivery(roomsOnFloor, floors, roomNumber) {
  for (let i = 0; i < arguments.length; i++) {
    if (arguments[i] <= 0 || typeof(arguments[i]) !== 'number' || !Number.isInteger(arguments[i])) {
      console.log('Please enter an integer greater than zero!!!')
      return
    }
  }
  let porch = null
  let floor = null
  let unverifiedPorch = roomNumber / (roomsOnFloor * floors)
  if (!Number.isInteger(unverifiedPorch)) {
    porch = Number(String(unverifiedPorch).split('.')[0])
  } else {
    porch = unverifiedPorch
    floor = floors
    console.log(`Porch: ${porch}`, `Floor: ${floor}`)
    return
  }
  floor = !Number.isInteger((roomNumber - (roomsOnFloor * floors * porch)) / roomsOnFloor) ? 
    Number((String((roomNumber - (roomsOnFloor * floors * porch)) / roomsOnFloor)).split('.')[0]) + 1 :
    ((roomNumber - (roomsOnFloor * floors * porch)) / roomsOnFloor) 
  porch += 1
  console.log(`Porch: ${porch}`, `Floor: ${floor}`)
}

delivery(3, 9, 456)

//task 5

const createPyramid = (medianNumber) => {
  if (medianNumber <= 0 || typeof(medianNumber) !== 'number' || !Number.isInteger(medianNumber)) {
    console.log('Please enter an integer greater than zero!!!')
    return
  }
  const rowLength = medianNumber * 2 - 1
  for (let i = 1; i <= medianNumber; i++) {
    let row = ''
    const step = i * 2 - 1
    for (let j = 0; j < rowLength; j++) {
      (rowLength - step) / 2  <= j && j < (rowLength - step) / 2 + step ? row += '#' : row += '-'
    }
    console.log(row)
  }
}

createPyramid(6)
