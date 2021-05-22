import 'log-timestamp';
import express from 'express';
import { search } from '../services/earthquake.js';

const router = express.Router();

router.get('/api/earthquakes', async function (req, res) {
    console.log("get", req.originalUrl);
    let place = req.query.place;
    try {
        let results = await search(place);
        console.log(typeof(results));
        res.json(results)
    } catch (e) {
        console.log("error", JSON.stringify(e, null, 4));
    }

});
 
export default router;