import bcrypt from 'bcrypt';
import connection from '../database/db.js';



async function userExistsQuery(email) {
    return connection.query(`SELECT * FROM users WHERE email = $1 `, [email]);
   
  }

  async function signUpQuery(name, email, password) {
    
    const encryptedPassword = bcrypt.hashSync(password, 10);
    return connection.query(`
      INSERT INTO users (name, email, password) 
      VALUES ($1, $2, $3)`, 
      [name, email, encryptedPassword]);
  }

  async function checkUserId(id)
  {
    return connection.query(`SELECT * FROM users WHERE id = $1 `, [id]);
  }
   
   
export{userExistsQuery,signUpQuery,checkUserId}