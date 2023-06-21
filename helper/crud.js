import { notifies } from './messages';
import { strings } from './helper';

import { api } from 'boot/axios';
import { ref } from 'vue';

const crudModes = {
  endpoint: 'endpoint',
  url: 'url',
  sequelize: 'sequelize',
};

let crudMode = ref('');

const readAll = async ({ destination, overrideCrudMode }) => {
  return await r({
    destination: destination,
    overrideCrudMode: overrideCrudMode,
    query: { mode: 'readAll' },
  });
};
const readFirst = async ({ destination, overrideCrudMode }) => {
  return await r({
    destination: destination,
    overrideCrudMode: overrideCrudMode,
    query: { mode: 'readFirst' },
  });
};
const readAllByQuery = async ({ destination, overrideCrudMode }) => {
  return await r({
    destination: destination,
    overrideCrudMode: overrideCrudMode,
    query: { mode: 'readAllByQuery' },
  });
};
const readByPk = async ({ destination, overrideCrudMode }) => {
  return await r({
    destination: destination,
    overrideCrudMode: overrideCrudMode,
    query: { mode: 'readByPk' },
  });
};
const readCount = async ({ destination, overrideCrudMode }) => {
  return await r({
    destination: destination,
    overrideCrudMode: overrideCrudMode,
    query: { mode: 'readCount' },
  });
};

const save = async ({ destination, data, options, overrideCrudMode }) => {
  options = '';
  overrideCrudMode = '';

  if (data.hasOwnProperty('id')) {
    try {
      await u(destination);
      notifies.positive('Änderungen gespeichert!');
      return null;
    } catch (e) {
      notifies.error(e);
    }
  } else {
    try {
      const returnData = await c({ destination, data });
      notifies.positive('Neuen Datensatz gespeichert!');
      return returnData;
    } catch (e) {}
  }
};

const c = async ({ destination, data, crudMode: overrideCrudMode }) => {
  let localCrudMode = crudModeCheck(overrideCrudMode);
  data = sanitizeData(data);
  switch (overrideCrudMode) {
    case crudModes.endpoint:
      break;
    case crudModes.url:
      break;
    case crudModes.sequelize:
      return await window.db.create(destination, data);
  }
};
const r = async ({ destination, query, crudMode: overrideCrudMode } = {}) => {
  let results;
  const localCrudMode = crudModeCheck(overrideCrudMode);
  try {
    switch (localCrudMode) {
      case crudModes.endpoint:
        results = await api.get(destination, query);
        return results['data'];
      case crudModes.url:
        let url = query.hasOwnProperty('url') ? query['url'] : destination;
        if (query['urlParams']) {
          url += '?';
          for (const [key, value] of Object.entries(query['urlParams'])) {
            url += `${key}=${value}&`;
          }
          url = strings.truncate(url, 1);
        }
        results = await api.get(url);
        const data = results['data'];
        if (query['limit'] > 0 && data.length > query['limit']) {
          data.length = query['limit'];
        }
        return data;
      case crudModes.sequelize:
        return await window.db.read(destination, query);
    }
  } catch (e) {
    return null;
  }
};
const u = async ({ destination, data, overrideCrudMode }) => {
  const localCrudMode = crudModeCheck(overrideCrudMode);
  data = sanitizeData(data);
  switch (localCrudMode) {
    case crudModes.endpoint:
      break;
    case crudModes.url:
      break;
    case crudModes.sequelize:
      return await window.db.update(destination, data);
  }
};
const d = async ({ destination, id, crudMode }) => {
  crudMode = crudModeCheck(crudMode);
  switch (crudMode) {
    case crudModes.endpoint:
      break;
    case crudModes.url:
      break;
    case crudModes.sequelize:
      return await window.db.delete(destination, id);
  }
};

// ----------------------------------------------------------------------------------------------------------
const count = async () => {};
const getAll = async () => {};
const getById = async () => {};

// ----------------------------------------------------------------------------------------------------------

const crudModeCheck = (localCrudMode) => {
  if (
    localCrudMode != null &&
    localCrudMode !== '' &&
    localCrudMode !== undefined
  ) {
    return localCrudMode;
  }
  if (crudMode.value !== '') {
    return crudMode.value;
  }
  throw new Error('No valid crud mode');
};

const sanitizeData = (data) => {
  return JSON.parse(JSON.stringify(data));
};

const methods = {
  c,
  create: c,
  r,
  read: r,
  u,
  update: u,
  d,
  delete: d,
  readAll,
  readFirst,
  readAllByQuery,
  readByPk,
  readCount,
};

export default methods;

export {
  crudModes,
  crudMode,
  methods,
  c,
  r,
  u,
  d,
  save,
  readAll,
  readFirst,
  readAllByQuery,
  readByPk,
  readCount,
  count,
  getAll,
};
