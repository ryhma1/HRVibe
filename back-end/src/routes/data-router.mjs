import express from 'express';
import {body, param} from 'express-validator';
import {
  getData,
  getDataById,
  postData,
  putData,
  deleteData,
} from '../controllers/data-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';
import {validationErrorHandler} from '../middlewares/error-handler.mjs';

const dataRouter = express.Router();

dataRouter
  .route('/')
  .get(authenticateToken, getData)
  .post(
    authenticateToken,
    body('username').optional().trim().isLength({min: 3, max: 20}).isString(),
    body('height').optional().isInt({min: 1, max: 500}),
    body('weight').optional().isInt({min: 1, max: 500}),
    body('age').optional().isInt({min: 0, max: 120}),
    body('gender').optional().isString().isLength({min: 3, max: 100}),
    validationErrorHandler,
    postData
  )
  .put(
    authenticateToken,
    body('username').optional().trim().isLength({min: 3, max: 20}).isString(),
    body('height').optional().isInt({min: 1, max: 500}),
    body('weight').optional().isInt({min: 1, max: 500}),
    body('age').optional().isInt({min: 0, max: 120}),
    body('gender').optional().isString().isLength({min: 3, max: 100}),
    validationErrorHandler,
    putData
  );

dataRouter
  .route('/:id')
  .get(
    authenticateToken,
    param('id', 'must be integer').isInt(),
    validationErrorHandler,
    getDataById
  )
  .delete(
    authenticateToken,
    param('id', 'must be integer').isInt(),
    validationErrorHandler,
    deleteData
  );

export default dataRouter;
