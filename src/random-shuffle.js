/**
 * Shuffle the contents of an array
 * @function shuffle
 * @param {array} list - an array to be shuffled
 * @return {array} shuffled
 */
export const shuffle = (list) => {
  const newList = [...list]
  // modified fisher-yates shuffle
  let start = newList.length
  while (start-- > 0) {
    const index = Math.floor(Math.random() * start + 1)
    const current = newList[index]
    const newer = newList[start]
    newList[index] = newer
    newList[start] = current
  }
  return newList
}
