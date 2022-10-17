import { Router } from "express";
import { deleteUrl, getUrlById, openShortUrl, shortenUrl } from "../controllers/urlController.js";
import { checkSession } from "../middlewares/checkSession.js";
import { schemaValidator } from "../middlewares/schemaValidator.js";
import urlSchema from "../schemas/urlSchema.js";




const urlRouter = Router();

urlRouter.post('/urls/shorten', schemaValidator(urlSchema), checkSession, shortenUrl);
urlRouter.get("/urls/:id", getUrlById);
urlRouter.get('/urls/open/:shortUrl', openShortUrl);
urlRouter.delete("/urls/:id", checkSession, deleteUrl);


export default urlRouter;   