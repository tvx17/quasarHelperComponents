import {notifies} from './messages';
import {strings} from './helper';

import {api} from 'boot/axios';
import {ref} from 'vue';

const crudModes = {
    endpoint: 'endpoint',
    url: 'url',
    sequelize: 'sequelize',
};

let crudMode = ref('');

const propsCheck = (data, type) => {
  if (type === 'read') {
    if (data.hasOwnProperty('isActive')) {
      data.isActive = data.isActive === 1
    }
  }
  return data
}

const readChecks = (results) => {
  if (results.hasOwnProperty('data')) {
    results = results['data'];
  }
  if (results.hasOwnProperty('value')) {
    results = results['value'];
  }

  if (results.constructor === Array) {
    for (const result of results) {
      propsCheck(result, 'read');
    }
    if (results.length === 1) {
      results = results[0];
    }
  }


    return results
}

const helper = {}


const readAll = async ({destination, overrideCrudMode, orderBy}) => {
  const query = {mode: 'readAll'};
  if (orderBy) {
    query['orderBy'] = orderBy
  }

  return await r({
        destination: destination,
        overrideCrudMode: overrideCrudMode,
        query: query,
    });
};
const readFirst = async ({destination, overrideCrudMode}) => {
    return await r({
        destination: destination,
        overrideCrudMode: overrideCrudMode,
        query: {mode: 'readFirst'},
    });
};
const readAllByQuery = async ({destination, overrideCrudMode, query, orderBy}) => {
  const localQuery = {}
  localQuery['mode'] = 'readAllByQuery';
  if(query) {
    localQuery['where'] = query
  }
  if(orderBy) {
    localQuery['orderBy'] = orderBy
  }

  return await r({
        destination: destination,
        overrideCrudMode: overrideCrudMode,
        query: localQuery
    });
};
const readByPk = async ({destination, pkValue, overrideCrudMode}) => {
    return await r({
        destination: destination,
        overrideCrudMode: overrideCrudMode,
        query: {mode: 'readByPk', id: pkValue},
    })
};
const readByColumnId = async ({destination, column, value, overrideCrudMode}) => {
    return await r({
        destination: destination,
        overrideCrudMode: overrideCrudMode,
        query: {mode: 'readByColumnId', where: {[column]: value}}
    });
}
const readCount = async ({destination, overrideCrudMode}) => {
    return await r({
        destination: destination,
        overrideCrudMode: overrideCrudMode,
        query: {mode: 'readCount'},
    });
};

const save = async ({destination, data, options, overrideCrudMode, notify = true}) => {
    /*optionsElement = '';*/
    if (data.hasOwnProperty('id')) {
        try {
            await u({
                destination: destination,
                data: data,
                overrideCrudMode: overrideCrudMode,
            });
            if (notify) notifies.positive('Changes where saved!');
            return null;
        } catch (e) {
            if (notify) notifies.axiosError(e);
        }
    } else {
        try {
            const returnData = await c({
                destination: destination,
                data: data,
                overrideCrudMode: overrideCrudMode,
            });
            if (notify) notifies.positive('New dataset was saved!');
            return returnData;
        } catch (e) {
            if (notify) notifies.axiosError(e);
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

const c = async ({destination, data, crudMode: overrideCrudMode}) => {
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
const r = async ({destination, query, crudMode: overrideCrudMode} = {}) => {
  query = sanitizeData(query)
  if (!destination) {
    throw new Error('No destination given');
  }

    let results;
    const localCrudMode = crudModeCheck(overrideCrudMode);
    try {
        switch (localCrudMode) {
            case crudModes.endpoint:
                return readChecks(await api.get(destination, query))
            case crudModes.url:
                let url = buildUrl(query, destination);
                return readChecks(await api.get(url))
            case crudModes.sequelize:
                return readChecks(await window.db.read(destination, query));
        }
    } catch (e) {
        return null;
    }
};
const u = async ({destination, data, overrideCrudMode}) => {
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
const d = async ({destination, id, crudMode}) => {
  crudMode = crudModeCheck(crudMode);
  console.log('Delete', destination, id)
  try {
    switch (crudMode) {
      case crudModes.endpoint:
        break;
      case crudModes.url:
        const url = buildUrl({urlParams: {id: id}}, destination);
        return await api.delete(url);
      case crudModes.sequelize:
        return await window.db.delete(destination, id);
    }
  } catch (e) {
    return e;
  }
};

// ----------------------------------------------------------------------------------------------------------
const count = async () => {
};
const getAll = async () => {
};
const getById = async () => {
};

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
  if (!data) return
  if (data.hasOwnProperty('isActive')) {
    data.isActive = data.isActive ? 1 : 0
  }
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
  readByColumnId,
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
  readByColumnId
};
