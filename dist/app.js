"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const express_1 = __importDefault(require("express"));
const courses_1 = require("./routes/courses");
const tests_1 = require("./routes/tests");
const db_1 = require("./db/db");
exports.app = (0, express_1.default)();
const body_parser_1 = __importDefault(require("body-parser"));
const jsonMiddleware = express_1.default.json();
const jsonBodyMiddleware = body_parser_1.default.json();
exports.app.use(jsonBodyMiddleware);
exports.app.use(jsonMiddleware);
exports.app.get('/test', (req, res) => {
    res.send('Server is running!');
});
exports.app.use("/courses", courses_1.coursesRouter);
exports.app.use("/__tests__", (0, tests_1.getTestsRouter)(db_1.db));
