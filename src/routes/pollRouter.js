import express from 'express';

import {poll, getPoll} from '../controllers/productsController.js';

const pollRouter = express.Router();

pollRouter.get('/poll', poll);
pollRouter.get('/poll/:id', getPoll);

export default pollRouter;