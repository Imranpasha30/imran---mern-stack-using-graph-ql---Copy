import { gql } from "@apollo/client";

export const CREATE_Course = gql`
mutation CreateCourse($input: CreateCourseInput!) {
  createCourse(input: $input) {
    _id
    courseCode
    courseName
    section
    semester
  }
}
`;

export const UPDATE_COURSE = gql`
mutation UpdateCourse($id: ID!, $input: UpdateCourseInput!) {
  updateCourse(id: $id, input: $input) {
    _id
    courseCode
    courseName
    section
    semester
  }
}
`;


export const DELETE_Course = gql`

mutation DeleteCourse($courseId: ID!) {
  deleteCourse(courseId: $courseId) {
    _id
  }
}
`;