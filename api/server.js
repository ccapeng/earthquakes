import express from 'express';
import earthquakeRrouter from './routes/earthquakes.js';
import { pingElastic } from './elasticsearch/connection.js';
import { indexData } from './services/data.js';

// initialize sxpress
const app = express(); 

// init middleware
app.use(express.json({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use('/api/earthquakes', earthquakeRrouter);
 
// load data initially and contiguously
const DATA_INTERVAL = process.env.DATA_INTERVAL || 180000;
pingElastic();
indexData();
setInterval(function(){indexData()}, DATA_INTERVAL);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.group(`Server Started On ${PORT}`));