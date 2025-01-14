import { RequestWithParams, RequestWithParamsandBody, RequestWithQuery} from "../types";
import {GetCourseQueryModel} from "../models/GetCourseQueryModel";
import express, {RequestHandler, Response, Router} from "express";
import {CourseViewModel} from "../models/CourseViewModel";
import {URIParamsCourseIdModel} from "../models/URIParamsCourseIdModel";
import {UpdateCourseModel} from "../models/UpdateCourseModel";
import { CourseType, DBtype} from "../db/db";
import {HTTP_STATUSES} from "../utils";
import {coursesRepositories} from "../repositories/courses.dbreposytories";
import {ObjectId} from "mongodb";
const getCourseViewModel = (dbCourse: CourseType): { id: number; title: string; studentsCount: number } => {
    return {
        id: dbCourse.id,
        title: dbCourse.title,
        studentsCount: dbCourse.studentsCount
    }
}

export const coursesRouter = Router({})
    coursesRouter.get('/',async (req:   RequestWithQuery <GetCourseQueryModel>,
                                   res: Response<CourseViewModel[]>) => {
        console.log("Query:", req.query);
        const foundProducts = coursesRepositories.findCourses(req.query.title?.toString());
        const foundProductsPromise = await foundProducts
        console.log("Found Products:", foundProducts);
        res.send(foundProductsPromise);
    })
coursesRouter.get('/:id', async (req: RequestWithParams<URIParamsCourseIdModel>, res: Response ) => {
    try {
        const foundCourse = await coursesRepositories.getCoursebyId(new ObjectId(req.params.id)); // Konwersja na ObjectId
        if (foundCourse) {
            res.send(foundCourse);
        } else {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_CONTENT_404);
        }
    } catch (error) {
        res.status(HTTP_STATUSES.BAD_REQUEST_400).send("Invalid ObjectId format");
    }
});
    coursesRouter.post(
        '/',
     (  async (req, res) => {
            const newProduct =await coursesRepositories.createCourse(req.body.title, req.body.studentsCount);
            if (!newProduct) {
                res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
                return;
            }
            res.status(HTTP_STATUSES.CREATED_201).json(getCourseViewModel(newProduct));
        }) as RequestHandler
        // разрешая использование методов, таких как res.status().json(), без конфликтов с void.
    );
    coursesRouter.delete('/:id',async (req: RequestWithParams<URIParamsCourseIdModel>,
                                          res: Response) => {
        const deleteFlag = await coursesRepositories.deleteCourse(+req.params.id)
        if(deleteFlag) {
            res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
        }else{
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_CONTENT_404);
        }
    })
    coursesRouter.put('/:id', async (req: RequestWithParamsandBody<URIParamsCourseIdModel,UpdateCourseModel >,
                                       res: Response) =>  {
       const foundCourses =await coursesRepositories.updateCourse(+req.params.id, req.body.title, req.body.studentsCount)
        if(!req.body.title) {
            res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
            return;
        }else{
            if (foundCourses) {
                res.status(HTTP_STATUSES.NO_CONTENT_204).send(foundCourses);
            } else {
                res.sendStatus(HTTP_STATUSES.NOT_FOUND_CONTENT_404);
            }
        }
    })
