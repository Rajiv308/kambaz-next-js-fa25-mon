/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/(Kambaz)/store";
import * as client from "../../../Account/client";
import { FaPencil, FaCheck } from "react-icons/fa6";

import { Form, Button } from "react-bootstrap";
import { useParams } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";

function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  userName,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}) {
  if (!isOpen) return null;

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-content">
          <div className="modal-header border-0">
            <h5 className="modal-title">Delete User</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body">
            <p className="text-muted mb-0">
              Are you sure you want to delete <strong>{userName}</strong>? This
              action cannot be undone.
            </p>
          </div>
          <div className="modal-footer border-0">
            <Button variant="secondary" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="danger" onClick={onConfirm}>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function PeopleDetails({
  uid,
  onClose,
  mode: initialMode = "view",
  onUserCreated,
  onUserDeleted,
}: {
  uid?: string | null;
  onClose: () => void;
  mode?: "view" | "create" | "edit";
  onUserCreated?: (user: any) => void;
  onUserDeleted?: (user: any) => void;
}) {
  const params = useParams();
  const getCourseId = () => {
    if (!params.cid) return null;
    return Array.isArray(params.cid) ? params.cid[0] : params.cid;
  };

  // Get current user role
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const canManageUsers = ["FACULTY", "ADMIN"].includes(
    (currentUser as any)?.role
  );

  const [mode, setMode] = useState<"view" | "create" | "edit">(initialMode);
  const [user, setUser] = useState<any>({});
  const [editing, setEditing] = useState(mode === "create" || mode === "edit");

  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [section, setSection] = useState("");

  // Delete modal
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);

  const fetchUser = async () => {
    if (!uid) return;
    const fetchedUser = await client.findUserById(uid);
    setUser(fetchedUser);
  };

  const startEditing = () => {
    setFirstName(user.firstName || "");
    setLastName(user.lastName || "");
    setUsername(user.username || "");
    setPassword("");
    setEmail(user.email || "");
    setRole(user.role || "STUDENT");
    setSection(user.section || "");
    setEditing(true);
    setMode("edit");
  };

  const saveUser = async () => {
    if (mode === "create") {
      const newUser = await client.createUser({
        firstName,
        lastName,
        username,
        password,
        email,
        role,
        section,
      });
      if (onUserCreated) onUserCreated(newUser);
      onClose();
    } else {
      const updates: any = {
        ...user,
        firstName,
        lastName,
        username,
        email,
        role,
        section,
      };
      if (password) updates.password = password;
      await client.updateUser(updates);
      setUser(updates);
      setEditing(false);
      setMode("view");
    }
  };

  const deleteUser = async () => {
    if (!uid) return;
    if (onUserDeleted) onUserDeleted(user);
    else {
      await client.unenrollUserFromAllCourses(uid);
      await client.deleteUser(uid);
    }
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") saveUser();
    else if (e.key === "Escape") {
      if (mode === "create") onClose();
      else setEditing(false);
    }
  };

  useEffect(() => {
    if (mode === "view" && uid) fetchUser();
    if (mode === "create") {
      setEditing(true);
      setFirstName("New");
      setLastName("User");
      setUsername(`newuser${Date.now()}`);
      setPassword("password123");
      setEmail("");
      setRole("STUDENT");
      setSection("S101");
    }
    if (mode === "edit" && uid) fetchUser();
  }, [uid, mode]);

  useEffect(() => {
    if (mode === "edit" && user._id) startEditing();
  }, [user, mode]);

  if (mode === "view" && !uid) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1040 }}
        onClick={onClose}
      />

      {/* Drawer */}
      <div
        className="position-fixed top-0 end-0 h-100 bg-white shadow-lg"
        style={{
          width: "400px",
          zIndex: 1050,
          overflowY: "auto",
          animation: "slideIn 0.3s ease-out",
        }}
      >
        <style>{`
          @keyframes slideIn {
            from { transform: translateX(100%); }
            to { transform: translateX(0); }
          }
        `}</style>

        <div className="p-4">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">
              {mode === "create" ? "Add New User" : "User Details"}
            </h4>
            <div className="d-flex align-items-center gap-2">
              {!editing && mode === "view" && canManageUsers && (
                <FaPencil
                  onClick={startEditing}
                  className="text-secondary"
                  style={{ cursor: "pointer", fontSize: "1.1rem" }}
                />
              )}
              {editing && (
                <FaCheck
                  onClick={saveUser}
                  className="text-success"
                  style={{ cursor: "pointer", fontSize: "1.2rem" }}
                />
              )}
              <button
                type="button"
                className="btn-close"
                onClick={onClose}
                aria-label="Close"
              />
            </div>
          </div>

          {/* User Icon */}
          <div className="text-center mb-3">
            <FaUserCircle
              className="text-secondary"
              style={{ fontSize: "4rem" }}
            />
          </div>

          <hr />

          {/* View Mode */}
          {mode === "view" && !editing && (
            <>
              <div className="mb-3">
                <strong>Name</strong>
                <div
                  className="text-danger fs-5 mt-1"
                  onDoubleClick={canManageUsers ? startEditing : undefined}
                >
                  {user.firstName} {user.lastName}
                </div>
              </div>
              <div className="mb-3">
                <strong>Email</strong>
                <div className="mt-1">{user.email || "N/A"}</div>
              </div>
              <div className="mb-3">
                <strong>Role</strong>
                <div className="mt-1">{user.role || "N/A"}</div>
              </div>
              <hr />
              <div className="mb-2">
                <strong>Username:</strong>{" "}
                <span className="ms-2">{user.username}</span>
              </div>
              <div className="mb-2">
                <strong>Section:</strong>{" "}
                <span className="ms-2">{user.section || "N/A"}</span>
              </div>
              <div className="mb-3">
                <strong>Total Activity:</strong>{" "}
                <span className="ms-2">{user.totalActivity || "0"}</span>
              </div>
              <hr />
              <div className="d-flex gap-2">
                {canManageUsers ? (
                  <>
                    <Button
                      variant="secondary"
                      onClick={onClose}
                      className="flex-fill"
                    >
                      Cancel
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => {
                        setUserToDelete(user);
                        setDeleteModalOpen(true);
                      }}
                      className="flex-fill"
                    >
                      Delete
                    </Button>
                  </>
                ) : (
                  <Button
                    variant="primary"
                    onClick={onClose}
                    className="flex-fill"
                  >
                    Close
                  </Button>
                )}
              </div>
            </>
          )}

          {/* Edit / Create Mode */}
          {editing && (
            <>
              <Form.Group className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoFocus
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder={
                    mode === "view" ? "Leave blank to keep current" : ""
                  }
                  required={mode === "create"}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Role</Form.Label>
                <Form.Select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  onKeyDown={handleKeyDown}
                >
                  <option value="STUDENT">Student</option>
                  <option value="ASSISTANT">Teaching Assistant</option>
                  <option value="FACULTY">Faculty</option>
                  <option value="ADMIN">Administrator</option>
                </Form.Select>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Section</Form.Label>
                <Form.Control
                  type="text"
                  value={section}
                  onChange={(e) => setSection(e.target.value)}
                  onKeyDown={handleKeyDown}
                />
              </Form.Group>
              <hr />
              <div className="d-flex gap-2">
                <Button
                  variant="secondary"
                  onClick={() => {
                    setEditing(false);
                    setMode("view");
                  }}
                  className="flex-fill"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={saveUser}
                  className="flex-fill"
                >
                  {mode === "create" ? "Create User" : "Save Changes"}
                </Button>
              </div>
            </>
          )}

          <DeleteConfirmationModal
            isOpen={deleteModalOpen}
            onClose={() => setDeleteModalOpen(false)}
            onConfirm={deleteUser}
            userName={
              userToDelete
                ? `${userToDelete.firstName} ${userToDelete.lastName}`
                : ""
            }
          />
        </div>
      </div>
    </>
  );
}
