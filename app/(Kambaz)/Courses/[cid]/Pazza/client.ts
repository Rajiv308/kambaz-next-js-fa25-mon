/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from "axios";

const axiosWithCredentials = axios.create({ withCredentials: true });
const HTTP_SERVER = process.env.NEXT_PUBLIC_HTTP_SERVER;

// Base URL constants
const API_BASE = `${HTTP_SERVER}/api`;
const COURSES_BASE = `${API_BASE}/courses`;
const PAZZA_BASE = `${API_BASE}/pazza`;

export const fetchFoldersForCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_BASE}/${courseId}/pazza/folders`
  );
  return data;
};

export const createFolder = async (courseId: string, folder: any) => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_BASE}/${courseId}/pazza/folders`,
    folder
  );
  return data;
};

export const updateFolder = async (folderId: string, updates: any) => {
  const { data } = await axiosWithCredentials.put(
    `${PAZZA_BASE}/folders/${folderId}`,
    updates
  );
  return data;
};

export const deleteFolder = async (folderId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${PAZZA_BASE}/folders/${folderId}`
  );
  return data;
};

export const deleteFolders = async (folderIds: string[]) => {
  const { data } = await axiosWithCredentials.post(
    `${PAZZA_BASE}/folders/delete-multiple`,
    { folderIds }
  );
  return data;
};

export const fetchPostsForCourse = async (
  courseId: string,
  folder?: string,
  search?: string
) => {
  const params = new URLSearchParams();
  if (folder) params.append("folder", folder);
  if (search) params.append("search", search);
  
  const { data } = await axiosWithCredentials.get(
    `${COURSES_BASE}/${courseId}/pazza/posts?${params.toString()}`
  );
  return data;
};

export const fetchPostsWithAnswerFlags = async (
  courseId: string,
  folder?: string,
  search?: string
) => {
  const posts = await fetchPostsForCourse(courseId, folder, search);
  
  const postsWithFlags = await Promise.all(
    posts.map(async (post: any) => {
      try {
        const answers = await fetchAnswersForPost(post._id);
        const hasStudentAnswer = answers.some((a: any) => a.answerType === "student");
        const hasInstructorAnswer = answers.some((a: any) => a.answerType === "instructor");
                
        console.log(`Post "${post.summary}": S=${hasStudentAnswer}, I=${hasInstructorAnswer}`);
        
        return {
          ...post,
          hasStudentAnswer,
          hasInstructorAnswer,
        };
      } catch (error) {
        console.error(`Error fetching answers for post ${post._id}:`, error);
        return {
          ...post,
          hasStudentAnswer: false,
          hasInstructorAnswer: false,
        };
      }
    })
  );
  
  return postsWithFlags;
};

export const fetchPostById = async (postId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${PAZZA_BASE}/posts/${postId}`
  );
  return data;
};

export const createPost = async (courseId: string, post: any) => {
  const { data } = await axiosWithCredentials.post(
    `${COURSES_BASE}/${courseId}/pazza/posts`,
    post
  );
  return data;
};

export const updatePost = async (postId: string, updates: any) => {
  const { data } = await axiosWithCredentials.put(
    `${PAZZA_BASE}/posts/${postId}`,
    updates
  );
  return data;
};

export const deletePost = async (postId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${PAZZA_BASE}/posts/${postId}`
  );
  return data;
};

export const fetchStatistics = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_BASE}/${courseId}/pazza/statistics`
  );
  return data;
};

export const fetchAnswersForPost = async (postId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${PAZZA_BASE}/posts/${postId}/answers`
  );
  return data;
};

export const fetchStudentAnswers = async (postId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${PAZZA_BASE}/posts/${postId}/answers/students`
  );
  return data;
};

export const fetchInstructorAnswers = async (postId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${PAZZA_BASE}/posts/${postId}/answers/instructors`
  );
  return data;
};

export const createAnswer = async (postId: string, answer: any) => {
  const { data } = await axiosWithCredentials.post(
    `${PAZZA_BASE}/posts/${postId}/answers`,
    answer
  );
  return data;
};

export const updateAnswer = async (answerId: string, updates: any) => {
  const { data } = await axiosWithCredentials.put(
    `${PAZZA_BASE}/answers/${answerId}`,
    updates
  );
  return data;
};

export const deleteAnswer = async (answerId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${PAZZA_BASE}/answers/${answerId}`
  );
  return data;
};

export const fetchFollowupsForPost = async (postId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${PAZZA_BASE}/posts/${postId}/followups`
  );
  return data;
};

export const createFollowup = async (postId: string, followup: any) => {
  const { data } = await axiosWithCredentials.post(
    `${PAZZA_BASE}/posts/${postId}/followups`,
    followup
  );
  return data;
};

export const updateFollowup = async (followupId: string, updates: any) => {
  const { data } = await axiosWithCredentials.put(
    `${PAZZA_BASE}/followups/${followupId}`,
    updates
  );
  return data;
};

export const toggleFollowupResolved = async (followupId: string) => {
  const { data } = await axiosWithCredentials.put(
    `${PAZZA_BASE}/followups/${followupId}/toggle-resolved`
  );
  return data;
};

export const deleteFollowup = async (followupId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${PAZZA_BASE}/followups/${followupId}`
  );
  return data;
};

export const addReplyToFollowup = async (followupId: string, content: string) => {
  const { data } = await axiosWithCredentials.post(
    `${PAZZA_BASE}/followups/${followupId}/replies`,
    { content }
  );
  return data;
};

export const updateReply = async (
  followupId: string,
  replyId: string,
  content: string
) => {
  const { data } = await axiosWithCredentials.put(
    `${PAZZA_BASE}/followups/${followupId}/replies/${replyId}`,
    { content }
  );
  return data;
};

export const deleteReply = async (followupId: string, replyId: string) => {
  const { data } = await axiosWithCredentials.delete(
    `${PAZZA_BASE}/followups/${followupId}/replies/${replyId}`
  );
  return data;
};

export const getAllUsersInCourse = async (courseId: string) => {
  const { data } = await axiosWithCredentials.get(
    `${COURSES_BASE}/${courseId}/users`
  );
  return data;
};