import {RequestWithBody, RequestWithParams, RequestWithParamsandBody, RequestWithQuery} from "../types";
import {GetCourseQueryModel} from "../models/GetCourseQueryModel";
import express, { Response} from "express";
import {CourseViewModel} from "../models/CourseViewModel";
import {URIParamsCourseIdModel} from "../models/URIParamsCourseIdModel";
import {CreateCourseModel} from "../models/CreateCourseModel";
import {UpdateCourseModel} from "../models/UpdateCourseModel";
import { CourseType, DBtype} from "../db/db";
import {HTTP_STATUSES} from "../utils";
const getCourseViewModel = (dbCourse: CourseType): CourseViewModel =>{
    return{
        id: dbCourse.id,
        title: dbCourse.title

    }
}

export const getCoursesRoutes  = (db: DBtype) => {
    const coursesRouter = express.Router();
    coursesRouter.get('/', (req:   RequestWithQuery <GetCourseQueryModel>,
                                   res: Response<CourseViewModel[]>) => {
        let Courses = db.courses
        if(req.query.title) {
            Courses = Courses.filter(c => c.title.indexOf(req.query.title as string) > -1)
        }
        res.json(Courses.map( getCourseViewModel));
    })

    coursesRouter.get('/:id', (req: RequestWithParams<URIParamsCourseIdModel>,
                                       res:Response<CourseViewModel>) => {
        let foundCourses = db.courses
        let foundCourses1 = foundCourses.find(a => a.id === +req.params.id)
        if (!foundCourses1) {
            res.sendStatus(HTTP_STATUSES.NOT_FOUND_CONTENT_404);
            return;
        }else{
            res.json(getCourseViewModel(foundCourses1))
        }

    })

    coursesRouter.post('/', (req: RequestWithBody<CreateCourseModel>,
                                    res: Response<CourseViewModel>) => {
        if(!req.body.title) {
            res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
            return;
        }
        const createdCourse:  CourseType = {
            id: +(new Date()),
            title: req.body.title,
            studentsCount: 0,

        }
        db.courses.push(createdCourse)

        res.status(HTTP_STATUSES.CREATED_201)
            .json( getCourseViewModel(createdCourse))

    })

    coursesRouter.delete('/:id', (req: RequestWithParams<URIParamsCourseIdModel>,
                                          res: Response) => {
        let foundCourses = db.courses
        for (let i = 0; i < foundCourses.length; i++) {
            if (foundCourses[i].id === +req.params.id) {
                foundCourses.splice(i, 1);
                res.sendStatus(HTTP_STATUSES.NO_CONTENT_204);
                return;
            }
        }

        res.sendStatus(HTTP_STATUSES.NOT_FOUND_CONTENT_404);

    })

    coursesRouter.put('/:id', (req: RequestWithParamsandBody<URIParamsCourseIdModel,UpdateCourseModel >,
                                       res: Response) =>  {
        let foundCourses = db.courses.find(a => a.id === +req.params.id)
        if(!req.body.title) {
            res.sendStatus(HTTP_STATUSES.BAD_REQUEST_400)
            return;
        }else{
            if (foundCourses) {
                foundCourses.title = req.body.title;
                res.status(HTTP_STATUSES.NO_CONTENT_204).send(foundCourses);
            } else {
                res.sendStatus(HTTP_STATUSES.NOT_FOUND_CONTENT_404);
            }
        }

    })

return coursesRouter;
}