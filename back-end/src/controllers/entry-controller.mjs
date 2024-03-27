import {customError} from '../middlewares/error-handler.mjs';
import {
  findEntryById,
  addEntry,
  deleteEntryById,
  updateEntryById,
  listAllEntriesByUserId,
} from '../models/entry-model.mjs';

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

const getEntries = async (req, res, next) => {
  // return only logged in user's own entries
  // - get user's id from token (req.user.user_id)
  const result = await listAllEntriesByUserId(req.user.user_id);
  if (!result.error) {
    res.json(result);
  } else {
    next(new Error(result.error));
  }
};

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

const getEntryById = async (req, res, next) => {
  const entry = await findEntryById(req.params.id, req.user.user_id);
  if (entry) {
    res.json(entry);
  } else {
    next(customError('Entry not found', 404));
  }
};

/**
 * @api {post} /entries Create a new entry
 * @apiName PostEntry
 * @apiGroup Entry
 *
 * @apiHeader {String} Authorization User's JWT Token.
 *
 * @apiParam {String} mood Mood of the entry.
 * @apiParam {Number} [sleep_hours] Number of hours slept.
 * @apiParam {String} [notes] Additional notes.
 *
 * @apiSuccess {String} message Success message.
 * @apiSuccess {Number} entry_id ID of the newly created entry.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 201 Created
 *     {
 *       "message": "New entry added.",
 *       "entry_id": 1
 *     }
 */

const postEntry = async (req, res, next) => {
  const userId = req.user.user_id;
  const result = await addEntry(req.body, userId);
  if (result.entry_id) {
    res.status(201);
    res.json({message: 'New entry added.', ...result});
  } else {
    next(new Error(result.error));
  }
};

/**
 * @api {put} /entries/:id Update an entry
 * @apiName PutEntry
 * @apiGroup Entry
 *
 * @apiHeader {String} Authorization User's JWT Token.
 *
 * @apiParam {Number} id Entry's unique ID.
 * @apiParam {String} [mood] Mood of the entry.
 * @apiParam {Number} [sleep_hours] Number of hours slept.
 * @apiParam {String} [notes] Additional notes.
 *
 * @apiSuccess {Number} id Entry's unique ID.
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "id": 1,
 *       "message": "Entry updated successfully."
 *     }
 */

const putEntry = async (req, res, next) => {
  const entryId = req.params.id;
  const userId = req.user.user_id;
  const result = await updateEntryById(entryId, userId, req.body);
  if (result.error) {
    return next(customError(result.message, result.error));
  }
  return res.status(201).json(result);
};

/**
 * @api {delete} /entries/:id Delete an entry
 * @apiName DeleteEntry
 * @apiGroup Entry
 *
 * @apiHeader {String} Authorization User's JWT Token.
 *
 * @apiParam {Number} id Entry's unique ID.
 *
 * @apiSuccess {String} message Success message.
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message": "Entry deleted successfully."
 *     }
 */

const deleteEntry = async (req, res, next) => {
  const result = await deleteEntryById(req.params.id, req.user.user_id);
  if (result.error) {
    return next(customError(result.message, result.error));
  }
  return res.json(result);
};

export {getEntries, getEntryById, postEntry, putEntry, deleteEntry};
