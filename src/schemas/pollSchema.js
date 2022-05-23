import Joi from "joi";

const pollSchema = Joi.object({
    title: Joi.string().required(),
    expireAt: Joi.optional() 
});

export default pollSchema;