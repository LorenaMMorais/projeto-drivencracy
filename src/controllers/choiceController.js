import db from "../db.js";
import { ObjectId } from "mongodb";
import dayjs from "dayjs";

export async function setChoice(req, res){
    const choice = {
        title: req.body.title,
        poolId: req.body.poolId
    }

    try{
        const searchPoll = await db.collection('poll').findOne({ _id: new ObjectId(choice.poolId)});

        if(!searchPoll){
            return res.status(404).send('Enquete não encontrada!');
        }
        
        const expiredDate = searchPoll.expiredAt;

        const isExpired = dayjs().isAfter(expiredDate, 'days');

        if(isExpired){
            return res.status(403).send('Enquete expirada!');
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

export async function setVote(req, res){
    const id = req.params.id;
    
    const vote = {
        createdAt: dayjs().format('YYYY-MM-DD HH:mm'),
        choiceId: id
    }

    try{
        const isChoice = await db.collection('choice').findOne({ _id: new ObjectId(id)});

        if(!isChoice){
            return res.status(404).send('Esta opção de voto não existe!');
        }

        const searchPoll = await db.collection('poll').findOne({ _id: new ObjectId(isChoice.poolId)});

        const expiredDate = searchPoll.expiredAt;

        const isExpired = dayjs().isAfter(expiredDate, 'days');

        if(isExpired){
            return res.status(403).send('Enquete expirada!');
        }

        await db.collection('vote').insertOne(vote);
        res.sendStatus(201);
    }catch(error){
        console.log(error);
        res.status(500).send(error.message);
    }
}