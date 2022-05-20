import db from '../db.js';
import joi from 'joi';
 
const pollSchema = joi.object({
    title: joi.string().required(),
    expireAt: joi.string() 
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
