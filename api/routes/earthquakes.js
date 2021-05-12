import 'log-timestamp';
import express from 'express';
import { search } from '../services/data.js';

const router = express.Router();

router.get('/api/earthquakes', async function (req, res) {
    console.log("get", req.originalUrl);
    let place = req.query.place;
    try {
        let results = await search(place);
        res.json(results)
    } catch (e) {
        console.log("error", JSON.stringify(e, null, 4));
    }

});
 
export default router;