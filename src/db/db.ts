import {MongoClient} from 'mongodb'
import dotenv from 'dotenv'
dotenv.config()
const mongoUri = process.env.MONGODB_URI || 'mongodb://0.0.0.0:27017/?maxPoolSize=20&w=majority'
// @ts-ignore
export const client = new MongoClient(mongoUri)
export async function runDB() {
    try {
        await client.connect();
        await client.db("products").command({ ping: 1 });
        console.log("Connected to DB");
    } catch (err) {
        console.error("Error connecting to DB:", err);
        process.exit(1); // Завершаем процесс, если ошибка подключения
    }
}

export type CourseType = {
    id: number,
    title: string,
    studentsCount: number
}
export  const db: DBtype = {
    courses: [
        {id:1, title:'front-end', studentsCount: 10},
        {id:2, title:'back-end',  studentsCount: 10},
        {id:3, title:'aut-end',  studentsCount: 10},
        {id:4, title:'devops-end',  studentsCount: 10}
    ]
}
export type DBtype = {courses: CourseType[]}

