import {notifies} from './messages';
import {strings} from './helper';

import {api} from 'boot/axios';
import {ref} from 'vue';

/**
 *
 * @type {{endpoint: string, public: string, sequelize: string, url: string}}
 */
const crudModes = {
  endpoint: 'endpoint',
  url: 'url',
  sequelize: 'sequelize',
  public: 'public',
};

/**
 *
 * @type {Ref<UnwrapRef<string>>}
 */
let crudMode = ref('');

/**
 *
 * @param data
 * @param type
 * @returns {{isActive}|*}
 */
const propsCheck = (data, type) => {
  if (type === 'read') {
    if (data.hasOwnProperty('isActive')) {
      data.isActive = data.isActive === 1
    }
  }
  return data
}

/**
 *
 * @param results
 * @returns {Array}
 */
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

/**
 *
 * @type {{}}
 */
const helper = {}


/**
 *
 * @param destination
 * @param overrideCrudMode
 * @param orderBy
 * @returns {Promise<Array|axios.AxiosResponse<any>|null|undefined>}
 */
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

/**
 *
 * @param destination
 * @param overrideCrudMode
 * @returns {Promise<Array|axios.AxiosResponse<any>|null|undefined>}
 */
const readFirst = async ({destination, overrideCrudMode}) => {
  return await r({
    destination: destination,
    overrideCrudMode: overrideCrudMode,
    query: {mode: 'readFirst'},
  });
};
/**
 *
 * @param destination
 * @param overrideCrudMode
 * @param query
 * @param orderBy
 * @returns {Promise<Array|axios.AxiosResponse<any>|null|undefined>}
 */
const readAllByQuery = async ({destination, overrideCrudMode, query, orderBy}) => {
  const localQuery = {}
  localQuery['mode'] = 'readAllByQuery';
  if (query) {
    localQuery['where'] = query
  }
  if (orderBy) {
    localQuery['orderBy'] = orderBy
  }

  return await r({
    destination: destination,
    overrideCrudMode: overrideCrudMode,
    query: localQuery
  });
};
/**
 *
 * @param destination
 * @param pkValue
 * @param overrideCrudMode
 * @returns {Promise<Array|axios.AxiosResponse<any>|null|undefined>}
 */
const readByPk = async ({destination, pkValue, overrideCrudMode}) => {
  return await r({
    destination: destination,
    overrideCrudMode: overrideCrudMode,
    query: {mode: 'readByPk', id: pkValue},
  })
};
/**
 *
 * @param destination
 * @param column
 * @param value
 * @param overrideCrudMode
 * @returns {Promise<Array|axios.AxiosResponse<any>|null|undefined>}
 */
const readByColumnId = async ({destination, column, value, overrideCrudMode}) => {
  return await r({
    destination: destination,
    overrideCrudMode: overrideCrudMode,
    query: {mode: 'readByColumnId', where: {[column]: value}}
  });
}
/**
 *
 * @param destination
 * @param overrideCrudMode
 * @returns {Promise<Array|axios.AxiosResponse<any>|null|undefined>}
 */
const readCount = async ({destination, overrideCrudMode}) => {
  return await r({
    destination: destination,
    overrideCrudMode: overrideCrudMode,
    query: {mode: 'readCount'},
  });
};

/**
 *
 * @param destination
 * @param data
 * @param options
 * @param overrideCrudMode
 * @param notify
 * @returns {Promise<axios.AxiosResponse<any>|*|null>}
 */
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

/**
 *
 * @param query
 * @param destination
 * @returns {string|*}
 */
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

/**
 *
 * @param destination
 * @param data
 * @param overrideCrudMode
 * @returns {Promise<axios.AxiosResponse<any>|*>}
 */
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
    case crudModes.public:
      throw new Error('Not supported for creating');
  }
};

