import {dialogs, notifies} from './messages';
import {verbosity} from './config';

/**
 *
 * @param message
 * @param level
 * @param dialog
 * @param notify
 * @param v
 */
const log = ({message, level = 'info', dialog = false, notify = false, v = false}) => {
  if (!v && !verbosity.app) return
  const messagePlain = (typeof message === 'string') ? message : message[0]
  const messageHtml = (typeof message === 'string') ? message : message[1]

  if (level === 'info') {
    console.log(messagePlain);
    notifies.positive(messageHtml);
  }
  if (level === 'error') {
    console.error(messagePlain);
    notifies.negative(messageHtml);
  }
  if (level === 'warning') {
    console.debug(messagePlain);
    notifies.ongoing(messageHtml);
  }
  if (dialog) {
    dialogs.common('LogMessage', messageHtml);
  }
}

/**
 *
 * @param errorObject
 * @param dialog
 * @param notify
 * @param v
 */
const error = ({errorObject, dialog = false, notify = false, v = false}) => {
  let htmlMessage = ''
  if (notify) htmlMessage += `<b>${errorObject.name}</b><hr/>`;
  let plainMessage = `${errorObject.name}: `;

  if (notify) htmlMessage += `<i>${errorObject.message} (${errorObject.code})</i><hr/>`;
  plainMessage += `${errorObject.message} (${errorObject.code})`;

  if (errorObject.response) {
    if (errorObject.response.statusText) {
      if (notify) htmlMessage += `<b>Summary:</b> ${errorObject.response.statusText} (${errorObject.response.status})`;
      plainMessage += ` - Summary: ${errorObject.response.statusText} (${errorObject.response.status})`;
    }
    if (errorObject.response.data.detail) {
      if (notify) htmlMessage += `<br/><b>Details:</b> ${errorObject.response.data.detail}`;
      plainMessage += ` - Details: ${errorObject.response.data.detail}`;
    }
  }

  log({message: [plainMessage, htmlMessage], dialog: dialog, notify: notify, level: 'error', v: v});
}

/**
 *
 * @param method
 * @param file
 * @param v
 */
const notImplemented = ({method, file, v = false}) => {
  if (!method && !file) {
    methods.log({message: `Not implemented`, level: 'warning'});
    return
  }
  methods.log({message: `Method "${method}"  in file "${file}" is not implemented`, level: 'warning'});
}

/**
 *
 */
const methods = {
  log, notImplemented, error
}

/**
 *
 */
export default methods

/**
 *
 */
export {log, notImplemented, methods, error}
