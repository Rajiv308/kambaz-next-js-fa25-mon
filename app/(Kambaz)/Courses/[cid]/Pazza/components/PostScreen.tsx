/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { FaFolder, FaEdit } from "react-icons/fa";
import AnswersSection from "./AnswersSection";
import FollowupSection from "./FollowupSection";
import RichTextEditor from "./RichTextEditor";
import * as client from "../client";

interface PostScreenProps {
  post: any;
  currentUser: any;
  folders: any[];
  onDelete: (postId: string) => void;
  onUpdate: (postId: string, updates: any) => void;
  onAnswerChange?: () => void;
}

export default function PostScreen({
  post,
  currentUser,
  folders,
  onDelete,
  onUpdate,
  onAnswerChange,
}: PostScreenProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editSummary, setEditSummary] = useState(post.summary);
  const [editDetails, setEditDetails] = useState(post.details);
  const [answers, setAnswers] = useState<any[]>([]);
  const [followups, setFollowups] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const isFaculty = currentUser?.role === "FACULTY";
  const isAuthor = currentUser?._id === post.author;
  const canEdit = isFaculty || isAuthor;

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        setLoading(true);
        const [answersData, followupsData] = await Promise.all([
          client.fetchAnswersForPost(post._id),
          client.fetchFollowupsForPost(post._id),
        ]);
        setAnswers(answersData);
        setFollowups(followupsData);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPostData();
    setIsEditing(false);
    setEditSummary(post.summary);
    setEditDetails(post.details);
  }, [post._id, post.summary, post.details]);

  const handleSaveEdit = async () => {
    await onUpdate(post._id, { summary: editSummary, details: editDetails });
    setIsEditing(false);
  };

  const handleDeletePost = async () => {
    if (confirm("Are you sure you want to delete this post?")) {
      await onDelete(post._id);
    }
  };

  const refreshAnswers = async () => {
    const data = await client.fetchAnswersForPost(post._id);
    setAnswers(data);
    if (onAnswerChange) {
      onAnswerChange();
    }
  };

  const refreshFollowups = async () => {
    const data = await client.fetchFollowupsForPost(post._id);
    setFollowups(data);
  };

  const getFolderName = (folderId: string) => {
    const folder = folders.find((f) => f._id === folderId);
    return folder?.name || folderId;
  };

  const formatPostNumber = (num: number | undefined) => {
    if (!num && num !== 0) return "000";
    return num.toString().padStart(3, "0");
  };

  function formatTimeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    const diffWeeks = Math.floor(diffDays / 7);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffMins < 1) return "just now";
    if (diffMins < 60)
      return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
    if (diffHours < 24)
      return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
    if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
    if (diffWeeks < 4)
      return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
    if (diffMonths < 12)
      return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
    return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
  }

  return (
    <div className="pazza-post-screen">
      <div className="pazza-post-meta">
        <div className="pazza-post-badges">
          <span className="pazza-type-badge">
            {post.postType === "Question" ? "Question" : "Note"}
          </span>
          <span className="text-muted">
            @{formatPostNumber(post.postNumber)}
          </span>
        </div>
        <div className="d-flex align-items-center gap-3">
          <span className="pazza-views-badge">{post.views || 0} views</span>
          {canEdit && (
            <Dropdown>
              <Dropdown.Toggle
                variant="link"
                className="text-decoration-none p-0"
              >
                Actions
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setIsEditing(true)}>
                  Edit
                </Dropdown.Item>
                <Dropdown.Item
                  className="text-danger"
                  onClick={handleDeletePost}
                >
                  Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="mb-4">
          <input
            type="text"
            className="form-control mb-2 fs-4 fw-bold border-0 border-bottom rounded-0"
            value={editSummary}
            onChange={(e) => setEditSummary(e.target.value)}
            maxLength={100}
          />
          <RichTextEditor
            value={editDetails}
            onChange={setEditDetails}
            minHeight="150px"
          />
          <div className="d-flex gap-2 mt-2">
            <Button variant="primary" size="sm" onClick={handleSaveEdit}>
              Save
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ) : (
        <div className="pazza-post-content">
          <h3>{post.summary}</h3>
          <div className="pazza-post-author">
            {post.authorName}
            {post.authorRole === "FACULTY" && " (Instructor)"}
            {` • ${
              post.updatedAt !== post.createdAt ? "Updated" : "Posted"
            } ${formatTimeAgo(post.updatedAt)}`}
          </div>
          <div
            className="pazza-post-body"
            dangerouslySetInnerHTML={{ __html: post.details }}
          />
          <div className="mb-3">
            {post.folders?.map((folderId: string) => (
              <span key={folderId} className="pazza-folder-tag">
                <FaFolder size={10} style={{ color: "#f0ad4e" }} />
                {getFolderName(folderId)}
              </span>
            ))}
          </div>
          {canEdit && (
            <Button
              variant="outline-secondary"
              size="sm"
              onClick={() => setIsEditing(true)}
            >
              <FaEdit className="me-1" /> Edit
            </Button>
          )}
        </div>
      )}

      <hr />

      {post.postType === "Question" && !loading && (
        <AnswersSection
          postId={post._id}
          answers={answers}
          currentUser={currentUser}
          onRefresh={refreshAnswers}
        />
      )}

      {!loading && (
        <FollowupSection
          postId={post._id}
          followups={followups}
          currentUser={currentUser}
          onRefresh={refreshFollowups}
        />
      )}
    </div>
  );
}
