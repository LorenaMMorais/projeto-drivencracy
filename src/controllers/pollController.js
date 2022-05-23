import db from '../db.js';
import Joi from 'joi';
import { ObjectId } from 'mongodb';
import dayjs from 'dayjs';
    
export async function setPoll(req, res){
    const poll = {
        title: req.body.title,
        expireAt: req.body.expireAt
    }

    if(poll.expireAt === ''){
        poll.expireAt = dayjs().add(30, 'day').format('YYYY-MM-DD HH:mm');
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

export async function countVotes(req, res){
    const id = req.params.id;

    try{
        const choice = await db.collection('choice').find({ poolId: id}).toArray();
        const vote = await db.collection('vote').find({ }).toArray();
        const counter = [];
        let p = 0;

        for(let i = 0; i < choice.length; i++){
            counter.push(0);
        }

        for(let i = 0; i < choice.length; i++){
            for( let j = 0; j < vote.length; j++){
                if(choice[i]._id == (new ObjectId(vote[j].choiceId).toString())){
                    counter[i]++;
                    p = i;
                }
            }
        }

        const poll = await db.collection('poll').findOne({ _id: new ObjectId(id) }).toArray();

        res.send({
            ...poll,
            result: {
                title: choice[p].title,
                votes: Math.max(...counter)
            }
        });
    }catch(error){
        console.log(error);
        res.sendStatus(500);
    }
}