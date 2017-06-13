import express from 'express';
import url from 'url';
import Webtask from 'webtask-tools';
import selfservice from './routes/selfservice';

const app = express();
app.use('/api', selfservice);

const port = process.env.PORT || 8080;

//module.exports = Webtask.fromExpress(app);
app.listen(port,()=>console.log(`running: ${port}`));