/**
 *
 * @param destination
 * @param query
 * @param overrideCrudMode
 * @returns {Promise<axios.AxiosResponse<any>|Array|null>}
 */
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
      case crudModes.public:
        return await api.get(destination)
    }
  } catch (e) {
    return null;
  }
};
/**
 *
 * @param destination
 * @param data
 * @param overrideCrudMode
 * @returns {Promise<*>}
 */
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
    case crudModes.public:
      throw new Error('Not supported for updating');
  }
};
/**
 *
 * @param destination
 * @param id
 * @param crudMode
 * @param query
 * @returns {Promise<axios.AxiosResponse<any>|*|void>}
 */
const d = async ({destination, id, crudMode, query}) => {
  crudMode = crudModeCheck(crudMode);
  try {
    switch (crudMode) {
      case crudModes.endpoint:
        break;
      case crudModes.url:
        const url = buildUrl({urlParams: {id: id}}, destination);
        return await api.delete(url);
      case crudModes.sequelize:
        if(query === undefined && id === undefined) {
          throw new Error('You need to provide either an id or a query. Both variables where undefined')
        }
        return await window.db.delete(destination, id !== undefined ? id : query);
      case crudModes.public:
        throw new Error('Not supported for deleting');

    }
  } catch (e) {
    return e;
  }
};

// ----------------------------------------------------------------------------------------------------------
/**
 *
 * @returns {Promise<void>}
 */
const count = async () => {
};

/**
 *
 * @returns {Promise<void>}
 */
const getAll = async () => {
};
/**
 *
 * @returns {Promise<void>}
 */
const getById = async () => {
};

// ----------------------------------------------------------------------------------------------------------

/**
 *
 * @param localCrudMode
 * @returns string
 */
const crudModeCheck = (localCrudMode: string): string => {
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

/**
 *
 * @param data
 * @returns {any}
 */
const sanitizeData = (data) => {
  if (!data) return
  if (data.hasOwnProperty('isActive')) {
    data.isActive = data.isActive ? 1 : 0
  }
  return JSON.parse(JSON.stringify(data));
};

/**
 *
 * @type {{c: ((function({destination: *, data: *, crudMode: *}): Promise<axios.AxiosResponse<*>|*>)|*), read: ((function({destination: *, query: *, crudMode: *}=): Promise<axios.AxiosResponse<*>|Array|null>)|*), d: ((function({destination: *, id: *, crudMode: *, query: *}): Promise<axios.AxiosResponse<*>|*|void>)|*), readAllByQuery: (function({destination: *, overrideCrudMode: *, query: *, orderBy: *}): Promise<axios.AxiosResponse<*>|Array|null>), readFirst: (function({destination: *, overrideCrudMode: *}): Promise<axios.AxiosResponse<*>|Array|null>), save: ((function({destination: *, data: *, options: *, overrideCrudMode: *, notify?: boolean}): Promise<axios.AxiosResponse<*>|*|null>)|*), update: ((function({destination: *, data: *, overrideCrudMode: *}): Promise<*>)|*), readByColumnId: (function({destination: *, column: *, value: *, overrideCrudMode: *}): Promise<axios.AxiosResponse<*>|Array|null>), readByPk: (function({destination: *, pkValue: *, overrideCrudMode: *}): Promise<axios.AxiosResponse<*>|Array|null>), readCount: (function({destination: *, overrideCrudMode: *}): Promise<axios.AxiosResponse<*>|Array|null>), delete: ((function({destination: *, id: *, crudMode: *, query: *}): Promise<axios.AxiosResponse<*>|*|void>)|*), readAll: (function({destination: *, overrideCrudMode: *, orderBy: *}): Promise<axios.AxiosResponse<*>|Array|null>), r: ((function({destination: *, query: *, crudMode: *}=): Promise<axios.AxiosResponse<*>|Array|null>)|*), u: ((function({destination: *, data: *, overrideCrudMode: *}): Promise<*>)|*), create: ((function({destination: *, data: *, crudMode: *}): Promise<axios.AxiosResponse<*>|*>)|*)}}
 */
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

/**
 *
 */
export default methods;

/**
 *
 */
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
