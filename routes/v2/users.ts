import express, { Request, Response, NextFunction } from 'express';
const router = express.Router();

/* GET users listing. */
router.get('/', (req: Request, res: Response, _next: NextFunction)=> {
  res.send('Users Page');
});

export default router;
