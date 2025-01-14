import {app} from "./app";
import bodyParser from "body-parser";
import {runDB} from "./db/db";
const port = 3001
const jsonBodyMiddleware = bodyParser.json()
app.use(jsonBodyMiddleware)
const startApp = async () => {
    await runDB()
    app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
})
}
startApp().catch((err) => {
    console.error("Failed to start the application:", err);
});
