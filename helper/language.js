import {api} from 'boot/axios';

import {languageUrl} from 'src/app/config';

const usage = {}


export const get = async(locale, file) =>{
  const {data} = await api.get(languageUrl[runMode] + '/languages/' + locale + '/' + file + '.json')
  return data
}

const methods = {
  get
}

export default methods

export {methods}

