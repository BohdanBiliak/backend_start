export type CourseType = {
    id: number,
    title: string,
    studentsCount: number
}
export  const db: DBtype = {
    courses: [
        {id:1, title:'front-end', studentsCount: 10},
        {id:2, title:'back-end',  studentsCount: 10},
        {id:3, title:'aut-end',  studentsCount: 10},
        {id:4, title:'devops-end',  studentsCount: 10}
    ]
}
export type DBtype = {courses: CourseType[]}