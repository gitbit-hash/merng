export const stringBuilder = (obj) => {

  if (obj) {
    return Object.values(obj).reduce((acc, curr, idx, arr) => {
      if (arr.length === 1) {
        acc = curr
      } else if ((arr.length > 1) && (idx !== arr.length - 1)) {
        acc += `${curr}, `
      } else {
        acc += `and ${curr}`
      }

      return acc
    }, '')
  }

  return ''
}