import express from 'express';

import {getPoll} from '../controllers/pollController.js';

const pollRouter = express.Router();

pollRouter.post('/poll', getPoll);

export default pollRouter;