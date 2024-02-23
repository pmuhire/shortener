"use strict";
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
const express_1 = __importDefault(require("express"));
const prisma_client_1 = require("../../prisma/src/generated/prisma-client");
;
const App_1 = __importDefault(require("../App"));
jest.mock('../../prisma/src/generated/prisma-client'); // Mock the entire module
describe('User API', () => {
    let app;
    beforeAll(() => {
        const mockMorganStream = { write: jest.fn() };
        (0, App_1.default)({ prisma: new prisma_client_1.PrismaClient(), morganStream: mockMorganStream });
        app = (0, express_1.default)();
        app.use('/api/users', require('../routes/user.routes').default);
    });
    afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
        // Clean up any resources after tests
    }));
    it('should create a new user', () => __awaiter(void 0, void 0, void 0, function* () {
        // Your test logic here
    }));
    // Add more tests for other user-related functionality
});
//# sourceMappingURL=userController.test.js.map