import { signUpQuery, userExistsQuery } from "../repositories/userRepository.js";
import bcrypt from 'bcrypt';
import { v4 as uuid } from 'uuid';
import { newSession } from "../repositories/sessionRepository.js";
import { urlsRanking, urlsUser, visitCountUser } from "../repositories/urlRepository.js";



export async function signUp(req, res)
{
    const user = req.body;
    try {
        const userExists = await userExistsQuery(user.email)
        if (userExists.rowCount > 0) {
          return res.status(409).send("Esse usuário já existe"); 
        }
    
        const {name, email, password} = user;
        await signUpQuery(name, email, password);
    
        res.sendStatus(201); 
      }
    catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}

export async function signIn(req, res) {
  const { email, password } = req.body;
  const { rows: users } = await userExistsQuery(email)
  const [user] = users;
  if (!user) {
    return res.status(401).send("Usuário ou senha incorretos"); 
  }

  if (bcrypt.compareSync(password, user.password)) {
    const token = uuid();
    await newSession(token, user.id);
    return res.send(token);
  }
  if(!bcrypt.compareSync(password, user.password))
  {
    return res.status(401).send( "Senha incorreta"); 
  }

  res.sendStatus(401); 
}

export async function userMe(req, res) {
  const user = res.locals;

  
  try {
    const visitResult = await visitCountUser(user.userId);
    const [visitCount] = visitResult.rows;

    const urlsResult = await urlsUser(user.userId);
    const userUrls = urlsResult.rows;
     
      res.status(200).send({
        id: user.id,
        name: user.name,
        visitCount: visitCount.sum || 0,
        shortenedUrls: userUrls
      });
  } catch (error) {
      console.error(error);
  };
}

export async function getRanking(req, res) {
  try {
    const result = await urlsRanking();
    res.send(result.rows);
  } catch (error) {
    console.log(error);
    return res.sendStatus(500); 
  }
}

