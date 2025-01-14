import {CourseType, db} from "../db/db";
export const coursesRepositories = {
    async findCourses(title: string | null | undefined):Promise<CourseType[]> {
        let Courses = db.courses
        if(title) {
            return  Courses.filter(c => c.title.indexOf(title) > -1)
        }else{
            return Courses
        }
    },
    getCoursebyId(id: number){
        let Courses = db.courses
        return Courses.find(a => a.id === id)
    },
    async createCourse(title: string | null | undefined, studentsCount: number):Promise<CourseType| null >   {
        if(!title) {

            return null
        }
        const createdCourse:  CourseType = {
            id: +(new Date()),
            title: title,
            studentsCount: studentsCount || 0,
        }
        db.courses.push(createdCourse)
        return createdCourse
    },
    async updateCourse(id:number ,title: string, studentsCount: number):Promise<CourseType| undefined > {
        let foundCourses = db.courses.find(a => a.id === id)
        if (foundCourses) {
            foundCourses.title = title;
            foundCourses.studentsCount = studentsCount;
            return foundCourses
        }
    },
    async deleteCourse(id:number) :Promise<boolean | undefined> {
        let foundCourses = db.courses
        for (let i = 0; i < foundCourses.length; i++) {
            if (foundCourses[i].id === id) {
                foundCourses.splice(i, 1);
                return true;
            }else {
                return false;
            }
        }
    }
}
