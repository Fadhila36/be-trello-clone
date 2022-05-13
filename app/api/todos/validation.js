const { body, param, validationResult } = require("express-validator");
const { Todo } = require("../../db/models");

module.exports = {
  validateCreate: [
    body("name").notEmpty().withMessage("Name is Required"),
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(422).json({
          message: "error",
          error: error.array(),
        });
      }
      next();
    },
  ],

  validateOne: [
    param("id")
      .notEmpty()
      .withMessage("Param id is required")
      .bail()
      .isNumeric()
      .withMessage("Id must be a integer")
      .bail()
      .custom(async (value, { req }) => {
        const checking = await Todo.findOne({ where: { id: value } });
        if (checking == null) {
          return Promise.reject();
        }
      })
      .withMessage("Param id is not found"),
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(422).json({
          message: "error",
          error: error.array(),
        });
      }
      next();
    },
  ],

  validateUpdate: [
    param("id")
      .notEmpty()
      .withMessage("Param id is required")
      .bail()
      .isNumeric()
      .withMessage("Id must be a integer")
      .bail()
      .custom(async (value, { req }) => {
        const checking = await Todo.findOne({ where: { id: value } });
        if (checking == null) {
          return Promise.reject();
        }
      })
      .withMessage("Param id is not found"),
    body("name").notEmpty().withMessage("Name is Required"),
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return res.status(422).json({
          message: "error",
          error: error.array(),
        });
      }
      next();
    },
  ],
};
