import {gql} from  '@apollo/client';
export const GET_COURSES = gql`
query GetCourses {
  courses {
    _id
    courseCode
    courseName
    section
    semester
  }
}
`;

export const GET_COURSE = gql`
query GetCourse($id : ID!){
  course(courseId: $id) {
    _id
    courseCode
    courseName
    section
    semester 
}
}
`;