import express from 'express';
import { getCoursesRoutes} from "./routes/courses";
import { getTestsRouter} from "./routes/tests";
import {db} from "./db/db";
export const app = express()
const jsonMiddleware = express.json();
app.use(jsonMiddleware)

app.use("/courses", getCoursesRoutes(db))
app.use("/__tests__", getTestsRouter( db))
