import {Dialog, Notify} from 'quasar';

 const notifies = {
  generic: ({message, type='positive'}) => {
    Notify.create({
      message: message,
      type: type
    })
  },
  info: (message = null) => {
    if (message == null) {
      message = 'Information';
    }
    notifies.generic({message: message, type: 'info'});
  },
  ongoing: (message = null) => {
    if (message == null) {
      message = 'Ongoing';
    }
    notifies.generic({message: message, type: 'ongoing'});
  },
  positive: (message = null) => {
    if (message == null) {
      message = 'Successful';
    }
    notifies.generic({message: message, type: 'positive'});

  },
  negative: (message = null) => {
    if (message == null) {
      message = 'Unsuccessful';
    }
    notifies.generic({message: message, type: 'negative'});
  },
  error: (errorObject) => {
    let text = 'Error during server request<br/>';
    text += '<hr/>';
    if (errorObject.response) {
      text += '<b>Summary:</b> ' + errorObject.response.statusText;
    } else {
      text += '<b>Summary:</b> no data returned from server'
    }
    text += '<hr/>';
    text +='<h6>'
    if (errorObject.response) {
      const errorNumber = /[0-9]{1,4}/.exec(errorObject.response.data.detail)[0]
      switch (errorNumber) {
        case '1451':
          text += 'Could not delete the record because it is in use.';
          break
        default:
          text += errorObject.response.data.detail;
      }
    }
    text +='</h6>'
    notifies.negative(text);
  }
};
const dialogs = {
  commonAsync: async (title = null, message = null) => {
    let promise = new Promise((resolve, reject) => {
      Dialog.create(
        {
          title: title,
          message: message,
          prompt: {
            model: '',
            type: 'text' // optional
          },
          cancel: true,
          persistent: true
        }).onOk(async data => {
        resolve(data);
      }).onCancel(async() => {
        resolve(false);
      }).onDismiss(() => {
        resolve(false);
      });
    });
    return await promise;
  },
  common: (title = null, message = null) => {
    Dialog.create(
        {
          title: title,
          message: message,
          prompt: {
            model: '',
            type: 'text' // optional
          },
          cancel: true,
          persistent: true
        })
  },
  message:(message)=>{

  },
  new: async (title = null, message = null) => {
    if (title == null) {
      // title = t('messages.newTitle');
    }
    if (message == null) {
      // message = t('messages.newMessage');
    }
    let promise = new Promise((resolve, reject) => {
      Dialog.create(
        {
          title: title,
          message: message,
          prompt: {
            model: '',
            type: 'text' // optional
          },
          cancel: true,
          persistent: true
        }).onOk(async data => {
        resolve(data);
      });
    });
    return await promise;
  },
  edit: () => {
  },
  delete: async (title = null, message = null) => {
    if (title == null) {
      // title = t('messages.deleteTitle');
    }
    if (message == null) {
      // message = t('messages.deleteMessage');
    }
    let promise = new Promise((resolve, reject) => {
      Dialog.create(
        {
          title: title,
          message: message,
          cancel: true,
          persistent: true
        }).onOk(async () => {
        resolve(true);
      }).onCancel(async () => {
        resolve(false);
      });

    });
    return await promise;
  }

};

const messages = {
  notifies,
  dialogs
}

export default messages

export {messages, notifies, dialogs}


