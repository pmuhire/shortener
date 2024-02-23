import Joi from 'joi';
import { Log as PrismaLog } from '../../prisma/src/generated/prisma-client';

export interface Log extends PrismaLog {
  id: string;
  message: string;
  createdAt: Date;
}

export const logValidationSchema = Joi.object({
  message: Joi.string().max(500).required(),
  createdAt: Joi.date().iso().required(),
});
export const mapLogToCustomModel = (prismaLog: PrismaLog): Log => ({
    ...prismaLog,
  });