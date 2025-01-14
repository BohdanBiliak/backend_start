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
exports.coursesRouter = void 0;
const express_1 = require("express");
const utils_1 = require("../utils");
const courses_dbreposytories_1 = require("../repositories/courses.dbreposytories");
const mongodb_1 = require("mongodb");
const getCourseViewModel = (dbCourse) => {
    return {
        id: dbCourse.id,
        title: dbCourse.title,
        studentsCount: dbCourse.studentsCount
    };
};
exports.coursesRouter = (0, express_1.Router)({});
exports.coursesRouter.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    console.log("Query:", req.query);
    const foundProducts = courses_dbreposytories_1.coursesRepositories.findCourses((_a = req.query.title) === null || _a === void 0 ? void 0 : _a.toString());
    const foundProductsPromise = yield foundProducts;
    console.log("Found Products:", foundProducts);
    res.send(foundProductsPromise);
}));
exports.coursesRouter.get('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const foundCourse = yield courses_dbreposytories_1.coursesRepositories.getCoursebyId(new mongodb_1.ObjectId(req.params.id)); // Konwersja na ObjectId
        if (foundCourse) {
            res.send(foundCourse);
        }
        else {
            res.sendStatus(utils_1.HTTP_STATUSES.NOT_FOUND_CONTENT_404);
        }
    }
    catch (error) {
        res.status(utils_1.HTTP_STATUSES.BAD_REQUEST_400).send("Invalid ObjectId format");
    }
}));
exports.coursesRouter.post('/', ((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newProduct = yield courses_dbreposytories_1.coursesRepositories.createCourse(req.body.title, req.body.studentsCount);
    if (!newProduct) {
        res.sendStatus(utils_1.HTTP_STATUSES.BAD_REQUEST_400);
        return;
    }
    res.status(utils_1.HTTP_STATUSES.CREATED_201).json(getCourseViewModel(newProduct));
}))
// разрешая использование методов, таких как res.status().json(), без конфликтов с void.
);
exports.coursesRouter.delete('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const deleteFlag = yield courses_dbreposytories_1.coursesRepositories.deleteCourse(+req.params.id);
    if (deleteFlag) {
        res.sendStatus(utils_1.HTTP_STATUSES.NO_CONTENT_204);
    }
    else {
        res.sendStatus(utils_1.HTTP_STATUSES.NOT_FOUND_CONTENT_404);
    }
}));
exports.coursesRouter.put('/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const foundCourses = yield courses_dbreposytories_1.coursesRepositories.updateCourse(+req.params.id, req.body.title, req.body.studentsCount);
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
}));
