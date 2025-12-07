/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import PazzaNavBar from "./components/PazzaNavBar";
import FolderFilters from "./components/FolderFilters";
import ListOfPostsSidebar from "./components/ListOfPostsSidebar";
import PostScreen from "./components/PostScreen";
import ClassAtAGlance from "./components/ClassAtAGlance";
import NewPostScreen from "./components/NewPostScreen";
import * as client from "./client";
import "./pazza.css";

export default function PazzaPage() {
  const { cid } = useParams();
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const { courses } = useSelector((state: RootState) => state.coursesReducer);
  const [users, setUsers] = useState([]);
  const course = courses.find((c: any) => c._id === cid);

  const [folders, setFolders] = useState<any[]>([]);
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<any | null>(null);
  const [searchText, setSearchText] = useState("");
  const [showSidebar, setShowSidebar] = useState(true);
  const [showNewPost, setShowNewPost] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [foldersData, postsData] = await Promise.all([
        client.fetchFoldersForCourse(cid as string),
        client.fetchPostsWithAnswerFlags(cid as string),
      ]);
      setFolders(foldersData);
      setPosts(postsData);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPosts = async () => {
    try {
      const postsData = await client.fetchPostsWithAnswerFlags(
        cid as string,
        selectedFolder || undefined,
        searchText || undefined
      );
      setPosts(postsData);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [cid]);

  useEffect(() => {
    if (!loading) {
      fetchPosts();
    }
  }, [selectedFolder, searchText]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const fetchedUsers = await client.getAllUsersInCourse(cid as string);
        setUsers(fetchedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);

  const handleCreatePost = async (post: any) => {
    try {
      const newPost = await client.createPost(cid as string, post);
      const newPostWithFlags = {
        ...newPost,
        hasStudentAnswer: false,
        hasInstructorAnswer: false,
      };
      setPosts([newPostWithFlags, ...posts]);
      setSelectedPost(newPostWithFlags);
      setShowNewPost(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeletePost = async (postId: string) => {
    try {
      await client.deletePost(postId);
      setPosts(posts.filter((p) => p._id !== postId));
      if (selectedPost?._id === postId) {
        setSelectedPost(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdatePost = async (postId: string, updates: any) => {
    try {
      const updatedPost = await client.updatePost(postId, updates);
      const existingPost = posts.find((p) => p._id === postId);
      const updatedPostWithFlags = {
        ...updatedPost,
        hasStudentAnswer: existingPost?.hasStudentAnswer || false,
        hasInstructorAnswer: existingPost?.hasInstructorAnswer || false,
      };
      setPosts(posts.map((p) => (p._id === postId ? updatedPostWithFlags : p)));
      if (selectedPost?._id === postId) {
        setSelectedPost(updatedPostWithFlags);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const refreshPostAnswerFlags = async (postId: string) => {
    try {
      const answers = await client.fetchAnswersForPost(postId);
      const hasStudentAnswer = answers.some(
        (a: any) => a.answerType === "student"
      );
      const hasInstructorAnswer = answers.some(
        (a: any) => a.answerType === "instructor"
      );

      setPosts(
        posts.map((p) =>
          p._id === postId ? { ...p, hasStudentAnswer, hasInstructorAnswer } : p
        )
      );

      if (selectedPost?._id === postId) {
        setSelectedPost((prev: any) => ({
          ...prev,
          hasStudentAnswer,
          hasInstructorAnswer,
        }));
      }
    } catch (error) {
      console.error(error);
    }
  };

  const isFaculty = (currentUser as any)?.role === "FACULTY";

  if (loading) {
    return <div className="p-4">Loading Pazza...</div>;
  }

  return (
    <div className="pazza-container">
      <PazzaNavBar
        courseName={
          (course as any)?.number || (course as any)?.name || "Course"
        }
        userName={`${(currentUser as any)?.firstName || ""} ${
          (currentUser as any)?.lastName || ""
        }`}
        isFaculty={isFaculty}
      />

      <FolderFilters
        folders={folders}
        selectedFolder={selectedFolder}
        onSelectFolder={(folderId) => {
          setSelectedFolder(folderId === selectedFolder ? null : folderId);
        }}
      />

      <div className="pazza-main">
        <ListOfPostsSidebar
          posts={posts}
          selectedPost={selectedPost}
          searchText={searchText}
          showSidebar={showSidebar}
          onSearchChange={setSearchText}
          onSelectPost={(post: any) => {
            setSelectedPost(post);
            setShowNewPost(false);
          }}
          onNewPost={() => {
            setShowNewPost(true);
            setSelectedPost(null);
          }}
          onToggleSidebar={() => setShowSidebar(!showSidebar)}
        />

        <div className="pazza-content">
          {showNewPost ? (
            <NewPostScreen
              folders={folders}
              onSubmit={handleCreatePost}
              users={users}
              onCancel={() => setShowNewPost(false)}
            />
          ) : selectedPost ? (
            <PostScreen
              post={selectedPost}
              currentUser={currentUser}
              folders={folders}
              onDelete={handleDeletePost}
              onUpdate={handleUpdatePost}
              onAnswerChange={() => refreshPostAnswerFlags(selectedPost._id)}
            />
          ) : (
            <ClassAtAGlance courseId={cid as string} posts={posts} />
          )}
        </div>
      </div>
    </div>
  );
}
