const methods = {}

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

const config = {
  verbosity
}

export default methods

export {methods, config, verbosity}
