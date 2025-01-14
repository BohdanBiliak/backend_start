import express from 'express';
import { coursesRouter} from "./routes/courses";
import { getTestsRouter} from "./routes/tests";
import {db} from "./db/db";
export const app = express()
import bodyParser from "body-parser";
const jsonMiddleware = express.json();
const jsonBodyMiddleware = bodyParser.json()
app.use(jsonBodyMiddleware)
app.use(jsonMiddleware)

app.get('/test', (req, res) => {
    res.send('Server is running!');
});

app.use("/courses", coursesRouter)
app.use("/__tests__", getTestsRouter(db))
