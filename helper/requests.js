const runMode = 'app'

const setupCheck = async () => {
  if (runMode === 'app') {
    return await window.db.setupCheck();
  } else {
    //api['get'];
  }
}

const count = async(table)=>{
  return await getById(table, 'count')
}
const getFirst = async (table) => {
  methods.internalChecks(table)
  if (runMode === 'app') {
    return await window.db.getFirst(table);
  }
}
const getAll = async (table) => {
  methods.internalChecks(table)
  if (runMode === 'app') {
    return await window.db.getAll(table);
  }
}
const getById = async (table, id) => {
  methods.internalChecks(table)
  if (runMode === 'app') {
    return await window.db.getById(table, id);
  }
}
const get = async (table, data) => {
  methods.internalChecks(table)
  if (runMode === 'app') {
    return await window.db.get(table, data);
  } else {
  }
}
const post = async (table, data) => {
  methods.internalChecks(table)
  if (runMode === 'app') {
    return await window.db.post(table, methods.cleanUpData(data));
  } else {
  }
}
const put = async (table, data) => {
  methods.internalChecks(table)
  if (runMode === 'app') {
    return await window.db.put(table, methods.cleanUpData(data));
  } else {
  }
}
const deleteData = async (table, id) => {
  methods.internalChecks(table)
  if (runMode === 'app') {
    return await window.db.delete(table, id);
  } else {
  }
}
const router = async (table, method, where = null, fields = null, orderBy = null) => {
  methods.internalChecks(table)
  if (runMode === 'app') {
    return await window.db.router(table, method, where, fields, orderBy);
  }
}
const cleanUpData = (data) => {
  return JSON.parse(JSON.stringify(data))
}
const internalChecks = (table) => {
  if (table === undefined) {
    throw new Error('WLH: Table undefined');
  }
}

const methods = {
  setupCheck,
  getFirst,
  getAll,
  getById,
  get,
  post,
  put,
  deleteData,
  delete: deleteData,
  router,
  cleanUpData,
  internalChecks,
  count
}
export default methods;

export {methods, setupCheck, getFirst, getAll, getById, get, post, put, deleteData,router, cleanUpData, internalChecks, count}
