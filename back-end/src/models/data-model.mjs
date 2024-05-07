import promisePool from '../utils/database.mjs';

const listAllDataByUserId = async (id) => {
  try {
    const sql = 'SELECT * FROM user_data WHERE user_id=?';
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    // console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const findDataById = async (id, userId) => {
  try {
    const [rows] = await promisePool.query(
      'SELECT * FROM user_data WHERE data_id = ? AND user_id = ?',
      [id, userId]
    );
    // console.log('rows', rows);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const addData = async (data, userId) => {
  console.log('User ID:', userId);
  const sql = `INSERT INTO user_data
               (user_id, username, height, weight, age, gender)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [
    userId,
    data.username,
    data.height,
    data.weight,
    data.age,
    data.gender,
  ];
  try {
    const rows = await promisePool.query(sql, params);
    return {data_id: rows[0].insertId};
  } catch (e) {
    console.error('Error adding data:', e.message);
    return {error: e.message};
  }
};

const updateDataById = async (userId, dataData) => {
  try {
    const sql = promisePool.format(
      `UPDATE user_data SET ?
       WHERE data_id=? AND user_id=?`,
      [dataData, userId]
    );
    console.log(sql);
    const [result] = await promisePool.query(sql);
    // console.log(result);
    if (result.affectedRows === 0) {
      return {error: 404, message: 'Data not found'};
    }
    return {message: 'Data updated', data_id: dataId};
  } catch (error) {
    console.error('updateDataById', error);
    return {error: 500, message: 'db error'};
  }
};

const deleteDataById = async (id, userId) => {
  try {
    const sql = 'DELETE FROM user_data WHERE data_id=? AND user_id=?';
    const params = [id, userId];
    const [result] = await promisePool.query(sql, params);
    // console.log(result);
    if (result.affectedRows === 0) {
      return {error: 404, message: 'Data not found'};
    }
    return {message: 'Information deleted', data_id: id};
  } catch (error) {
    console.error('deleteDataById', error);
    return {error: 500, message: 'db error'};
  }
};

export {
  listAllDataByUserId,
  findDataById,
  addData,
  updateDataById,
  deleteDataById,
};
