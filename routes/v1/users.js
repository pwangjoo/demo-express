import express from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res, next)=> {
  res.send('Users Page');
});

module.exports = router;
