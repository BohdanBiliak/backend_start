import {client, CourseType, db} from "../db/db";
import {ObjectId} from "mongodb";
export const coursesRepositories = {
    async findCourses(title: string | null | undefined): Promise<CourseType[]> {
        if (title) {
            return client.db("youtube").collection<CourseType>("videous").find({ title: { $regex: new RegExp(title, 'i') } }).toArray();
        } else {
            return client.db("youtube").collection<CourseType>("videous").find({}).toArray();
        }
    },

    async getCoursebyId(id: ObjectId): Promise<CourseType | null> {
        let course = await client.db("youtube").collection<CourseType>("videous").findOne({ _id: new ObjectId(id.toString()) });
        if (course) {
            return course;
        } else {
            return null;
        }
    },

    async createCourse(title: string, studentsCount: number):Promise<CourseType>   {
        const createdCourse:  CourseType = {
            id: +(new Date()),
            title: title,
            studentsCount: studentsCount || 0,
        }
        const rezult = await client.db("youtube").collection<CourseType>("videous").insertOne(createdCourse)
        return createdCourse
    },
    async updateCourse(id:number ,title: string, studentsCount: number):Promise<boolean > {
      const rezult =  await client.db("youtube").collection<CourseType>("videous").updateOne({id: id}, {$set:{title: title}})
        return rezult.matchedCount === 1
    },
    async deleteCourse(id:number) :Promise<boolean | undefined> {
        const rezult = await client.db("youtube").collection<CourseType>("videous").deleteOne({id: id})
        return rezult.deletedCount === 1
    }

}
