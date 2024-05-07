import promisePool from '../utils/database.mjs';

const listAllUsers = async () => {
  try {
    const sql = 'SELECT user_id, username, user_level FROM users';
    const [rows] = await promisePool.query(sql);
    // console.log(rows);
    return rows;
  } catch (error) {
    console.error('listAllUsers', error);
    return {error: 500, message: 'db error'};
  }
};

const selectUserById = async (id) => {
  try {
    const sql = 'SELECT * FROM users WHERE user_id=?';
    const params = [id];
    const [rows] = await promisePool.query(sql, params);
    // console.log(rows);
    if (rows.length === 0) {
      return {error: 404, message: 'user not found'};
    }
    // Remove password property from result
    delete rows[0].password;
    return rows[0];
  } catch (error) {
    console.error('selectUserById', error);
    return {error: 500, message: 'db error'};
  }
};

const insertUser = async (user, next) => {
  try {
    const sql = 'INSERT INTO users (email, password) VALUES (?, ?)';
    const params = [user.email, user.password];
    const [result] = await promisePool.query(sql, params);
    // console.log(result);
    return {message: 'new user created', user_id: result.insertId};
  } catch (error) {
    console.error('insertUser', error);
    return next(new Error(error));
  }
};

const updateUserById = async (user) => {
  try {
    const sql = 'UPDATE users SET email=? password=? WHERE user_id=?';
    const params = [user.password, user.email, user.userId];
    await promisePool.query(sql, params);
    const [result] = await promisePool.query(sql, params);
    console.log(result);
    return {message: 'user data updated', user_id: user.userId};
  } catch (error) {
    console.error('updateUserById', error);
    return {error: 500, message: 'db error'};
  }
};

const deleteUserById = async (id) => {
  try {
    const sql = 'DELETE FROM users WHERE user_id=?';
    const params = [id];
    const [result] = await promisePool.query(sql, params);
    // console.log(result);
    if (result.affectedRows === 0) {
      return {error: 404, message: 'user not found'};
    }
    return {message: 'user deleted', user_id: id};
  } catch (error) {
    // note that users with other data (FK constraint) cant be deleted directly
    console.error('deleteUserById', error);
    return {error: 500, message: 'db error'};
  }
};

const selectUserByEmail = async (email) => {
  try {
    const sql = 'SELECT * FROM users WHERE email=?';
    const params = [email];
    const [rows] = await promisePool.query(sql, params);
    // console.log(rows);
    // if nothing is found with the user id, result array is empty []
    if (rows.length === 0) {
      return {error: 404, message: 'user not found'};
    }
    // Remove password property from result
    delete rows[0].password;
    return rows[0];
  } catch (error) {
    console.error('selectUserByEmail', error);
    return {error: 500, message: 'db error'};
  }
};

export {
  listAllUsers,
  selectUserById,
  insertUser,
  updateUserById,
  deleteUserById,
  selectUserByEmail,
};
