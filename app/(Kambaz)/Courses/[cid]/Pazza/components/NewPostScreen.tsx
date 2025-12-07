/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { FaFolder, FaTimes } from "react-icons/fa";
import RichTextEditor from "./RichTextEditor";

interface NewPostScreenProps {
  folders: any[];
  users: any[];
  onSubmit: (post: any) => void;
  onCancel: () => void;
}

export default function NewPostScreen({
  folders,
  users,
  onSubmit,
  onCancel,
}: NewPostScreenProps) {
  const [postType, setPostType] = useState<"Question" | "Note">("Question");
  const [postTo, setPostTo] = useState<"Entire Class" | "Individual">(
    "Entire Class"
  );
  const [selectedFolders, setSelectedFolders] = useState<string[]>([]);
  const [summary, setSummary] = useState("");
  const [details, setDetails] = useState("");
  const [selectedUsers, setSelectedUsers] = useState<any[]>([]);
  const [allInstructorsSelected, setAllInstructorsSelected] = useState(false);
  const [userSearchQuery, setUserSearchQuery] = useState("");
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const instructors = users.filter(
    (u) => u.role === "FACULTY" || u.role === "ADMIN" || u.role === "ASSISTANT"
  );

  const instructorIds = instructors.map((i) => i._id);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.firstName?.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(userSearchQuery.toLowerCase()) ||
      user.email?.toLowerCase().includes(userSearchQuery.toLowerCase());

    const notAlreadySelected = !selectedUsers.find((u) => u._id === user._id);

    const notInstructorIfAllSelected =
      !allInstructorsSelected || !instructorIds.includes(user._id);

    return matchesSearch && notAlreadySelected && notInstructorIfAllSelected;
  });

  const toggleFolder = (folderId: string) => {
    if (selectedFolders.includes(folderId)) {
      setSelectedFolders(selectedFolders.filter((f) => f !== folderId));
    } else {
      setSelectedFolders([...selectedFolders, folderId]);
    }
  };

  const addUser = (user: any) => {
    setSelectedUsers([...selectedUsers, user]);
    setUserSearchQuery("");
  };

  const removeUser = (userId: string) => {
    setSelectedUsers(selectedUsers.filter((u) => u._id !== userId));
  };

  const toggleAllInstructors = () => {
    setAllInstructorsSelected(!allInstructorsSelected);
    setUserSearchQuery("");
  };

  const removeAllInstructors = () => {
    setAllInstructorsSelected(false);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};

    if (selectedFolders.length === 0) {
      newErrors.folders = "At least one folder is required";
    }
    if (!summary.trim()) {
      newErrors.summary = "Summary is required";
    }
    if (summary.length > 100) {
      newErrors.summary = "Summary must be 100 characters or less";
    }
    if (!details.trim() || details === "<p><br></p>") {
      newErrors.details = "Details are required";
    }
    if (
      postTo === "Individual" &&
      !allInstructorsSelected &&
      selectedUsers.length === 0
    ) {
      newErrors.users =
        "At least one user must be selected for individual posts";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    let visibleToIds: string[] = [];
    if (allInstructorsSelected) {
      visibleToIds = [...instructorIds];
    }
    visibleToIds = [...visibleToIds, ...selectedUsers.map((u) => u._id)];
    visibleToIds = [...new Set(visibleToIds)];

    onSubmit({
      postType,
      postTo,
      folders: selectedFolders,
      summary: summary.trim(),
      details,
      visibleTo: postTo === "Individual" ? visibleToIds : [],
    });
  };

  return (
    <div className="pazza-new-post">
      <h5>Create a New Post</h5>

      <div className="pazza-form-group">
        <label className="pazza-form-label">Post Type*</label>
        <div className="pazza-radio-group">
          <Form.Check
            type="radio"
            id="type-question"
            label="Question"
            checked={postType === "Question"}
            onChange={() => setPostType("Question")}
          />
          <Form.Check
            type="radio"
            id="type-note"
            label="Note"
            checked={postType === "Note"}
            onChange={() => setPostType("Note")}
          />
        </div>
        <small className="text-muted">
          {postType === "Question"
            ? "If you need an answer"
            : "If you don't need an answer"}
        </small>
      </div>

      <div className="pazza-form-group">
        <label className="pazza-form-label">Post To*</label>
        <div className="pazza-radio-group">
          <Form.Check
            type="radio"
            id="post-to-class"
            label="Entire Class"
            checked={postTo === "Entire Class"}
            onChange={() => setPostTo("Entire Class")}
          />
          <Form.Check
            type="radio"
            id="post-to-individual"
            label="Individual Students/Instructors"
            checked={postTo === "Individual"}
            onChange={() => setPostTo("Individual")}
          />
        </div>
      </div>

      {postTo === "Individual" && (
        <div className="pazza-form-group">
          <div className="pazza-user-search-container">
            <div className="pazza-user-selection-box">
              <input
                type="text"
                className="pazza-user-search-input"
                placeholder="Enter one or more names..."
                value={userSearchQuery}
                onChange={(e) => {
                  setUserSearchQuery(e.target.value);
                  setShowUserDropdown(true);
                }}
                onFocus={() => setShowUserDropdown(true)}
                onBlur={() => setTimeout(() => setShowUserDropdown(false), 200)}
              />
            </div>

            {showUserDropdown && (
              <div className="pazza-user-dropdown">
                {!allInstructorsSelected && (
                  <div
                    className="pazza-user-dropdown-item pazza-all-instructors"
                    onClick={toggleAllInstructors}
                  >
                    <strong>All Instructors</strong>
                    <small className="ms-2 text-muted">
                      ({instructors.length} instructors)
                    </small>
                  </div>
                )}

                {filteredUsers.length > 0 ? (
                  filteredUsers.map((user) => (
                    <div
                      key={user._id}
                      className="pazza-user-dropdown-item"
                      onClick={() => addUser(user)}
                    >
                      <div>
                        <strong>
                          {user.firstName} {user.lastName}
                        </strong>
                        {(user.role === "FACULTY" ||
                          user.role === "ADMIN" ||
                          user.role === "ASSISTANT") && (
                          <span className="ms-2 badge bg-warning text-dark">
                            {user.role === "ASSISTANT" ? "TA" : "Instructor"}
                          </span>
                        )}
                      </div>
                      <small className="text-muted">{user.email}</small>
                    </div>
                  ))
                ) : userSearchQuery ? (
                  <div className="pazza-user-dropdown-item text-muted">
                    No users found
                  </div>
                ) : null}
              </div>
            )}
          </div>

          {(allInstructorsSelected || selectedUsers.length > 0) && (
            <div className="pazza-selected-users-list">
              {allInstructorsSelected && (
                <span className="pazza-user-bubble">
                  All Instructors
                  <FaTimes
                    className="pazza-user-bubble-remove"
                    onClick={removeAllInstructors}
                  />
                </span>
              )}
              {selectedUsers.map((user) => (
                <span key={user._id} className="pazza-user-bubble">
                  {user.firstName} {user.lastName}
                  <FaTimes
                    className="pazza-user-bubble-remove"
                    onClick={() => removeUser(user._id)}
                  />
                </span>
              ))}
            </div>
          )}

          {errors.users && (
            <Alert variant="danger" className="mt-2 py-1">
              {errors.users}
            </Alert>
          )}
          <small className="text-muted">
            Select &quot;All Instructors&quot; to include all instructors.
          </small>
        </div>
      )}

      <div className="pazza-form-group">
        <label className="pazza-form-label">Select Folder(s)*</label>
        <div className="pazza-folder-select">
          {folders.map((folder) => (
            <button
              key={folder._id}
              type="button"
              className={`pazza-folder-btn ${
                selectedFolders.includes(folder._id) ? "selected" : ""
              }`}
              onClick={() => toggleFolder(folder._id)}
            >
              <FaFolder size={12} className="pazza-folder-icon" />
              {folder.name}
            </button>
          ))}
        </div>
        {errors.folders && (
          <Alert variant="danger" className="mt-2 py-1">
            {errors.folders}
          </Alert>
        )}
      </div>

      <div className="pazza-form-group">
        <label className="pazza-form-label">Summary*</label>
        <Form.Control
          type="text"
          placeholder="Enter a one-line summary, 100 characters or less"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          maxLength={100}
          isInvalid={!!errors.summary}
        />
        <div className="pazza-char-count">{summary.length}/100 characters</div>
        {errors.summary && (
          <div className="text-danger small">{errors.summary}</div>
        )}
      </div>

      <div className="pazza-form-group">
        <label className="pazza-form-label">Details*</label>
        <RichTextEditor value={details} onChange={setDetails} />
        {errors.details && (
          <Alert variant="danger" className="mt-2 py-1">
            {errors.details}
          </Alert>
        )}
      </div>

      <div className="pazza-form-actions">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Post My {postType}
        </Button>
      </div>
    </div>
  );
}
