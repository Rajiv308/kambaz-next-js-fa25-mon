/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;
const COURSES_API = `${HTTP_SERVER}/api/courses`;
const USERS_API = `${HTTP_SERVER}/api/users`;
const MODULES_API = `${HTTP_SERVER}/api/modules`;
const ASSIGNMENTS_API = `${HTTP_SERVER}/api/assignments`;
const ENROLLMENTS_API = `${HTTP_SERVER}/api/enrollments`;
export const fetchAllCourses = async () => {
  const { data } = await axios.get(COURSES_API);
  return data;
};

export const findMyCourses = async () => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/current/courses`);
  return data;
};

export const createCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}/current/courses`, course);
  return data;
};

export const deleteCourse = async (id: string) => {
  const { data } = await axiosWithCredentials.delete(`${COURSES_API}/${id}`);
  return data;
};

export const updateCourse = async (course: any) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${course._id}`, course);
  return data;
};

export const findModulesForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials
    .get(`${COURSES_API}/${courseId}/modules`);
  return response.data;
};

export const createModuleForCourse = async (courseId: string, module: any) => {
  const response = await axiosWithCredentials.post(
    `${COURSES_API}/${courseId}/modules`,
    module
  );
  return response.data;
};

export const deleteModule = async (courseId: string, moduleId: string) => {
 const response = await axiosWithCredentials.delete(`${COURSES_API}/${courseId}/modules/${moduleId}`);
 return response.data;
};

export const updateModule = async (courseId: string, module: any) => {
  const { data } = await axiosWithCredentials.put(`${COURSES_API}/${courseId}/modules/${module._id}`, module);
  return data;
};

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

export const getAssignment = async (assignmentId: string) => {
  const response = await axiosWithCredentials.get(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};

export const createAssignment = async (courseId: string, assignment: any) => {
  const response = await axiosWithCredentials.post(`${COURSES_API}/${courseId}/assignments`, assignment);
  return response.data;
};

export const updateAssignment = async (assignment: any) => {
  const response = await axiosWithCredentials.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
  return response.data;
};

export const deleteAssignment = async (assignmentId: string) => {
  await axiosWithCredentials.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
};

export const fetchUsersForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(`${COURSES_API}/${courseId}/users`);
  return data;
};

export const enrollInCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.post(`${ENROLLMENTS_API}/${userId}/${courseId}`);
  return data;
};

export const unenrollFromCourse = async (userId: string, courseId: string) => {
  const { data } = await axiosWithCredentials.delete(`${ENROLLMENTS_API}/${userId}/${courseId}`);
  return data;
};

export const fetchEnrollmentsForUser = async (userId: string) => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/${userId}/enrollments`);
  return data;
};

export const fetchUserById = async (userId: string) => {
  const { data } = await axiosWithCredentials.get(`${USERS_API}/${userId}`);
  return data;
};

export const createUser = async (user: any) => {
  const { data } = await axiosWithCredentials.post(`${USERS_API}`, user);
  return data;
};

export const updateUser = async (userId: string, updates: any) => {
  const { data } = await axiosWithCredentials.put(`${USERS_API}/${userId}`, updates);
  return data;
};

export const deleteUser = async (userId: string) => {
  await axiosWithCredentials.delete(`${USERS_API}/${userId}`);
};

export const findEnrolledUsersByPartialName = async (courseId: string, name: string) => {
  const response = await axios.get(`${COURSES_API}/${courseId}/users?name=${name}`);
  return response.data;
};
export const findEnrolledUsersByRole = async (courseId: string, role: string) => {
  const response = await
    axios.get(`${COURSES_API}/${courseId}/users?role=${role}`);
  return response.data;
};
export const unenrollUserFromAllCourses = async (userId: string) => {
  const response = await axiosWithCredentials.delete(
    `${ENROLLMENTS_API}/users/${userId}`
  );
  return response.data;
}

export const fetchCourseById = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}`);
  return data;
};
