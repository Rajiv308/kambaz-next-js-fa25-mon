/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Table, Button, Form } from "react-bootstrap";
import { FaUserCircle, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from "next/navigation";
import * as client from "../../../client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/(Kambaz)/store";

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

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1050 }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={handleModalClick}
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
            <button className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button className="btn btn-danger" onClick={onConfirm}>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function UserDrawer({
  isOpen,
  onClose,
  user,
  onSave,
  mode,
}: {
  isOpen: boolean;
  onClose: () => void;
  user: any;
  onSave: (userData: any) => void;
  mode: "create" | "edit";
}) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    role: "STUDENT",
    section: "",
  });

  useEffect(() => {
    if (mode === "edit" && user) {
      setFormData({
        username: user.username || "",
        password: "",
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        role: user.role || "STUDENT",
        section: user.section || "",
      });
    } else if (mode === "create") {
      setFormData({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        role: "STUDENT",
        section: "",
      });
    }
  }, [user, mode, isOpen]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const handleDrawerClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  if (!isOpen) return null;

  return (
    <>
      <div
        className="position-fixed top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0,0,0,0.5)", zIndex: 1040 }}
        onClick={onClose}
      />

      <div
        className="position-fixed top-0 end-0 h-100 bg-white shadow-lg"
        style={{
          width: "400px",
          zIndex: 1050,
          overflowY: "auto",
          animation: "slideIn 0.3s ease-out",
        }}
        onClick={handleDrawerClick}
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
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h4 className="mb-0">
              {mode === "create" ? "Add New User" : "Edit User"}
            </h4>
            <button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            />
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange as any}
                required
                disabled={mode === "edit"}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange as any}
                required={mode === "create"}
                placeholder={
                  mode === "edit" ? "Leave blank to keep current password" : ""
                }
              />
              {mode === "edit" && (
                <Form.Text className="text-muted">
                  Leave blank to keep current password
                </Form.Text>
              )}
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange as any}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange as any}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="STUDENT">Student</option>
                <option value="FACULTY">Faculty</option>
                <option value="TA">Teaching Assistant</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Section</Form.Label>
              <Form.Control
                type="text"
                name="section"
                value={formData.section}
                onChange={handleChange as any}
                required
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button
                variant="secondary"
                onClick={onClose}
                className="flex-fill"
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit" className="flex-fill">
                {mode === "create" ? "Create User" : "Save Changes"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}

export default function PeopleTable() {
  const { cid } = useParams();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"create" | "edit">("create");
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const isFaculty = (currentUser as any)?.role === "FACULTY";

  useEffect(() => {
    fetchUsers();
  }, [cid]);

  const fetchUsers = async () => {
    if (!cid) return;
    const courseId = Array.isArray(cid) ? cid[0] : cid;
    try {
      const courseUsers = await client.fetchUsersForCourse(courseId);
      setUsers(courseUsers);
    } catch (err) {
      console.error("Failed to fetch users for course:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = () => {
    setDrawerMode("create");
    setSelectedUser(null);
    setDrawerOpen(true);
  };

  const handleEditUser = (user: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setDrawerMode("edit");
    setSelectedUser(user);
    setDrawerOpen(true);
  };

  const handleDeleteClick = (user: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    try {
      await client.deleteUser(userToDelete._id);
      await client.unenrollFromCourse(userToDelete._id, cid as string);
      setUsers(users.filter((u) => u._id !== userToDelete._id));
      setDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  const handleSaveUser = async (userData: any) => {
    try {
      if (drawerMode === "create") {
        const newUser = await client.createUser(userData);
        await client.enrollInCourse(newUser._id, cid as string);
        setUsers([...users, newUser]);
      } else {
        const updates = { ...userData };
        if (!updates.password) {
          delete updates.password;
        }
        const updatedUser = await client.updateUser(selectedUser._id, updates);
        setUsers(
          users.map((u) => (u._id === selectedUser._id ? updatedUser : u))
        );
        if (currentUser && selectedUser._id === (currentUser as any)._id) {
          window.location.reload();
        }
      }
      setDrawerOpen(false);
      setSelectedUser(null);
    } catch (err) {
      console.error("Failed to save user:", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="wd-people-table">
      {isFaculty && (
        <div className="mb-3 d-flex justify-content-end">
          <Button variant="danger" onClick={handleAddUser}>
            <FaPlus className="me-2" />
            Add User
          </Button>
        </div>
      )}

      <Table striped hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
            {isFaculty && <th className="text-center">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user.firstName}</span>{" "}
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id">{user.username}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity || "N/A"}</td>
              <td className="wd-total-activity">{user.totalActivity || "0"}</td>
              {isFaculty && (
                <td className="text-center">
                  <div className="d-flex gap-2 justify-content-center">
                    <FaEdit
                      className="text-primary"
                      style={{ cursor: "pointer", fontSize: "1.2rem" }}
                      onClick={(e) => handleEditUser(user, e)}
                      title="Edit user"
                    />
                    <FaTrash
                      className="text-danger"
                      style={{ cursor: "pointer", fontSize: "1.2rem" }}
                      onClick={(e) => handleDeleteClick(user, e)}
                      title="Delete user"
                    />
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>

      <UserDrawer
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        user={selectedUser}
        onSave={handleSaveUser}
        mode={drawerMode}
      />

      <DeleteConfirmationModal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleConfirmDelete}
        userName={
          userToDelete
            ? `${userToDelete.firstName} ${userToDelete.lastName}`
            : ""
        }
      />
    </div>
  );
}
