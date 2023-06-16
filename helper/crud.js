import { notifies } from './messages';
import requests from './requests';
import { strings } from './helper';

import { api } from 'boot/axios';

const crudModes = {
  endpoint: 'endpoint',
  url: 'url',
  sequelize: 'sequelize',
};

let crudMode = '';

const save = async ({ destination, data, options, crudMode }) => {
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

const c = async ({ destination, data, crudMode }) => {
  crudMode = crudModeCheck(crudMode);
  data = sanitizeData(data);
  switch (crudMode) {
    case crudModes.endpoint:
      break;
    case crudModes.url:
      break;
    case crudModes.sequelize:
      return await window.db.post(destination, data);
  }
};
const r = async ({ destination, query, crudMode } = {}) => {
  let results;
  crudMode = crudModeCheck(crudMode);

  try {
    switch (crudMode) {
      case crudModes.endpoint:
        results = await api.get(destination, query);
        console.log('-------------->', results);
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
        console.log('-------------->', results);
        const data = results['data'];
        if (query['limit'] > 0 && data.length > query['limit']) {
          data.length = query['limit'];
        }
        return data;
      case crudModes.sequelize:
        return await window.db.get(destination, query);
    }
  } catch (e) {
    return null;
  }
};
const u = async ({ destination, data, crudMode }) => {
  crudMode = crudModeCheck(crudMode);
  data = sanitizeData(data);
  switch (crudMode) {
    case crudModes.endpoint:
      break;
    case crudModes.url:
      break;
    case crudModes.sequelize:
      return await window.db.put(destination, data);
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
  if (crudMode !== '') {
    return crudMode;
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
};

export default methods;

export { crudModes, crudMode, methods, c, r, u, d, save };
