/**
 *
 * @type {{}}
 */
const methods = {}

/**
 *
 * @type {{app: boolean, crud: boolean, dateTime: boolean, helper: boolean, logging: boolean, messages: boolean, language: boolean, requests: boolean, validations: boolean}}
 */
const verbosity = {
  app: true,
  crud:false,
  dateTime:false,
  helper:false,
  language:false,
  logging:false,
  messages:false,
  requests:false,
  validations:false
}

/**
 *
 * @type {{verbosity: {app: boolean, crud: boolean, dateTime: boolean, helper: boolean, logging: boolean, messages: boolean, language: boolean, requests: boolean, validations: boolean}}}
 */
const config = {
  verbosity
}

/**
 *
 */
export default methods

/**
 *
 */
export {methods, config, verbosity}
