import request from "supertest";
import { HTTP_STATUSES} from "../../src/utils";
import {CreateCourseModel} from "../../src/models/CreateCourseModel";
import {UpdateCourseModel} from "../../src/models/UpdateCourseModel";
import {app} from "../../src/app";
const getRequest = () => {
    return request(app)
}

describe('/courses', () => {
    beforeAll(async () => {
        await getRequest().delete('/__tests__/data')
    })
   it('Should return 200 and empty array',async () => {
     await getRequest()
         .get('/courses')
         .expect(HTTP_STATUSES.OK_200, [])
   })
    it('Should return 4O4 for not existing course',async () => {
        await getRequest()
            .get('/courses/99')
            .expect(HTTP_STATUSES.NOT_FOUND_CONTENT_404)
    })
    it('Shouldnt create course with inc input data',async () => {
        const data: CreateCourseModel = {title:''};
        await getRequest()
            .post('/courses')
            .send(data)
            .expect(HTTP_STATUSES.BAD_REQUEST_400)
        await getRequest()
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [])
    })
    let createCourse:any = null
    it('Should create course with input data',async () => {
        const data: CreateCourseModel = {title:'new course'};
        const createResponse = await request(app)
            .post('/courses')
            .send(data)
            .expect(HTTP_STATUSES.CREATED_201)

        createCourse = createResponse.body;

        expect(createCourse).toEqual({
            id: expect.any(Number),
            title: data.title

            });

        await getRequest()
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [createCourse])
    })

    it('Shouldnt update course with inc input data',async () => {
        const data: CreateCourseModel = {title:''};
         await getRequest()
            .put('/courses/'+ createCourse.id)
            .send(data)
            .expect(HTTP_STATUSES.BAD_REQUEST_400)


        await getRequest()
            .get('/courses/' + createCourse.id)
            .expect(HTTP_STATUSES.OK_200, createCourse)
    })

    it('Shouldnt update course that not exist',async () => {
        await getRequest()
            .put('/courses/'+ -100)
            .send({
                title: 'PUT course',
            })
            .expect(HTTP_STATUSES.NOT_FOUND_CONTENT_404)
    })

    it('Should update course with  input data',async () => {
        const data: UpdateCourseModel = {title:'put course'};
        await getRequest()
            .put('/courses/'+ createCourse.id)
            .send(data)
            .expect(HTTP_STATUSES.NO_CONTENT_204)


        await getRequest()
            .get('/courses/' + createCourse.id)
            .expect(HTTP_STATUSES.OK_200,{
                ...createCourse,
                title: data.title,
            } )
    })

    it('Should delete',async () => {
        await getRequest()
            .delete('/courses/'+ createCourse.id)
            .expect(HTTP_STATUSES.NO_CONTENT_204)


        await getRequest()
            .get('/courses/' + createCourse.id)
            .expect(HTTP_STATUSES.NOT_FOUND_CONTENT_404)
        await getRequest()
            .get('/courses')
            .expect(HTTP_STATUSES.OK_200, [])
    })
 })
