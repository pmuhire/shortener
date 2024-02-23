import express, { Response, Request, NextFunction } from 'express';
import { PrismaClient } from '../prisma/src/generated/prisma-client';
import morgan from 'morgan';
import helmet from 'helmet';
import router from './routes/user.routes';
import urlRouter from './routes/url.routes';
import analRouter from './routes/analytics.routes';

export const prisma = new PrismaClient();

const app = express();
const port = 8080;

export async function main() {
    app.use(
        morgan('combined', {
            stream: {
                write: (message: string) => {
                    prisma.log.create({
                        data: {
                            message: message.trim(),
                        },
                    });
                },
            },
        })
    );
    app.use(helmet());
    app.use(express.json());
    app.use('/api/users', router);
    app.use('/api/urls', urlRouter);
    app.use("/api/analytics", analRouter)
    app.all("*", (req: Request, res: Response) => {
        res.status(404).json({ error: `Route ${req.originalUrl} not found` });
    });

    app.listen(port, () => {
        console.log(`Server is listening on port ${port}`);
    });
}
main()
    .then(async () => {
        await prisma.$connect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
});
