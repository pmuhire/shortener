"use strict";
// import express, { Response, Request, NextFunction } from 'express';
// import { PrismaClient } from '../prisma/src/generated/prisma-client';
// import morgan from 'morgan';
// import helmet from 'helmet';
// import router from './routes/user.routes';
// import urlRouter from './routes/url.routes';
// import analRouter from './routes/analytics.routes';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.prisma = void 0;
// export const prisma = new PrismaClient();
// const app = express();
// const port = 8080;
// export async function main() {
//     app.use(
//         morgan('combined', {
//             stream: {
//                 write: (message: string) => {
//                     prisma.log.create({
//                         data: {
//                             message: message.trim(),
//                         },
//                     });
//                 },
//             },
//         })
//     );
//     app.use(helmet());
//     app.use(express.json());
//     app.use('/api/users', router);
//     app.use('/api/urls', urlRouter);
//     app.use("/api/analytics", analRouter)
//     app.all("*", (req: Request, res: Response) => {
//         res.status(404).json({ error: `Route ${req.originalUrl} not found` });
//     });
//     app.listen(port, () => {
//         console.log(`Server is listening on port ${port}`);
//     });
// }
// main()
//     .then(async () => {
//         await prisma.$connect();
//     })
//     .catch(async (e) => {
//         console.error(e);
//         await prisma.$disconnect();
//         process.exit(1);
// });
const express_1 = __importDefault(require("express"));
const prisma_client_1 = require("../prisma/src/generated/prisma-client");
const morgan_1 = __importDefault(require("morgan"));
const helmet_1 = __importDefault(require("helmet"));
const user_routes_1 = __importDefault(require("./routes/user.routes"));
const url_routes_1 = __importDefault(require("./routes/url.routes"));
const analytics_routes_1 = __importDefault(require("./routes/analytics.routes"));
exports.prisma = new prisma_client_1.PrismaClient();
function main(dependencies) {
    return __awaiter(this, void 0, void 0, function* () {
        const app = (0, express_1.default)();
        const port = 8090;
        app.use((0, morgan_1.default)('combined', { stream: dependencies.morganStream }));
        app.use((0, helmet_1.default)());
        app.use(express_1.default.json());
        app.use('/api/users', user_routes_1.default);
        app.use('/api/urls', url_routes_1.default);
        app.use('/api/analytics', analytics_routes_1.default);
        app.all('*', (req, res) => {
            res.status(404).json({ error: `Route ${req.originalUrl} not found` });
        });
        app.listen(port, () => {
            // console.log(`Server is listening on port ${port}`);
        });
    });
}
exports.main = main;
main({ prisma: exports.prisma, morganStream: { write: (message) => exports.prisma.log.create({ data: { message: message.trim() } }) } })
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.prisma.$connect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield exports.prisma.$disconnect();
    process.exit(1);
}));
exports.default = main;
//# sourceMappingURL=App.js.map