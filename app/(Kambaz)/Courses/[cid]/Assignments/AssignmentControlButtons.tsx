/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "@/app/(Kambaz)/store";
import { useState } from "react";

function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Assignment",
  message = "Are you sure you want to remove this assignment? This action cannot be undone.",
}: {
  isOpen: boolean;
  onClose: (e: React.MouseEvent) => void;
  onConfirm: (e: React.MouseEvent) => void;
  title?: string;
  message?: string;
}) {
  if (!isOpen) return null;

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div
        className="modal-dialog modal-dialog-centered"
        onClick={handleModalClick}
      >
        <div className="modal-content">
          <div className="modal-header border-0">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose} />
          </div>
          <div className="modal-body">
            <p className="text-muted mb-0">{message}</p>
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

export default function AssignmentControlButtons({
  deleteAssignment,
  aid,
}: {
  deleteAssignment: (aid: string) => void;
  aid: string;
}) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleDeleteClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    deleteAssignment(aid);
    setShowDeleteModal(false);
  };

  const handleCloseModal = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    setShowDeleteModal(false);
  };

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const isFaculty = (currentUser as any)?.role === "FACULTY";
  return (
    <>
      <div className="ms-auto d-flex">
        {isFaculty && (
          <FaTrash
            className="text-danger me-3 mb-1"
            onClick={handleDeleteClick}
          />
        )}
        <GreenCheckmark />
        <IoEllipsisVertical className="fs-4" />
      </div>
      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
      />
    </>
  );
}
