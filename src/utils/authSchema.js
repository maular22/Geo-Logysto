import Joi from "joi";

export const schemaLogin = Joi.object().keys({
  email: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case "any.required":
            err.message = "[email] is required.";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  password: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case "any.required":
            err.message = "[password] is required.";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
});

export const schemaRegister = Joi.object().keys({
  name: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case "any.required":
            err.message = "[name] is required.";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  lastname: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case "any.required":
            err.message = "[lastname] is required.";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  dni: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case "any.required":
            err.message = "[dni] is required.";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  email: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case "any.required":
            err.message = "[email] is required.";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
  password: Joi.string()
    .required()
    .error((errors) => {
      errors.forEach((err) => {
        switch (err.type) {
          case "any.required":
            err.message = "[password] is required.";
            break;
          default:
            break;
        }
      });
      return errors;
    }),
});
