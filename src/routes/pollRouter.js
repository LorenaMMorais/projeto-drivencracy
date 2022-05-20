import express from 'express';

import {setPoll} from '../controllers/pollController.js';

const pollRouter = express.Router();

pollRouter.post('/poll', setPoll);

export default pollRouter;