// routes/url.routes.ts
import express from 'express';
import { urlController } from '../controllers/urlController';

const urlRouter = express.Router();

urlRouter.post('/shorten', urlController.shortenUrl.bind(urlController));
urlRouter.get('/:shortCode', urlController.redirectToOriginalUrl.bind(urlController));

export default urlRouter;
