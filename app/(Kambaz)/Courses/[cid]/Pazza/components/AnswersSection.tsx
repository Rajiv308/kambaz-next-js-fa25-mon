/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button } from "react-bootstrap";
import { FaEdit, FaThumbsUp } from "react-icons/fa";
import RichTextEditor from "./RichTextEditor";
import * as client from "../client";

interface AnswersSectionProps {
  postId: string;
  answers: any[];
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

  if (diffMins < 1) return "just now";
  if (diffMins < 60) return `${diffMins} minute${diffMins > 1 ? "s" : ""} ago`;
  if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;
  if (diffDays === 1) return "1 day ago";
  return `${diffDays} days ago`;
}

export default function AnswersSection({
  postId,
  answers,
  currentUser,
  onRefresh,
}: AnswersSectionProps) {
  const [showStudentEditor, setShowStudentEditor] = useState(false);
  const [showInstructorEditor, setShowInstructorEditor] = useState(false);
  const [newAnswer, setNewAnswer] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editContent, setEditContent] = useState("");

  const isFaculty =
    currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";
  const isTA = currentUser?.role === "ASSISTANT";
  const canPostInstructorAnswer = isFaculty || isTA;

  const studentAnswer = answers.find((a) => a.answerType === "student");
  const instructorAnswer = answers.find((a) => a.answerType === "instructor");

  const handleSubmitAnswer = async (type: "student" | "instructor") => {
    if (!newAnswer.trim()) return;
    try {
      await client.createAnswer(postId, {
        content: newAnswer,
        answerType: type,
      });
      setNewAnswer("");
      setShowStudentEditor(false);
      setShowInstructorEditor(false);
      onRefresh();
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateAnswer = async (answerId: string) => {
    try {
      await client.updateAnswer(answerId, { content: editContent });
      setEditingId(null);
      onRefresh();
    } catch (error) {
      console.error(error);
    }
  };

  const canEditAnswer = (answer: any) =>
    isFaculty || isTA || currentUser?._id === answer.author;

  return (
    <div>
      <div className="pazza-answer-section student">
        <div className="pazza-answer-header student">
          <span className="pazza-answer-icon">S</span>
          <span className="pazza-answer-title">Students&apos; Answer</span>
        </div>

        {studentAnswer ? (
          <>
            <div className="pazza-answer-updated">
              Updated {formatTimeAgo(studentAnswer.updatedAt)} by{" "}
              {studentAnswer.lastEditedByName || studentAnswer.authorName}
            </div>
            {editingId === studentAnswer._id ? (
              <div className="pazza-answer-body">
                <RichTextEditor
                  value={editContent}
                  onChange={setEditContent}
                  minHeight="100px"
                />
                <div className="d-flex gap-2 mt-2">
                  <Button
                    size="sm"
                    onClick={() => handleUpdateAnswer(studentAnswer._id)}
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
              <div className="pazza-answer-body">
                <div
                  dangerouslySetInnerHTML={{ __html: studentAnswer.content }}
                />
                <div className="pazza-answer-actions">
                  {canEditAnswer(studentAnswer) && (
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      onClick={() => {
                        setEditingId(studentAnswer._id);
                        setEditContent(studentAnswer.content);
                      }}
                    >
                      <FaEdit className="me-1" /> Edit
                    </Button>
                  )}
                  <span className="pazza-answer-likes">
                    <FaThumbsUp className="me-1" /> {studentAnswer.likes || 0}
                  </span>
                </div>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="pazza-answer-placeholder-text">
              Where students collectively construct a single answer
            </div>
            {!canPostInstructorAnswer &&
              (showStudentEditor ? (
                <div className="pazza-answer-editor">
                  <RichTextEditor
                    value={newAnswer}
                    onChange={setNewAnswer}
                    minHeight="100px"
                  />
                  <div className="d-flex gap-2 mt-2">
                    <Button
                      size="sm"
                      onClick={() => handleSubmitAnswer("student")}
                    >
                      Submit
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setShowStudentEditor(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  className="pazza-answer-clickable"
                  onClick={() => setShowStudentEditor(true)}
                >
                  Click to start off the wiki answer
                </div>
              ))}
          </>
        )}
      </div>

      {(instructorAnswer || canPostInstructorAnswer) && (
        <div className="pazza-answer-section instructor">
          <div className="pazza-answer-header instructor">
            <span className="pazza-answer-icon">i</span>
            <span className="pazza-answer-title">Instructors&apos; Answer</span>
          </div>

          {instructorAnswer ? (
            <>
              <div className="pazza-answer-updated">
                Updated {formatTimeAgo(instructorAnswer.updatedAt)} by{" "}
                {instructorAnswer.lastEditedByName ||
                  instructorAnswer.authorName}
              </div>
              {editingId === instructorAnswer._id ? (
                <div className="pazza-answer-body">
                  <RichTextEditor
                    value={editContent}
                    onChange={setEditContent}
                    minHeight="100px"
                  />
                  <div className="d-flex gap-2 mt-2">
                    <Button
                      size="sm"
                      onClick={() => handleUpdateAnswer(instructorAnswer._id)}
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
                <div className="pazza-answer-body">
                  <div
                    dangerouslySetInnerHTML={{
                      __html: instructorAnswer.content,
                    }}
                  />
                  <div className="pazza-answer-actions">
                    {canEditAnswer(instructorAnswer) && (
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => {
                          setEditingId(instructorAnswer._id);
                          setEditContent(instructorAnswer.content);
                        }}
                      >
                        <FaEdit className="me-1" /> Edit
                      </Button>
                    )}
                    <span className="pazza-answer-likes">
                      <FaThumbsUp className="me-1" />{" "}
                      {instructorAnswer.likes || 0}
                    </span>
                  </div>
                </div>
              )}
            </>
          ) : canPostInstructorAnswer ? (
            <>
              <div className="pazza-answer-placeholder-text">
                Where instructors collectively construct a single answer
              </div>
              {showInstructorEditor ? (
                <div className="pazza-answer-editor">
                  <RichTextEditor
                    value={newAnswer}
                    onChange={setNewAnswer}
                    minHeight="100px"
                  />
                  <div className="d-flex gap-2 mt-2">
                    <Button
                      size="sm"
                      onClick={() => handleSubmitAnswer("instructor")}
                    >
                      Submit
                    </Button>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => setShowInstructorEditor(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div
                  className="pazza-answer-clickable"
                  onClick={() => setShowInstructorEditor(true)}
                >
                  Click to start off the wiki answer
                </div>
              )}
            </>
          ) : null}
        </div>
      )}
    </div>
  );
}
