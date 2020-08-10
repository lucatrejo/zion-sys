const NAME_MIN = 3;
const NAME_MAX = 20;

const DESCRIPTION_MAX = 55;

// Errors constant name is created from:
// 1: uppercase input name + _ + (eg: NAME)
// 2: error type serverd by joi + _ + (eg: MIN)
// 3: ERROR
// 4: final constant name: NAME_MIN_ERROR

const NAME_MIN_ERROR = `El nombre debe tener al menos ${NAME_MIN} caracteres`;
const NAME_MAX_ERROR = `El nombre debe tener un máximo de ${NAME_MAX} caracteres`;
const DESCRIPTION_MAX_ERROR = `La descripción debe tener un máximo de ${DESCRIPTION_MAX} caracteres`;

module.exports = {
  NAME_MIN,
  NAME_MAX,
  DESCRIPTION_MAX,
  NAME_MIN_ERROR,
  NAME_MAX_ERROR,
  DESCRIPTION_MAX_ERROR,
};
