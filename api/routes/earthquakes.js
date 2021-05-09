import 'log-timestamp';
import express from 'express';
import { client, INDEX_EQRTHQUAKES } from '../elasticsearch/connection.js';

const router = express.Router();

router.get('', async function (req, res) {
    console.log("get", req.originalUrl);
    let place = req.query.place;
    try {
        let cond = {
            index: INDEX_EQRTHQUAKES
        }
        if (typeof(place) === "string") {
            cond.body = {
                query: {
                    match : {
                        place: place
                    }
                }
            }
        }
        //console.log("cond", JSON.stringify(cond, null, 4));
        let { body } = await client.search(cond);
        res.json(body.hits.hits);
    } catch (e) {
        console.log("error", JSON.stringify(e, null, 4));
    }

});
 
export default router;