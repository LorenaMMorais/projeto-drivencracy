import express from 'express';
import pollRouter from './pollRouter.js';
import choiceRouter from './choiceRouter.js';

const router = express.Router();

router.use(pollRouter);
router.use(choiceRouter);

export default router;