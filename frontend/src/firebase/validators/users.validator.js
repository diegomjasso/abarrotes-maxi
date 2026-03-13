/**
 * @typedef {Object} User
 * @property {string} name
 * @property {string} lastname
 * @property {string} dateofbirth
 * @property {string} curp
 * @property {string} email
 * @property {string} username
 * @property {string} password
 * @property {boolean} isSuperAdmin
 */

export const validateUser = (user, isUpdate = false) => {
  const errors = {};

  if (!user.name || user.name.trim().length < 2) {
    errors.name = "El nombre debe tener al menos 2 caracteres";
  }

  if (!user.lastname || user.lastname.trim().length < 2) {
    errors.lastname = "El apellido debe tener al menos 2 caracteres";
  }

  if (!user.dateofbirth) {
    errors.dateofbirth = "La fecha de nacimiento es obligatoria";
  }

  if (!user.curp || !validateCurp(user.curp)) {
    errors.curp = "CURP inválida";
  }

  if (!user.email || !validateEmail(user.email)) {
    errors.email = "Email inválido";
  }

  if (!user.username || user.username.length < 4) {
    errors.username = "El username debe tener al menos 4 caracteres";
  }

  if (!isUpdate) {
    if (!user.password || user.password.length < 8) {
      errors.password =
        "La contraseña debe tener mínimo 8 caracteres";
    }
  }

  if (
    user.isSuperAdmin !== undefined &&
    typeof user.isSuperAdmin !== "boolean"
  ) {
    errors.isSuperAdmin =
      "isSuperAdmin debe ser booleano";
  }

  return errors;
};

const validateEmail = (email) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const validateCurp = (curp) =>
  /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]\d$/.test(
    curp.toUpperCase()
  );