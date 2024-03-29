import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const prisma = new PrismaClient();

class UrlController {
    async shortenUrl(req: Request, res: Response): Promise<void> {
        // console.log(req);
        const { originalUrl } = req.body;

        try {
            const existingUrl = await prisma.url.findUnique({
                where: { originalUrl },
            });

            if (existingUrl) {
                res.json({ sucess: true, info: { ...existingUrl } });
                return;
            }

            const shortCode = uuidv4().substr(0, 7);

            const createdUrl = await prisma.url.create({
                data: {
                    originalUrl,
                    shortCode: shortCode,
                    shortUrl: `${req.protocol}://${req.get('host')}/api/urls/${shortCode}`,
                },
            });
            console.log(createdUrl);
            res.json({ sucess: true, info: createdUrl });
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }

    async redirectToOriginalUrl(req: Request, res: Response): Promise<void> {
        const shortCode = req.params.shortCode;

        try {
            const url = await prisma.url.findUnique({
                where: { shortUrl: `${req.protocol}://${req.get('host')}/api/urls/${shortCode}` },
            });

            if (!url) {
                res.status(404).json({ error: 'Short URL not found' });
                return;
            }

            await prisma.url.update({
                where: { id: url.id },
                data: { clicks: { increment: 1 } },
            });
            res.redirect(url.originalUrl);
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal server error' });
        }
    }
}
const urlController = new UrlController();
export {
    urlController,
    UrlController
}