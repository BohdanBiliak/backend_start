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
exports.db = exports.client = void 0;
exports.runDB = runDB;
const mongodb_1 = require("mongodb");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const mongoUri = process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017/?maxPoolSize=20&w=majority';
// @ts-ignore
exports.client = new mongodb_1.MongoClient(mongoUri);
function runDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield exports.client.connect();
            yield exports.client.db("products").command({ ping: 1 });
            console.log("Connected to DB");
        }
        catch (err) {
            console.error("Error connecting to DB:", err);
            process.exit(1); // Завершаем процесс, если ошибка подключения
        }
    });
}
exports.db = {
    courses: [
        { id: 1, title: 'front-end', studentsCount: 10 },
        { id: 2, title: 'back-end', studentsCount: 10 },
        { id: 3, title: 'aut-end', studentsCount: 10 },
        { id: 4, title: 'devops-end', studentsCount: 10 }
    ]
};
