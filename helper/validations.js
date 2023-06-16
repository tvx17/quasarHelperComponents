const string = {
  hasValue: (string) => {
    if (string !== undefined && string != null) {
      return string.length > 0
    }
    return false
  },
  hasValidLength: (string, length) => {
    if (typeof length === 'object') {
      for (const tempLength of length) {
        if (string.length === tempLength) {
          return true
        }
        return false
      }
    } else {
      return string.length === length
    }

  },
  firstSetSecondNotSet: (string1, string2) => {
    return string1 !== string2
  },
  hasMinLength: (string, length) => {
    return string.length >= length
  }
}

const dateTime = {
  lessThanToday: (dateTime) => {
    if (methods.string.hasValue(dateTime)) {
      dateTime = typeof dateTime === 'string' ? new Date(dateTime) : dateTime
      return dateTime < new Date()
    }
    return false
  },
  firstLessThanLast: (dateTime1, dateTime2) => {
    if (methods.string.hasValue(dateTime1) && methods.string.hasValue(dateTime2)) {
      dateTime1 = typeof dateTime1 === 'string' ? new Date(dateTime1) : dateTime1
      dateTime2 = typeof dateTime2 === 'string' ? new Date(dateTime2) : dateTime2
      return dateTime1 < dateTime2
    }
  },
}

const time = {
  isValid: (time) => {
    if (methods.string.hasValue(time)) {
      if (!(/([012]{1}[0-9]{1}:[0-5]{1}[0-9]{1}|[012]{1}[0-9]{1}:[0-5]{1}[0-9]{1}:[0-5]{1}[0-9]{1})/).test(time)) {
        return false
      }
    }
    return true
  },
  hasValidLength: (time) => {
    if (methods.string.hasValue(time)) {
      return methods.string.hasValidLength(time, 5)
    }
    return true
  }
}

const date = {
  hasValidLength: (date) => {
    if (methods.string.hasValue(date)) {
      return methods.string.hasValidLength(date, 10)
    }
    return true
  },
  isLessThanToday: (date) => {
    if (methods.string.hasValue(date)) {
      return date < new Date()
    }
  },
  firstDateLessThanSecondDate: (date1, date2) => {
    if (methods.string.hasValue(date1) && methods.string.hasValue(date2)) {
      return date1 < date2
    }
    return false
  },
  datesAreEqual: (date1, date2) => {
    if (methods.string.hasValue(date1) && methods.string.hasValue(date2)) {
      return date1 === date2;
    }
    return false
  },
  isValidDate: (date, format = 'yyyy-mm-dd') => {
    if (methods.string.hasValue(date)) {
      if (!(/[2]{1}[0]{1}[23]{1}[0-9]{1}-[01]{1}[0-9]{1}-[0123]{1}[0-9]{1}/).test(date)) {
        return false
      }
    }
    return true
  },
}


const methods = {
  string,
  dateTime,
  time,
  date
}

export default methods

export {methods, dateTime, time, date}
