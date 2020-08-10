const NAME_MIN = 3;
const NAME_MAX = 20;

const DESCRIPTION_MAX = 20;

// Errors constant name is created from:
// 1: uppercase input name + _ + (eg: NAME)
// 2: error type serverd by joi + _ + (eg: MIN)
// 3: ERROR
// 4: final constant name: NAME_MIN_ERROR

const NAME_MIN_ERROR = `Name length must be at least ${NAME_MIN} characters long`;
const NAME_MAX_ERROR = `Name length must be less than or equal to ${NAME_MAX} characters long`;
const DESCRIPTION_MAX_ERROR = `Name length must be less than or equal to ${DESCRIPTION_MAX} characters long`;
const CREATE_SUCCESS_MESSAGE = 'Category successfully created';
const CREATE_ERROR_MESSAGE = 'Could not save Category';
const GET_ERROR_MESSAGE = 'Could not get Category';

module.exports = {
  NAME_MIN,
  NAME_MAX,
  DESCRIPTION_MAX,
  NAME_MIN_ERROR,
  NAME_MAX_ERROR,
  DESCRIPTION_MAX_ERROR,
  CREATE_ERROR_MESSAGE,
  CREATE_SUCCESS_MESSAGE,
  GET_ERROR_MESSAGE
};
