import {customError} from '../middlewares/error-handler.mjs';
import {
  findDataById,
  addData,
  deleteDataById,
  updateDataById,
  listAllDataByUserId,
} from '../models/data-model.mjs';

const getData = async (req, res, next) => {
  // return only logged in user's own data
  // - get user's id from token (req.user.user_id)
  const result = await listAllDataByUserId(req.user.userId);
  if (!result.error) {
    res.json(result);
  } else {
    next(new Error(result.error));
  }
};

const getDataById = async (req, res, next) => {
  const data = await findDataById(req.params.id, req.user.userId);
  if (data) {
    res.json(data);
  } else {
    next(customError('Data not found', 404));
  }
};

const postData = async (req, res, next) => {
  const userId = req.user.userId;
  console.log('postData', req.user.userId);
  const result = await addData(req.body, userId);
  if (result.data_id) {
    res.status(201);
    res.json({message: 'Data added.', ...result});
  } else {
    next(new Error(result.error));
  }
};


const putData = async (req, res, next) => {
  const dataId = req.params.id;
  const userId = req.user.userId;
  const result = await updateDataById(dataId, userId, req.body);
  // console.log(req.user.userId);
  if (result.error) {
    return next(customError(result.message, result.error));
  }
  return res.status(201).json(result);
};

const deleteData = async (req, res, next) => {
  const result = await deleteDataById(req.params.id, req.user.userId);
  if (result.error) {
    return next(customError(result.message, result.error));
  }
  return res.json(result);
};

export {getData, getDataById, postData, putData, deleteData};
