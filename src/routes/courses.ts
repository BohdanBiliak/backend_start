import {RequestWithBody, RequestWithParams, RequestWithParamsandBody, RequestWithQuery} from "../types";
import {GetCourseQueryModel} from "../models/GetCourseQueryModel";
import express, {RequestHandler, Response} from "express";
import {CourseViewModel} from "../models/CourseViewModel";
import {URIParamsCourseIdModel} from "../models/URIParamsCourseIdModel";
import {CreateCourseModel} from "../models/CreateCourseModel";
import {UpdateCourseModel} from "../models/UpdateCourseModel";
import { CourseType, DBtype} from "../db/db";
import {HTTP_STATUSES} from "../utils";
import {coursesRepositories} from "../repositories/courses.repositories";
import {body, validationResult} from "express-validator";

const getCourseViewModel = (dbCourse: CourseType): { id: number; title: string; studentsCount: number } => {
    return {
        id: dbCourse.id,
        title: dbCourse.title,
        studentsCount: dbCourse.studentsCount

    }
}

export const getCoursesRoutes  = (db: DBtype) => {
    const coursesRouter = express.Router();
    coursesRouter.get('/', (req:   RequestWithQuery <GetCourseQueryModel>,
                                   res: Response<CourseViewModel[]>) => {
        const foundProducts = coursesRepositories.findCourses(req.query.title?.toString());
        res.send(foundProducts);

    })

    coursesRouter.get('/:id', (req: RequestWithParams<URIParamsCourseIdModel>,
                                       res:Response<CourseViewModel>) => {
       const foundCourse = coursesRepositories.getCoursebyId(+req.params.id)
        if (foundCourse) {
            res.send(foundCourse)
        }else{
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_CONTENT_404)
        }
    })

    coursesRouter.post(
        '/',
        body('title').isLength({ min: 3, max: 25 }),
        body('studentsCount').optional().isInt({ min: 0 }),
        ((req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }

            const newProduct = coursesRepositories.createCourse(req.body.title, req.body.studentsCount);

            if (!newProduct) {
                res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400);
                return;
            }

            res.status(HTTP_STATUSES.CREATED_201).json(getCourseViewModel(newProduct));
        }) as RequestHandler // Приведение к типу RequestHandler
        //RequestHandler: Это встроенный тип Express, который учитывает все аспекты работы с объектами
        // req и res. Он автоматически корректно типизирует обработчик маршрута,
        // разрешая использование методов, таких как res.status().json(), без конфликтов с void.
    );

    coursesRouter.delete('/:id', (req: RequestWithParams<URIParamsCourseIdModel>,
                                          res: Response) => {
        const deleteFlag = coursesRepositories.deleteCourse(+req.params.id)
        if(deleteFlag) {
            res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
        }else{
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_CONTENT_404);
        }




    })

    coursesRouter.put('/:id', (req: RequestWithParamsandBody<URIParamsCourseIdModel,UpdateCourseModel >,
                                       res: Response) =>  {
       const foundCourses = coursesRepositories.updateCourse(+req.params.id, req.body.title, req.body.studentsCount)
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

return coursesRouter;
}