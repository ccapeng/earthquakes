import 'log-timestamp';
import express from 'express';
import { search } from '../services/earthquake.js';

const router = express.Router();

/**
 * Get earthquake locations
 */
router.get('/api/earthquakes', async function (req, res) {
    let place = req.query.place;
    console.log("place:", place);
    try {
        let results = await search(place);
        res.json(results)
    } catch (e) {
        console.log("earthquake route error", JSON.stringify(e, null, 4));
    }

});
 
export default router;