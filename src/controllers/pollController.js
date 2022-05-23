import db from '../db.js';
import Joi from 'joi';
import { ObjectId } from 'mongodb';

 
const pollSchema = Joi.object({
    title: Joi.string().required(),
    expireAt: Joi.string() 
});
    
export async function setPoll(req, res){
    console.log(req.body);

    const validation = pollSchema.validate(req.body);

    if(validation.error){
        res.status(422).send('O título deve ser preenchido!');
        return
    }

    const poll = {
        title: req.body.title,
        expireAt: req.body.expireAt
    }

    try{
        await db.collection('poll').insertOne(poll);
        res.sendStatus(201);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getPoll(req, res){
    try{
        const poll = await db.collection('poll').find().toArray();
        res.send(poll);
    }catch (error){
        console.log(error);
        res.sendStatus(500);
    }
}

export async function getChoiceOptions(req, res){
    const id = req.params.id;
    try{
        const choiceList = await db.collection('choice').find({ poolId: id }).toArray();
        if(choiceList.length === 0){
            return res.status(404).send('Enquete não encontrada!');
        }
        res.send(choiceList);
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}