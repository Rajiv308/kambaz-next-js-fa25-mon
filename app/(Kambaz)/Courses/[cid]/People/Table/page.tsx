/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Table, Button, Form } from "react-bootstrap";
import { FaUserCircle, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { useParams } from "next/navigation";
import * as client from "../../../client";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/app/(Kambaz)/store";
import PeopleDetails from "../Details";
import Link from "next/link";

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

export default function PeopleTable({
  users = [],
  fetchUsers,
}: {
  users?: any[];
  fetchUsers: () => void;
}) {
  const params = useParams();
  const getCourseId = () => {
    if (!params.cid) return null;
    return Array.isArray(params.cid) ? params.cid[0] : params.cid;
  };

  const [showDetails, setShowDetails] = useState(false);
  const [showUserId, setShowUserId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [drawerMode, setDrawerMode] = useState<"create" | "edit" | "view">(
    "view"
  );
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<any>(null);

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const canManageUsers = ["FACULTY", "ADMIN"].includes(
    (currentUser as any)?.role
  );

  useEffect(() => {
    fetchUsers();
  }, [showDetails, userToDelete]);

  const handleDeleteClick = (user: any, e: React.MouseEvent) => {
    e.stopPropagation();
    setUserToDelete(user);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    try {
      if (!getCourseId()) {
        await client.unenrollUserFromAllCourses(userToDelete._id);
        await client.deleteUser(userToDelete._id);
      } else {
        await client.unenrollFromCourse(
          userToDelete._id,
          getCourseId() as string
        );
      }
      setDeleteModalOpen(false);
      setUserToDelete(null);
    } catch (err) {
      console.error("Failed to delete user:", err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div id="wd-people-table">
      {showDetails && (
        <PeopleDetails
          mode={drawerMode}
          uid={showUserId}
          onClose={() => {
            setShowDetails(false);
            fetchUsers();
            setDrawerMode("view");
          }}
          onUserCreated={(newUser) => {
            fetchUsers();
          }}
        />
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
            {canManageUsers && <th className="text-center">Actions</th>}
          </tr>
        </thead>
        <tbody>
          {users.map((user: any) => (
            <tr key={user._id}>
              <td className="wd-full-name text-nowrap">
                <span
                  className="text-decoration-none"
                  onClick={() => {
                    setShowDetails(true);
                    setShowUserId(user._id);
                  }}
                >
                  <FaUserCircle className="me-2 fs-1 text-secondary" />
                  <span className="wd-first-name">{user.firstName}</span>{" "}
                  <span className="wd-last-name">{user.lastName}</span>
                </span>
              </td>
              <td className="wd-login-id">{user.username}</td>
              <td className="wd-section">{user.section}</td>
              <td className="wd-role">{user.role}</td>
              <td className="wd-last-activity">{user.lastActivity || "N/A"}</td>
              <td className="wd-total-activity">{user.totalActivity || "0"}</td>
              {canManageUsers && (
                <td className="text-center">
                  <div className="d-flex gap-2 justify-content-center">
                    <FaEdit
                      className="text-primary"
                      style={{ cursor: "pointer", fontSize: "1.2rem" }}
                      onClick={() => {
                        setShowDetails(true);
                        setDrawerMode("edit");
                        setShowUserId(user._id);
                      }}
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
