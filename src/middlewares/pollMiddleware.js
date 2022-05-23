import pollSchema from "../schemas/pollSchema.js";

export function pollValidation(req, res, next){
    const validation = pollSchema.validate(req.body);

    if(validation.error){
        res.status(422).send('O título deve ser preenchido!');
        return
    }

    next();
}