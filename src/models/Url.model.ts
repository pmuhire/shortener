import Joi from 'joi';
import { Url as PrismaUrl } from '../../prisma/src/generated/prisma-client';

export interface Url extends PrismaUrl {
  id: string;
  originalUrl: string;
  shortUrl: string;
  clicks: number;
  createdAt: Date;
  userId: string;
}

export const urlValidationSchema = Joi.object({
  originalUrl: Joi.string().uri().required(),
  shortUrl: Joi.string().required(),
  clicks: Joi.number().integer().min(0).required(),
  createdAt: Joi.date().iso().required(),
  userId: Joi.string(),
});
export const mapUrlToCustomModel = (prismaUrl: PrismaUrl): Url => ({
    ...prismaUrl,
  });