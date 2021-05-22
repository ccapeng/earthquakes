import 'log-timestamp';
import express from 'express';
import { search } from '../services/earthquake.js';

const router = express.Router();

router.get('/api/geojson', async function (req, res) {
    try {
        let results = await search();
        //console.log("results:", results);
        let list = []
        for (let result of results) {
            let obj = {
                id: result._id,
                url: result._source.detail
            }
            console.log(obj);
            list.push(obj);
        }
        console.log("list:", list);
        res.json(list)
    } catch (e) {
        //console.log("error", JSON.stringify(e, null, 4));
        console.log("error", e);
    }

});
 
export default router;