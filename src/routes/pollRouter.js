import express from 'express';

import {setPoll, getPoll} from '../controllers/pollController.js';

const pollRouter = express.Router();

pollRouter.post('/poll', setPoll);
pollRouter.get('poll', getPoll);

export default pollRouter;