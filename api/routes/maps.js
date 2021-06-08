import 'log-timestamp';
import express from 'express';
import { loadMap } from '../services/map.js';

const router = express.Router();

router.get('/api/maps/:country', async function (req, res) {
    let country = req.params.country;
    try {
        let results = await loadMap({
            country
        });
        return res.json(results);
    } catch (e) {
        console.log("get error", e);
    }
});

/**
 * Get map outline by state
 */
router.get('/api/maps/:country/:state', async function (req, res) {
    let country = req.params.country;
    let state = req.params.state;
    try {
        let results = await loadMap({
            country,
            state
        });
        console.log("results:", results);
        return res.json(results);
    } catch (e) {
        console.log("error", JSON.stringify(e, null, 4));
    }
});


export default router;