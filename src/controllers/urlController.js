
import { nanoid } from 'nanoid';
import { addVisitCount, createShortUrl, deleteUrlQuery, getUrlyByIdQuery, openShort } from '../repositories/urlRepository.js';


export async function shortenUrl(req, res)
{
    const userId = res.locals.userId;
     const { url } = req.body;
  
  const shortUrl = nanoid(8);

  try {
    await createShortUrl(url, shortUrl, userId);
    res.status(201).send({shortUrl});
  } catch (error) {
    console.log(error);
    return res.sendStatus(500); 
  }
}
export async function getUrlById(req, res) {
    const { id } = req.params;
    
    try {
      const result = await getUrlyByIdQuery(id);
      if(result.rowCount === 0) {
        return res.status(404).send("Não encontrado"); 
      }
    
      const [url] = result.rows;
    
      delete url.visitCount;
      delete url.userId;
      delete url.createdAt;
    
      res.send(url);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500); 
    }
    
  }
  
  export async function openShortUrl(req, res) {
    const { shortUrl } = req.params;
    try {
      const result = await openShort(shortUrl)
      if (result.rowCount === 0) {
        return res.send(404).send("Não encontrado"); 
      }
      const [url] = result.rows;
      await addVisitCount(url.id);
      res.redirect(url.url);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500); 
    }
  }
  export async function deleteUrl(req, res) {
    try {
        const id = parseInt(req.params.id);

        await deleteUrlQuery(id)

        res.sendStatus(204);
    } catch (error) {
      console.log(error);
      return res.sendStatus(500); 
    }
  }