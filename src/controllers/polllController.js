import db from '../db.js';
export async function poll(req, res) {
    const poll = await db.collection('poll').find({}).toArray();

    res.send(poll);
}