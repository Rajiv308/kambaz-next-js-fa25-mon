/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button, Dropdown, Form, Badge } from "react-bootstrap";
import {
  FaEdit,
  FaTrash,
  FaCheck,
  FaRegCommentDots,
  FaLink,
} from "react-icons/fa";
import RichTextEditor from "./RichTextEditor";
import * as client from "../client";

interface FollowupSectionProps {
  postId: string;
  followups: any[];
  currentUser: any;
  onRefresh: () => void;
}

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
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
  if (diffWeeks < 4) return `${diffWeeks} week${diffWeeks > 1 ? "s" : ""} ago`;
  if (diffMonths < 12)
    return `${diffMonths} month${diffMonths > 1 ? "s" : ""} ago`;
  return `${diffYears} year${diffYears > 1 ? "s" : ""} ago`;
}

export default function FollowupSection({
  postId,
  followups,
  currentUser,
  onRefresh,
}: FollowupSectionProps) {
  const [newFollowup, setNewFollowup] = useState("");
  const [showNewFollowupEditor, setShowNewFollowupEditor] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");

  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  const isTA = currentUser?.role === "ASSISTANT";

  const handleCreateFollowup = async () => {
    if (!newFollowup.trim()) return;
    try {
      await client.createFollowup(postId, { content: newFollowup });
      setNewFollowup("");
      setShowNewFollowupEditor(false);
      onRefresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleResolved = async (followupId: string) => {
    try {
      await client.toggleFollowupResolved(followupId);
      onRefresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateFollowup = async (followupId: string) => {
    try {
      await client.updateFollowup(followupId, { content: editContent });
      setEditingId(null);
      onRefresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteFollowup = async (followupId: string) => {
    if (!confirm("Delete this discussion?")) return;
    try {
      await client.deleteFollowup(followupId);
      onRefresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddReply = async (followupId: string) => {
    if (!replyContent.trim()) return;
    try {
      await client.addReplyToFollowup(followupId, replyContent);
      setReplyingTo(null);
      setReplyContent("");
      onRefresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteReply = async (followupId: string, replyId: string) => {
    if (!confirm("Delete this reply?")) return;
    try {
      await client.deleteReply(followupId, replyId);
      onRefresh();
    } catch (error) {
      console.error(error);
    }
  };

  const canEdit = (item: any) =>
    isFaculty || isTA || currentUser?._id === item.author;

  return (
    <div className="pazza-followup-section">
      <div className="pazza-followup-header">
        <div className="pazza-followup-title-row">
          <FaRegCommentDots className="pazza-followup-icon" />
          <span className="pazza-followup-title">
            {followups.length} Followup Discussion
            {followups.length !== 1 ? "s" : ""}
          </span>
        </div>
        <p className="pazza-followup-subtitle">
          For lingering questions and comments
        </p>
      </div>

      {followups.map((followup, index) => (
        <div key={followup._id} className="pazza-followup-card">
          <div className="pazza-followup-card-header">
            <div className="pazza-followup-status-row">
              <Button
                size="sm"
                variant={followup.resolved ? "success" : "outline-secondary"}
                className="pazza-resolved-btn"
                onClick={() => handleToggleResolved(followup._id)}
              >
                {followup.resolved ? (
                  <>
                    <FaCheck size={10} className="me-1" /> Resolved
                  </>
                ) : (
                  "Unresolved"
                )}
              </Button>
              <span className="pazza-followup-id">
                @{postId.slice(-3)}_f{index + 1}
              </span>
              <FaLink size={12} className="pazza-followup-link-icon" />
            </div>
            {canEdit(followup) && (
              <Dropdown>
                <Dropdown.Toggle
                  variant="link"
                  size="sm"
                  className="text-muted p-0"
                >
                  Actions
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      setEditingId(followup._id);
                      setEditContent(followup.content);
                    }}
                  >
                    <FaEdit className="me-2" /> Edit
                  </Dropdown.Item>
                  <Dropdown.Item
                    className="text-danger"
                    onClick={() => handleDeleteFollowup(followup._id)}
                  >
                    <FaTrash className="me-2" /> Delete
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </div>

          {editingId === followup._id ? (
            <div className="pazza-followup-edit">
              <RichTextEditor
                value={editContent}
                onChange={setEditContent}
                minHeight="100px"
              />
              <div className="d-flex gap-2 mt-2">
                <Button
                  size="sm"
                  onClick={() => handleUpdateFollowup(followup._id)}
                >
                  Save
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => setEditingId(null)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="pazza-followup-content">
              <div className="pazza-followup-author-row">
                <span className="pazza-followup-author">
                  {followup.authorName}
                </span>
                {followup.authorRole === "FACULTY" && (
                  <Badge
                    bg="warning"
                    text="dark"
                    className="pazza-instructor-badge"
                  >
                    Instructor
                  </Badge>
                )}
                {followup.authorRole === "ASSISTANT" && (
                  <Badge
                    bg="info"
                    text="white"
                    className="pazza-instructor-badge"
                  >
                    TA
                  </Badge>
                )}
                <span className="pazza-followup-time">
                  {formatTimeAgo(followup.createdAt)}
                </span>
              </div>
              <div dangerouslySetInnerHTML={{ __html: followup.content }} />
              <div className="pazza-followup-actions">
                <span className="pazza-followup-likes">👍 0</span>
              </div>
            </div>
          )}

          {followup.replies?.length > 0 && (
            <div className="pazza-replies">
              {followup.replies.map((reply: any) => (
                <div key={reply._id} className="pazza-reply">
                  <div className="pazza-reply-header">
                    <div className="pazza-reply-author-row">
                      <span className="pazza-followup-author">
                        {reply.authorName}
                      </span>
                      {reply.authorRole === "FACULTY" && (
                        <Badge
                          bg="warning"
                          text="dark"
                          className="pazza-instructor-badge"
                        >
                          Instructor
                        </Badge>
                      )}
                      {reply.authorRole === "ASSISTANT" && (
                        <Badge
                          bg="info"
                          text="white"
                          className="pazza-instructor-badge"
                        >
                          TA
                        </Badge>
                      )}
                      <span className="pazza-followup-time">
                        {formatTimeAgo(reply.createdAt)}
                      </span>
                    </div>
                    {canEdit(reply) && (
                      <Button
                        variant="link"
                        size="sm"
                        className="text-danger p-0"
                        onClick={() =>
                          handleDeleteReply(followup._id, reply._id)
                        }
                      >
                        <FaTrash size={12} />
                      </Button>
                    )}
                  </div>
                  <div dangerouslySetInnerHTML={{ __html: reply.content }} />
                </div>
              ))}
            </div>
          )}

          {replyingTo === followup._id ? (
            <div className="pazza-reply-input">
              <RichTextEditor
                value={replyContent}
                onChange={setReplyContent}
                minHeight="80px"
              />
              <div className="d-flex gap-2 mt-2">
                <Button size="sm" onClick={() => handleAddReply(followup._id)}>
                  Reply
                </Button>
                <Button
                  size="sm"
                  variant="secondary"
                  onClick={() => {
                    setReplyingTo(null);
                    setReplyContent("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            </div>
          ) : (
            <div className="pazza-reply-link">
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  setReplyingTo(followup._id);
                }}
              >
                Reply to this followup discussion
              </a>
            </div>
          )}
        </div>
      ))}

      <div className="pazza-new-followup">
        <label className="pazza-new-followup-label">
          Start a new followup discussion
        </label>
        {showNewFollowupEditor ? (
          <>
            <RichTextEditor
              value={newFollowup}
              onChange={setNewFollowup}
              minHeight="100px"
            />
            <div className="d-flex gap-2 mt-2">
              <Button
                className="pazza-post-discussion-btn"
                size="sm"
                onClick={handleCreateFollowup}
                disabled={!newFollowup.trim()}
              >
                Post Discussion
              </Button>
              <Button
                size="sm"
                variant="secondary"
                onClick={() => {
                  setShowNewFollowupEditor(false);
                  setNewFollowup("");
                }}
              >
                Cancel
              </Button>
            </div>
          </>
        ) : (
          <Form.Control
            type="text"
            placeholder="Compose a new followup discussion"
            className="pazza-new-followup-input"
            onFocus={() => setShowNewFollowupEditor(true)}
            readOnly
          />
        )}
      </div>
    </div>
  );
}
