/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import * as client from "../../../Account/client";
import { FaPencil } from "react-icons/fa6";
import { FaCheck, FaUserCircle } from "react-icons/fa";
import { Form, Button } from "react-bootstrap";

export default function PeopleDetails({
  uid,
  onClose,
  mode = "view",
  onUserCreated,
}: {
  uid?: string | null;
  onClose: () => void;
  mode?: "view" | "create";
  onUserCreated?: (user: any) => void;
}) {
  const [user, setUser] = useState<any>({});
  const [editing, setEditing] = useState(mode === "create");

  // Form fields
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("STUDENT");
  const [section, setSection] = useState("");

  const fetchUser = async () => {
    if (!uid) return;
    const fetchedUser = await client.findUserById(uid);
    setUser(fetchedUser);
  };

  const deleteUser = async () => {
    if (!uid) return;
    await client.deleteUser(uid);
    onClose();
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
      if (onUserCreated) {
        onUserCreated(newUser);
      }
      onClose();
    } else {
      const updates: any = {
        ...user,
        firstName,
        lastName,
        email,
        role,
        section,
      };
      if (password) {
        updates.password = password;
      }
      await client.updateUser(updates);
      setUser(updates);
      setEditing(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      saveUser();
    } else if (e.key === "Escape") {
      if (mode === "create") {
        onClose();
      } else {
        setEditing(false);
      }
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    if (uid && mode === "view") fetchUser();
  }, [uid, mode]);

  // Initialize form for create mode
  useEffect(() => {
    if (mode === "create") {
      setFirstName("New");
      setLastName("User");
      setUsername(`newuser${Date.now()}`);
      setPassword("password123");
      setEmail("");
      setRole("STUDENT");
      setSection("S101");
      setEditing(true);
    }
  }, [mode]);

  if (mode === "view" && !uid) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1040 }}
        onClick={handleBackdropClick}
      />

      {/* Sliding Drawer */}
      <div
        className="position-fixed top-0 end-0 h-100 bg-white shadow-lg"
        style={{
          width: "400px",
          zIndex: 1050,
          overflowY: "auto",
          animation: "slideIn 0.3s ease-out",
        }}
      >
        <style>
          {`
            @keyframes slideIn {
              from {
                transform: translateX(100%);
              }
              to {
                transform: translateX(0);
              }
            }
          `}
        </style>

        <div className="p-4">
          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4 className="mb-0">
              {mode === "create" ? "Add New User" : "User Details"}
            </h4>
            <div className="d-flex align-items-center gap-2">
              {mode === "view" && !editing && (
                <FaPencil
                  onClick={startEditing}
                  style={{ cursor: "pointer", fontSize: "1.1rem" }}
                  className="text-secondary"
                />
              )}
              {editing && (
                <FaCheck
                  onClick={saveUser}
                  style={{ cursor: "pointer", fontSize: "1.2rem" }}
                  className="text-success"
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
                  onDoubleClick={startEditing}
                >
                  {user.firstName} {user.lastName}
                </div>
              </div>

              <div className="mb-3">
                <strong>Email</strong>
                <div className="mt-1" onDoubleClick={startEditing}>
                  {user.email || "N/A"}
                </div>
              </div>

              <div className="mb-3">
                <strong>Role</strong>
                <div className="mt-1" onDoubleClick={startEditing}>
                  {user.role || "N/A"}
                </div>
              </div>

              <hr />

              <div className="mb-2">
                <strong>Username:</strong>
                <span className="ms-2">{user.username}</span>
              </div>

              <div className="mb-2">
                <strong>Section:</strong>
                <span className="ms-2">{user.section || "N/A"}</span>
              </div>

              <div className="mb-3">
                <strong>Total Activity:</strong>
                <span className="ms-2">{user.totalActivity || "0"}</span>
              </div>

              <hr />

              <div className="d-flex gap-2">
                <Button
                  variant="secondary"
                  onClick={onClose}
                  className="flex-fill"
                >
                  Cancel
                </Button>
                <Button
                  variant="danger"
                  onClick={deleteUser}
                  className="flex-fill"
                >
                  Delete
                </Button>
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
                  disabled={mode === "view"}
                />
                {mode === "view" && (
                  <Form.Text className="text-muted">
                    Username cannot be changed
                  </Form.Text>
                )}
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
                {mode === "view" && (
                  <Form.Text className="text-muted">
                    Leave blank to keep current password
                  </Form.Text>
                )}
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
                  <option value="TA">Teaching Assistant</option>
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
                    if (mode === "create") {
                      onClose();
                    } else {
                      setEditing(false);
                    }
                  }}
                  className="flex-fill"
                >
                  Cancel
                </Button>
                <Button
                  variant="primary"
                  onClick={() => {
                    saveUser();
                    onClose();
                  }}
                  className="flex-fill"
                >
                  {mode === "create" ? "Create User" : "Save Changes"}
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}
