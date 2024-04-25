import promisePool from '../utils/database.mjs';

const listAllData = async () => {
  try {
    const [rows] = await promisePool.query('SELECT * FROM user_data');
    // console.log('rows', rows);
    return rows;
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

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
      'SELECT * FROM DiaryEntries WHERE entry_id = ? AND user_id = ?',
      [id, userId]
    );
    // console.log('rows', rows);
    return rows[0];
  } catch (e) {
    console.error('error', e.message);
    return {error: e.message};
  }
};

const addData = async (data, dataId) => {
  const sql = `INSERT INTO user_data
               (data_id, username, height, weight, age, gender)
               VALUES (?, ?, ?, ?, ?, ?)`;
  const params = [
    dataId,
    data.username,
    data.height,
    data.weight,
    data.age,
    data.gender,
  ];
  try {
    const rows = await promisePool.query(sql, params);
    return {data_id: rows.insertId};
  } catch (e) {
    console.error('Error adding data:', e.message);
    return {error: e.message};
  }
};

const updateDataById = async (dataId, userId, dataData) => {
  try {
    const params = [dataData, dataId, userId];
    // format() function is used to include only the fields that exists
    // in the entryData object to the SQL query
    const sql = promisePool.format(
      `UPDATE user_data SET ?
       WHERE data_id=? AND user_id=?`,
      params
    );
    const [result] = await promisePool.query(sql, params);
    // console.log(result);
    if (result.affectedRows === 0) {
      return {error: 404, message: 'Entry not found'};
    }
    return {message: 'Entry data updated', data_id: dataId};
  } catch (error) {
    // fix error handling
    // now duplicate entry error is generic 500 error, should be fixed to 400 ?
    console.error('updateEntryById', error);
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
    return {message: 'Information deleted', entry_id: id};
  } catch (error) {
    console.error('deleteDataById', error);
    return {error: 500, message: 'db error'};
  }
};

export {
  listAllData,
  listAllDataByUserId,
  findDataById,
  addData,
  updateDataById,
  deleteDataById,
};
