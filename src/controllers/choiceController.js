import db from "../db.js";
import Joi from "joi";
import { ObjectId } from "mongodb";

const choiceSchema = Joi.object({
    title: Joi.string().required().trim(),
    poolId: Joi.required()
});

export async function setChoice(req, res){
    const validation = choiceSchema.validate(req.body);

    if(validation.error){
        res.sendStatus(422);
        return
    }
    
    const choice = {
        title: req.body.title,
        poolId: req.body.poolId
    }
    console.log(choice.poolId);
    console.log(new ObjectId(choice.poolId));

    try{
        const searchPoll = await db.collection('poll').findOne({ _id: new ObjectId(choice.poolId)});

        if(!searchPoll){
            return res.status(404).send('Enquete não encontrada!');
        }

        const searchChoice = await db.collection('choice').findOne({title: choice.title});

        if(searchChoice){
            return res.status(409).send('Voto já computado!');
        }

        await db.collection('choice').insertOne(choice);
        res.status(201).send(choice);
    }catch(error){
        res.sendStatus(500).send(error.message);
    }
}