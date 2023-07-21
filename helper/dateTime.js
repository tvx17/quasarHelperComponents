
const dateTime = {

}


const time = {
  now: (asString = false) => {
    const now = new Date();
    if (!asString) {
      return now.getTime();
    }

    const hours = (now.getHours().toString().length === 1 ? '0' + now.getHours().toString() : now.getHours().toString());
    const minutes = (now.getMinutes().toString().length === 1 ? '0' + now.getMinutes().toString() : now.getMinutes().toString());
    return hours + ':' + minutes;
  }
};
const date = {
  now: (asString = false) => {
    try {
      let now = new Date();
      now = new Date(now.setMonth(now.getMonth() + 1));
      if (!asString) {
        return now;
      }
      const day = (now.getDate().toString().length === 1 ? '0' + now.getDate().toString() : now.getDate().toString());
      const month = (now.getMonth().toString().length === 1 ? '0' + now.getMonth().toString() : now.getMonth().toString());
      return day + '.' + month + '.' + now.getFullYear();
    } catch (e) {
      console.error(e);
      return '';
    }

  },
  fromString: (dateString) => {
    let date = dateString.split('.');
    return new Date(date[1] + '/' + date[0] + '/' + date[2]);
  },
  stringFromDateObject: (dateObject) => {
    const day = (dateObject.getDate().toString().length === 1 ? '0' + dateObject.getDate().toString() : dateObject.getDate().toString());
    const month = (dateObject.getMonth().toString().length === 1 ? '0' + dateObject.getMonth().toString() : dateObject.getMonth().toString());
    return day + '.' + month + '.' + dateObject.getFullYear();
  }
};


const methods = {
  time,date
}

export default methods

export {methods,date,time}
