import {CourseType, db} from "../db/db";


export const coursesRepositories = {
    findCourses(title: string | null | undefined){
        let Courses = db.courses
        if(title) {
            return  Courses.filter(c => c.title.indexOf(title) > -1)
        }else{
            return Courses
        }
    },
    getCoursebyId(id: number){
        let Courses = db.courses
        let foundCourses1 = Courses.find(a => a.id ===id)

            return foundCourses1
    },
    createCourse(title: string | null | undefined, studentsCount: number):CourseType | null   {
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
    updateCourse(id:number ,title: string, studentsCount: number) {
        let foundCourses = db.courses.find(a => a.id === id)
        if (foundCourses) {
            foundCourses.title = title;
            foundCourses.studentsCount = studentsCount;
            return foundCourses
        }

    },
    deleteCourse(id:number) {
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
