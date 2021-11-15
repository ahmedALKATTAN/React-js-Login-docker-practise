const Joi = require("joi");

exports.userRegVadilation = function userVadilation(user) {
  const Schema = Joi.object().keys({
    // id: Joi.number().integer().required(),
    fullName: Joi.string()
      .required()
      .messages({ "string.empty": " you must Enter the full name" }),

    username: Joi.string()
      .required()
      .messages({ "string.empty": " you muat Enter the user name" }),
    email: Joi.string()
      .required()
      .messages({ "string.empty": " you must Enter the email" }),
    password: Joi.string()
      .required()
      .messages({ "string.  empty": " you must Enter the password" }),
  });

  return Schema.validate(user);
};
//userRegVadilation = userVadilation;
