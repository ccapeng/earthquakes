import 'log-timestamp';
import express from 'express';
import { search } from '../services/earthquake.js';

const router = express.Router();

router.get('/api/geojson', async function (req, res) {
    try {
        let results = await search();
        let list = []
        for (let result of results) {
            let obj = {
                id: result._id,
                url: result._source.detail
            }
            list.push(obj);
        }
        res.json(list)
    } catch (e) {
        console.log("error", e);
    }

});
 
export default router;