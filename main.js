//task1
const searchCandidatesByPhoneNumber = phone => {
  const init = String(phone).replace(/[^\d]/g, '')
  const result = condidateArr.filter(item => {
    const prepareCandidatePhone = item.phone.replace(/[^\d]/g, '')
    const index = prepareCandidatePhone.indexOf(init)
    if (index !== -1) return item
  })
  return result
}

//task2
const getCandidateById = id => {
  const found = condidateArr.find(item => item._id === String(id))
  if (found) {
    const newObj = Object.assign({}, found)
    const registered = Date.parse(newObj.registered.replace(' ', ''))
    const date = new Date(registered)
    const year = String(date.getFullYear()).substring(2, 4)
    const mounth = String(date.getMonth() + 1).padStart(2, 0)
    const day = String(date.getDate()).padStart(2, 0)
    
    return `${year}/${mounth}/${day}`
  } else console.log('Wrong id!!!')
}

//task3
const sortCandidatesArr = sortBy => {
  if (typeof(sortBy) === 'string' && sortBy) {
    const result = condidateArr.sort((a, b) => {
      const newA = a.balance.replace(/[^\d]/g, '')
      const newB = b.balance.replace(/[^\d]/g, '')
      if (sortBy === 'asc') {
        return newA - newB
      } else if ('desc') {
        return newB - newA
      }
    })
    return result
  } else return condidateArr
}

//task4
const getEyeColorMap = () => {
  const result = {}
  condidateArr.forEach(candidat => {
    if (!result[candidat.eyeColor]) {
      result[candidat.eyeColor] = [candidat]
    } else {
      result[candidat.eyeColor].push(candidat)
    }
  })
  return result
}
