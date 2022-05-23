import express from 'express';
import { setChoice, setVote } from '../controllers/choiceController.js';
import { choiceValidation } from '../middlewares/choiceMiddleware.js';


const choiceRouter = express.Router();

choiceRouter.post('/choice', choiceValidation,setChoice);
choiceRouter.post('choice/:id/vote', setVote);

export default choiceRouter;