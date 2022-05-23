import express from 'express';

import {setPoll, getPoll, getChoiceOptions} from '../controllers/pollController.js';

const pollRouter = express.Router();

pollRouter.post('/poll', setPoll);
pollRouter.get('poll', getPoll);
pollRouter.get('/poll/:id/choice', getChoiceOptions)

export default pollRouter;