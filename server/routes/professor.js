import express from 'express';

import { dumpProfessor } from '../controllers/professor.js';

const router = express.Router();

router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
 
router.post('/dumpProfessor', dumpProfessor);
router.get('/getProjects', (req,res) => {

    const data = [
        {
            "id": 1,
            "title": "Create new homepage banner",
            "details": "Lorem ipsum",
            "complete": false
          },
          {
            "id": 2,
            "title": "Make marketing email",
            "details": "Lorem ipsum",
            "complete": false
          }
    ]

    res.json(data)

});

export default router;