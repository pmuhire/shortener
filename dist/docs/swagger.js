"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_autogen_1 = __importDefault(require("swagger-autogen"));
const doc = {
    info: {
        title: 'My API',
        description: 'Description'
    },
    host: 'localhost:8080'
};
const outputFile = '../../swagger-output.json';
const routes = ['../routes/user.routes.js', '../routes/url.routes.js'];
(0, swagger_autogen_1.default)()(outputFile, routes, doc);
//# sourceMappingURL=swagger.js.map