const getSystemTime = () => {
  const date = new Date()
  const year = date.getFullYear()
  let month = date.getMonth() + 1
  let day = date.getDate()
  let hours = date.getHours()
  let minutes = date.getMinutes()
  let seconds = date.getSeconds()
  if (month >= 1 && month <= 9) month = "0" + month
  if (day >= 0 && day <= 9) day = "0" + day
  if (hours >= 0 && hours <= 9) hours = "0" + hours
  if (minutes >= 0 && minutes <= 9) minutes = "0" + minutes
  if (seconds >= 0 && seconds <= 9) seconds = "0" + seconds
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

export default getSystemTime
