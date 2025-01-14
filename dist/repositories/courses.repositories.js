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
Object.defineProperty(exports, "__esModule", { value: true });
exports.coursesRepositories = void 0;
const db_1 = require("../db/db");
exports.coursesRepositories = {
    findCourses(title) {
        return __awaiter(this, void 0, void 0, function* () {
            let Courses = db_1.db.courses;
            if (title) {
                return Courses.filter(c => c.title.indexOf(title) > -1);
            }
            else {
                return Courses;
            }
        });
    },
    getCoursebyId(id) {
        let Courses = db_1.db.courses;
        return Courses.find(a => a.id === id);
    },
    createCourse(title, studentsCount) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    },
    updateCourse(id, title, studentsCount) {
        return __awaiter(this, void 0, void 0, function* () {
            let foundCourses = db_1.db.courses.find(a => a.id === id);
            if (foundCourses) {
                foundCourses.title = title;
                foundCourses.studentsCount = studentsCount;
                return foundCourses;
            }
        });
    },
    deleteCourse(id) {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
};
