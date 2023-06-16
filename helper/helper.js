const strings = {
  truncate: (string, truncateCount)=>{
    return string.substring(0, string.length-truncateCount)

  }
}

const helper = {
  strings
}

export default helper

export {helper, strings}
