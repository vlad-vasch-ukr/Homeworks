//task1
const counter = function () {
  let num = 0
  return (arg) => {
    num += arg
    console.log(num)
  }
}()

//task 2
const getUpdatedArr = function() {
  let arr = []
  return (value) => {
    if (value !== undefined) {
      arr.push(value)
    } else arr = []
    console.log(arr)
    return arr
  }
}()

//task3
const getTime = function() {
  let previousTime = null
  let currentTime = null
  return () => {
    if (previousTime === null) {
      console.log('Enable')
      previousTime = new Date().getTime()
    } else {
      currentTime = new Date().getTime()
      const difference = Math.round((currentTime - previousTime) / 1000)
      previousTime = currentTime
      console.log(difference)
    }

  }
}()

//task4
const helper = (time) => {
  let h = time / 3600 ^ 0
  let m = ( time - h * 3600 ) / 60 ^ 0
  let s = time - h * 3600 - m * 60
  console.log( `${h ? String(h).padStart(2, 0) + ':' : ''}${String(m).padStart(2, 0) + ':' + String(s).padStart(2, 0)}`)
}

const timer = (time) => {
  if (Number.isInteger(time) && time < 0) {
    console.log('Please enter a valid integer greater than zero!!!')
  } else {
    const timeCircle = setTimeout(function run() {
      helper(time)
      time--
      if (time > 0) {
        setTimeout(run, 1000);
      } else {
        clearTimeout(timeCircle)
        console.log('Time End')
      }
    }, 1000);
  }
}
