import connection from '../database/db.js';

async function createShortUrl(url, shortUrl, id)
{
    return connection.query(`
    INSERT INTO urls(url, "shortUrl", "userId")
    VALUES ($1, $2, $3)
  `, [url, shortUrl, id])
}
async function addVisitCount(id) {
    return connection.query(`
      UPDATE urls
      SET "visitCount" = "visitCount" + 1
      WHERE id = $1`, [id]);
  }
  async function openShort(shortUrl) {
    return connection.query(`
      SELECT * 
      FROM urls 
      WHERE "shortUrl" = $1`, 
      [shortUrl])
  }
  async function deleteUrlQuery(id) {
    return connection.query('DELETE FROM urls WHERE id=$1', [id])
  }
  
  async function getUrlyByIdQuery(id) {
    return connection.query(`SELECT * FROM urls WHERE id=$1`, [id]);

  }
  async function urlsUser(userId)
  {
    return connection.query(`SELECT * FROM urls WHERE urls."userId" = $1`, [userId]);
  }
  async function visitCountUser(userId) {
    return connection.query(`SELECT SUM(u."visitCount") FROM urls u WHERE u."userId" = $1`, [userId]);
  }
 

  
  async function urlsRanking() {
    return connection.query(`
    SELECT users.id, users.name, COUNT(urls.id) as "linksCount", SUM(urls."visitCount") AS "visitsCount"
    FROM users
    JOIN urls
    ON users.id=urls."userId"
    GROUP BY users.id
    ORDER BY count(urls."visitCount") desc
    LIMIT 10
    `);
  }

export{createShortUrl,addVisitCount,getUrlyByIdQuery,openShort,deleteUrlQuery,urlsUser,visitCountUser, urlsRanking}