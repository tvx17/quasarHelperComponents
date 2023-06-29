import { Dialog } from 'quasar';
import { Notify } from 'quasar';

enum types {
  info = 'info',
  ongoing = 'ongoing',
  positive = 'positive',
  negative = 'negative',
}

interface IGenericNotifyParams {
  message: string;
  type: types;
  okButton?: boolean;
}

const genericNotify = ({
  message,
  type = types.positive,
  okButton = false,
}: IGenericNotifyParams): void => {
  const actions = [];
  let timeout = 1000;

  if (okButton) {
    actions.push({ label: 'OK', color: 'white' });
    timeout = 0;
  }

  Notify.create({
    message: message,
    progress: true,
    type: type,
    actions: actions,
    multiLine: true,
    html: true,
    timeout: timeout,
  });
};
const infoNotify = (message = ''): void => {
  if (message === '') {
    message = 'Information';
  }
  genericNotify({ message: message, type: types.info });
};
const ongoingNotify = (message = ''): void => {
  if (message === '') {
    message = 'Ongoing';
  }
  genericNotify({ message: message, type: types.ongoing });
};
const positiveNotify = (message = ''): void => {
  if (message === '') {
    message = 'Successful';
  }
  genericNotify({ message: message, type: types.positive });
};
const negativeNotify = (message = ''): void => {
  if (message === '') {
    message = 'Unsuccessful';
  }
  genericNotify({ message: message, type: types.negative, okButton: true });
};
const axiosErrorNotify = (errorObject: object) => {
  let text = 'Error during server request<br/>';
  text += '<hr/>';
  if (errorObject.response) {
    text += '<b>Summary:</b> ' + errorObject.response.statusText;
  } else {
    text += '<b>Summary:</b> no dataset returned from server';
  }
  text += '<hr/>';
  text += '<h6>';
  if (errorObject.response) {
    const errorNumber = /[0-9]{1,4}/.exec(errorObject.response.data.detail)[0];
    switch (errorNumber) {
      case '1451':
        text += 'Could not delete the record because it is in use.';
        break;
      case '1048':
        text += 'A column that needs to have a value has got no value. Please check the column.';
        text += '('+errorObject.response.data.detail+')';
      default:
        text += errorObject.response.data.detail;
    }
  }
  text += '</h6>';
  negativeNotify(text);
};

const notifies = {
  generic: genericNotify,
  info: infoNotify,
  ongoing: ongoingNotify,
  positive: positiveNotify,
  negative: negativeNotify,
  axiosError: axiosErrorNotify,
};

const commonDialogAsync = async (title = '', message = '') => {
  const promise = new Promise((resolve, reject) => {
    Dialog.create({
      title: title,
      message: message,
      prompt: {
        model: '',
        type: 'text', // optional
      },
      cancel: true,
      persistent: true,
    })
      .onOk(async (data) => {
        resolve(data);
      })
      .onCancel(async () => {
        resolve(false);
      })
      .onDismiss(() => {
        resolve(false);
      });
  });
  return await promise;
};
const commonDialog = (title = '', message = '') => {
  Dialog.create({
    title: title,
    message: message,
    prompt: {
      model: '',
      type: 'text', // optional
    },
    cancel: true,
    persistent: true,
  });
};
const messageDialog = (message: string) => {};
const newDialogAsync = async (title = '', message = '') => {
  if (title == null) {
    // title = t('messages.newTitle');
  }
  if (message == null) {
    // message = t('messages.newMessage');
  }
  const promise = new Promise((resolve, reject) => {
    Dialog.create({
      title: title,
      message: message,
      prompt: {
        model: '',
        type: 'text', // optional
      },
      cancel: true,
      persistent: true,
    }).onOk(async (data) => {
      resolve(data);
    });
  });
  return await promise;
};
const editDialog = () => {};
const deleteDialogAsync = async (title: string, message: string): Promise<boolean> => {
  const promise: Promise<boolean> = new Promise((resolve, reject) => {
    Dialog.create({
      title: title,
      message: message,
      cancel: true,
      persistent: true,
    })
      .onOk(async () => {
        resolve(true);
      })
      .onCancel(async () => {
        resolve(false);
      });
  });
  return await promise;
};

const dialogs = {
  common: commonDialog,
  commonAsync: commonDialogAsync,
  message: messageDialog,
  newAsync: newDialogAsync,
  edit: editDialog,
  deleteAsync: deleteDialogAsync,
};

const messages = {
  notifies,
  dialogs,
};

export default messages;

export {
  messages,
  notifies,
  dialogs,
  axiosErrorNotify,
  negativeNotify,
  genericNotify,
  infoNotify,
  ongoingNotify,
  positiveNotify,
  newDialogAsync,
  editDialog,
  deleteDialogAsync,
  commonDialog,
  commonDialogAsync,
};
