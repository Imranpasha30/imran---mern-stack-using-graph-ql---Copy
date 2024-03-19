const courseTypeDef = `#graphql
type Course {
    _id:ID!
    UserId:ID
    courseCode:String!
    courseName:String!
    section:String!
    semester:String!
}
type Query{
    courses: [Course!]
    course(courseId:ID!):Course

}
type Mutation{
    createCourse(input:CreateCourseInput!):Course!
    updateCoure(input:UpdateCourseInput!):Course!
    deleteCourse(courseId:ID!):Course!
}

input CreateCourseInput{
    courseCode:String!
    courseName:String!
    section:String!
    semester:String!
}
input UpdateCourseInput{
    courseCode:String
    courseName:String
    section:String
    semester:String
}

`

export default  courseTypeDef;