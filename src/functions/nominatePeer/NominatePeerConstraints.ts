import Joi from 'joi';

export const nominatePeerConstraints = Joi.object({
  email: Joi.string().email().required(),
  description: Joi.string().required(),
  communityInvolvementScore: Joi.number().min(0).max(10).required(),
  overallScore: Joi.number().min(0).max(10).required(),
});
