import express from 'express';
import {body, param} from 'express-validator';
import {
  getEntries,
  getEntryById,
  postEntry,
  putEntry,
  deleteEntry,
} from '../controllers/entry-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';
import {validationErrorHandler} from '../middlewares/error-handler.mjs';

const entryRouter = express.Router();

/**
 * @api {get} /entries Get all entries
 * @apiName GetEntries
 * @apiGroup Entry
 *
 * @apiHeader {String} Authorization User's JWT Token.
 *
 * @apiSuccess {Object[]} entries List of entries.
 * @apiSuccess {Number} entries.id Entry's unique ID.
 * @apiSuccess {String} entries.mood Mood of the entry.
 * @apiSuccess {Number} entries.sleep_hours Number of hours slept.
 * @apiSuccess {String} entries.notes Additional notes.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "entries": [
 *         {
 *           "id": 1,
 *           "mood": "Happy",
 *           "sleep_hours": 8,
 *           "notes": "Had a great day."
 *         }
 *       ]
 *     }
 */

entryRouter
  .route('/')
  .get(authenticateToken, getEntries)
  .post(
    authenticateToken,
    body('mood').optional().trim().isLength({min: 3, max: 20}).isString(),
    body('sleep_hours').optional().isInt({min: 0, max: 24}),
    body('notes').optional().isString().isLength({min: 3, max: 300}),
    validationErrorHandler,
    postEntry
  );

/**
 * @api {get} /entries/:id Get entry by ID
 * @apiName GetEntryById
 * @apiGroup Entry
 *
 * @apiParam {Number} id Entry's unique ID.
 *
 * @apiHeader {String} Authorization User's JWT Token.
 *
 * @apiSuccess {Number} id Entry's unique ID.
 * @apiSuccess {String} mood Mood of the entry.
 * @apiSuccess {Number} sleep_hours Number of hours slept.
 * @apiSuccess {String} notes Additional notes.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "mood": "Happy",
 *       "sleep_hours": 8,
 *       "notes": "Had a great day."
 *     }
 */

entryRouter
  .route('/:id')
  .get(
    authenticateToken,
    param('id', 'must be integer').isInt(),
    validationErrorHandler,
    getEntryById
  )
  .put(
    authenticateToken,
    param('id', 'must be integer').isInt(),
    // user_id is not allowed to be changed
    body('user_id', 'not allowed').not().exists(),
    body('mood').optional().trim().isLength({min: 3, max: 20}).isString(),
    body('sleep_hours').optional().isInt({min: 0, max: 24}),
    body('notes').optional().isString().isLength({min: 3, max: 300}),
    validationErrorHandler,
    putEntry
  )
  .delete(
    authenticateToken,
    param('id', 'must be integer').isInt(),
    validationErrorHandler,
    deleteEntry
  );

export default entryRouter;
