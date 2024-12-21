"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursesRepositories = void 0;
const db_1 = require("../db/db");
exports.coursesRepositories = {
    findCourses(title) {
        let Courses = db_1.db.courses;
        if (title) {
            return Courses.filter(c => c.title.indexOf(title) > -1);
        }
        else {
            return Courses;
        }
    },
    getCoursebyId(id) {
        let Courses = db_1.db.courses;
        let foundCourses1 = Courses.find(a => a.id === id);
        return foundCourses1;
    },
    createCourse(title, studentsCount) {
        if (!title) {
            return null;
        }
        const createdCourse = {
            id: +(new Date()),
            title: title,
            studentsCount: studentsCount || 0,
        };
        db_1.db.courses.push(createdCourse);
        return createdCourse;
    },
    updateCourse(id, title, studentsCount) {
        let foundCourses = db_1.db.courses.find(a => a.id === id);
        if (foundCourses) {
            foundCourses.title = title;
            foundCourses.studentsCount = studentsCount;
            return foundCourses;
        }
    },
    deleteCourse(id) {
        let foundCourses = db_1.db.courses;
        for (let i = 0; i < foundCourses.length; i++) {
            if (foundCourses[i].id === id) {
                foundCourses.splice(i, 1);
                return true;
            }
            else {
                return false;
            }
        }
    }
};
