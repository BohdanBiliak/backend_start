"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCoursesRoutes = void 0;
const express_1 = __importDefault(require("express"));
const utils_1 = require("../utils");
const courses_repositories_1 = require("../repositories/courses.repositories");
const getCourseViewModel = (dbCourse) => {
    return {
        id: dbCourse.id,
        title: dbCourse.title,
        studentsCount: dbCourse.studentsCount
    };
};
const getCoursesRoutes = (db) => {
    const coursesRouter = express_1.default.Router();
    coursesRouter.get('/', (req, res) => {
        var _a;
        const foundProducts = courses_repositories_1.coursesRepositories.findCourses((_a = req.query.title) === null || _a === void 0 ? void 0 : _a.toString());
        res.send(foundProducts);
    });
    coursesRouter.get('/:id', (req, res) => {
        const foundCourse = courses_repositories_1.coursesRepositories.getCoursebyId(+req.params.id);
        if (foundCourse) {
            res.send(foundCourse);
        }
        else {
            res.sendStatus(utils_1.HTTP_STATUSES.NOT_FOUND_CONTENT_404);
        }
    });
    coursesRouter.post('/', (req, res) => {
        const newProduct = courses_repositories_1.coursesRepositories.createCourse(req.body.title, req.body.studentsCount);
        if (!newProduct) {
            res.sendStatus(utils_1.HTTP_STATUSES.BAD_REQUEST_400);
            return;
        }
        res.status(utils_1.HTTP_STATUSES.CREATED_201).json(getCourseViewModel(newProduct));
    });
    coursesRouter.delete('/:id', (req, res) => {
        const deleteFlag = courses_repositories_1.coursesRepositories.deleteCourse(+req.params.id);
        if (deleteFlag) {
            res.sendStatus(utils_1.HTTP_STATUSES.NO_CONTENT_204);
        }
        else {
            res.sendStatus(utils_1.HTTP_STATUSES.NOT_FOUND_CONTENT_404);
        }
    });
    coursesRouter.put('/:id', (req, res) => {
        const foundCourses = courses_repositories_1.coursesRepositories.updateCourse(+req.params.id, req.body.title, req.body.studentsCount);
        if (!req.body.title) {
            res.sendStatus(utils_1.HTTP_STATUSES.BAD_REQUEST_400);
            return;
        }
        else {
            if (foundCourses) {
                res.status(utils_1.HTTP_STATUSES.NO_CONTENT_204).send(foundCourses);
            }
            else {
                res.sendStatus(utils_1.HTTP_STATUSES.NOT_FOUND_CONTENT_404);
            }
        }
    });
    return coursesRouter;
};
exports.getCoursesRoutes = getCoursesRoutes;
