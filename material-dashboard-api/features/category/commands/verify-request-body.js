const Joi = require('joi');

const constants = require('../constants');
const logger = require('../../../logger');

const { NAME_MIN, NAME_MAX, DESCRIPTION_MAX } = constants;

const schema = Joi.object().keys({
  name: Joi.string()
    .min(NAME_MIN)
    .max(NAME_MAX)
    .required(),
  description: Joi.string()
    .max(DESCRIPTION_MAX)
    .required(),
});

async function validateRegisterPayload(req, res, next) {
  let payloadValidation;
  try {
    payloadValidation = await Joi.validate(req.body, schema, { abortEarly: false });
  } catch (validateRegisterError) {
    payloadValidation = validateRegisterError;
  }
  const { details } = payloadValidation;
  let errors;
  if (details) {
    errors = {};
    details.forEach(errorDetail => {
      const {
        message,
        path: [key],
        type,
      } = errorDetail;
      const errorType = type.split('.')[1];
      errors[key] = constants[`${key.toUpperCase()}_${errorType.toUpperCase()}_ERROR`] || message;
    });
  }

  if (errors) {
    return res.status(400).send({ success: false, messages: { errors }});
  }
  return next();
}

module.exports = validateRegisterPayload;
