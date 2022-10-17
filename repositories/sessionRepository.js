import connection from "../database/db.js";

async function newSession(token, userId) {
    return connection.query(`
     INSERT INTO sessions (token, "userId") VALUES ($1, $2)`, [token, userId]);
  }
  async function sessionExistsQuery(token) {
    return connection.query(`SELECT *  FROM sessions WHERE token = $1`, [token]);
  }
  export {newSession,sessionExistsQuery}