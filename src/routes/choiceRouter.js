import express from 'express';
import { setChoice } from '../controllers/choiceController.js';


const choiceRouter = express.Router();
choiceRouter.post('/choice', setChoice);

export default choiceRouter;