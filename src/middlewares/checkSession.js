import { sessionExistsQuery } from "../repositories/sessionRepository.js";
import { checkUserId } from "../repositories/userRepository.js";


export async function checkSession(req, res, next) {
    try {
        const { authorization } = req.headers;
        if (!authorization.startsWith("Bearer")) return res.sendStatus(401);
        const token = authorization?.replace("Bearer ", "");
        if (!token) {
            return res.status(401).send("Token não encontrado"); 
          }
        const { rows: sessions } = await sessionExistsQuery(token)
        const [session] = sessions 
        if (!session) return res.status(401).send("A sessão não encontrada");
        const userId = sessions[0].userId;
        const { rows: users } = await checkUserId(userId);
         const [user] = users;
        if (!user) {
      return res.status(401).send("Usuário não encontrado."); 
    }
        console.log(userId);

        res.locals.userId = parseInt(userId);

        next()

    } catch(error) {
        console.log(error);
        res.sendStatus(500);
    }
}