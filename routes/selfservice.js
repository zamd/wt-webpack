import express from 'express';
import bodyParser from 'body-parser';
import getStore from './../lib/store';

const selfservice = express.Router();


async function ensureConfig(db){
  let config = await db.getAll('config').then(c=>c.shift());
  if (!config)
    config = await db.create('config',{provisioned: false});

  return config;
}

selfservice.post('/setup', (req,res)=> {
  getStore(req).then( async (db) => {
      let config = await ensureConfig(db);
      config.provisioned = true;
      config = await db.update('config', config._id, config )
      res.json(config);
  });
});


selfservice.get('/status', (req,res)=> {
  getStore(req).then( async db => {
    let config = await ensureConfig(db);
    res.json(config);
  });
});

export default selfservice;
