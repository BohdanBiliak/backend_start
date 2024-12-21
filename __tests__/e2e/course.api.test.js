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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const utils_1 = require("../../src/utils");
const app_1 = require("../../src/app");
const getRequest = () => {
    return (0, supertest_1.default)(app_1.app);
};
describe('/courses', () => {
    beforeAll(() => __awaiter(void 0, void 0, void 0, function* () {
        yield getRequest().delete('/__tests__/data');
    }));
    it('Should return 200 and empty array', () => __awaiter(void 0, void 0, void 0, function* () {
        yield getRequest()
            .get('/courses')
            .expect(utils_1.HTTP_STATUSES.OK_200, []);
    }));
    it('Should return 4O4 for not existing course', () => __awaiter(void 0, void 0, void 0, function* () {
        yield getRequest()
            .get('/courses/99')
            .expect(utils_1.HTTP_STATUSES.NOT_FOUND_CONTENT_404);
    }));
    it('Shouldnt create course with inc input data', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { title: '' };
        yield getRequest()
            .post('/courses')
            .send(data)
            .expect(utils_1.HTTP_STATUSES.BAD_REQUEST_400);
        yield getRequest()
            .get('/courses')
            .expect(utils_1.HTTP_STATUSES.OK_200, []);
    }));
    let createCourse = null;
    it('Should create course with input data', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { title: 'new course' };
        const createResponse = yield (0, supertest_1.default)(app_1.app)
            .post('/courses')
            .send(data)
            .expect(utils_1.HTTP_STATUSES.CREATED_201);
        createCourse = createResponse.body;
        expect(createCourse).toEqual({
            id: expect.any(Number),
            title: data.title
        });
        yield getRequest()
            .get('/courses')
            .expect(utils_1.HTTP_STATUSES.OK_200, [createCourse]);
    }));
    it('Shouldnt update course with inc input data', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { title: '' };
        yield getRequest()
            .put('/courses/' + createCourse.id)
            .send(data)
            .expect(utils_1.HTTP_STATUSES.BAD_REQUEST_400);
        yield getRequest()
            .get('/courses/' + createCourse.id)
            .expect(utils_1.HTTP_STATUSES.OK_200, createCourse);
    }));
    it('Shouldnt update course that not exist', () => __awaiter(void 0, void 0, void 0, function* () {
        yield getRequest()
            .put('/courses/' + -100)
            .send({
            title: 'PUT course',
        })
            .expect(utils_1.HTTP_STATUSES.NOT_FOUND_CONTENT_404);
    }));
    it('Should update course with  input data', () => __awaiter(void 0, void 0, void 0, function* () {
        const data = { title: 'put course' };
        yield getRequest()
            .put('/courses/' + createCourse.id)
            .send(data)
            .expect(utils_1.HTTP_STATUSES.NO_CONTENT_204);
        yield getRequest()
            .get('/courses/' + createCourse.id)
            .expect(utils_1.HTTP_STATUSES.OK_200, Object.assign(Object.assign({}, createCourse), { title: data.title }));
    }));
    it('Should delete', () => __awaiter(void 0, void 0, void 0, function* () {
        yield getRequest()
            .delete('/courses/' + createCourse.id)
            .expect(utils_1.HTTP_STATUSES.NO_CONTENT_204);
        yield getRequest()
            .get('/courses/' + createCourse.id)
            .expect(utils_1.HTTP_STATUSES.NOT_FOUND_CONTENT_404);
        yield getRequest()
            .get('/courses')
            .expect(utils_1.HTTP_STATUSES.OK_200, []);
    }));
});
