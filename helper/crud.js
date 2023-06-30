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
const readByPk = async ({ destination, pkValue, overrideCrudMode }) => {
  return await r({
    destination: destination,
    overrideCrudMode: overrideCrudMode,
    query: { mode: 'readByPk', id: pkValue },
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
  /*optionsElement = '';*/
  if (data.hasOwnProperty('id')) {
    try {
      await u({
        destination: destination,
        data: data,
        overrideCrudMode: overrideCrudMode,
      });
      notifies.positive('Änderungen gespeichert!');
      return null;
    } catch (e) {
      notifies.axiosError(e);
    }
  } else {
    try {
      const returnData = await c({
        destination: destination,
        data: data,
        overrideCrudMode: overrideCrudMode,
      });
      notifies.positive('Neuen Datensatz gespeichert!');
      return returnData;
    } catch (e) {
      notifies.axiosError(e);
    }
  }
};

const buildUrl = (query, destination) => {
  let url = query && query.hasOwnProperty('url') ? query['url'] : destination;
  if (query && query['urlParams']) {
    url += '?';
    for (const [key, value] of Object.entries(query['urlParams'])) {
      url += `${key}=${value}&`;
    }
    url = strings.truncate(url, 1);
  }
  return url;
};

const c = async ({ destination, data, crudMode: overrideCrudMode }) => {
  let localCrudMode = crudModeCheck(overrideCrudMode);
  data = sanitizeData(data);

  switch (localCrudMode) {
    case crudModes.endpoint:
      return await api.post(destination, data);
    case crudModes.url:
      break;
    case crudModes.sequelize:
      return await window.db.create(destination, data);
  }
};
const r = async ({ destination, query, crudMode: overrideCrudMode } = {}) => {
  if (!destination) {
    throw new Error('No destination given');
  }

  let results;
  const localCrudMode = crudModeCheck(overrideCrudMode);
  try {
    switch (localCrudMode) {
      case crudModes.endpoint:
        results = await api.get(destination, query);

        if (results.hasOwnProperty('data')) {
          results = results['data'];
        }
        if (results.hasOwnProperty('value')) {
          results = results['value'];
        }
        if (results.length === 1 && typeof results === 'object') {
          results = results[0];
        }

        return results;
      case crudModes.url:
        let url = buildUrl(query, destination);
        results = await api.get(url);
        let data = results.hasOwnProperty('data') ? results['data'] : results;
        if (query && query['limit'] > 0 && data.length > query['limit']) {
          data.length = query['limit'];
        }
        if (data.length === 1 && typeof data === 'object') {
          data = data[0];
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
      const results = await api.patch(destination, data);
      break;
    case crudModes.url:
      break;
    case crudModes.sequelize:
      return await window.db.update(destination, data);
  }
};
const d = async ({ destination, id, crudMode }) => {
  crudMode = crudModeCheck(crudMode);
  try {
    switch (crudMode) {
      case crudModes.endpoint:
        break;
      case crudModes.url:
        const url = buildUrl({ urlParams: { id: id } }, destination);
        return await api.delete(url);
      case crudModes.sequelize:
        return await window.db.delete(destination, id);
    }
  } catch (e) {
    return e;
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
  save,
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
