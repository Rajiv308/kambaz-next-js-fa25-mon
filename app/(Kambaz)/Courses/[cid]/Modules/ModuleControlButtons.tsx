/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { IoEllipsisVertical } from "react-icons/io5";
import { FaTrash } from "react-icons/fa";
import { FaPencil } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { BsPlus } from "react-icons/bs";
import { useSelector } from "react-redux";
import { RootState } from "@/app/(Kambaz)/store";
import { useState } from "react";

function DeleteConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Module",
  message = "Are you sure you want to delete this module? This action cannot be undone.",
}: {
  isOpen: boolean;
  onClose: (e: React.MouseEvent) => void;
  onConfirm: (e: React.MouseEvent) => void;
  title?: string;
  message?: string;
}) {
  if (!isOpen) return null;

  const stopClick = (e: React.MouseEvent) => e.stopPropagation();

  return (
    <div
      className="modal fade show d-block"
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
      onClick={onClose}
    >
      <div className="modal-dialog modal-dialog-centered" onClick={stopClick}>
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

export default function ModuleControlButtons({
  moduleId,
  deleteModule,
  editModule,
}: {
  moduleId: string;
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
}) {
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );

  const canManageUsers = ["FACULTY", "ADMIN"].includes(
    (currentUser as any)?.role
  );

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDeleteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    deleteModule(moduleId);
    setShowDeleteModal(false);
  };

  const handleCloseModal = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setShowDeleteModal(false);
  };

  return (
    <>
      <div className="float-end">
        {canManageUsers && (
          <>
            <FaPencil
              onClick={() => editModule(moduleId)}
              className="text-primary me-3"
            />
            <FaTrash
              className="text-danger me-3 mb-1"
              onClick={handleDeleteClick}
            />
          </>
        )}
        <GreenCheckmark />
        <BsPlus className="fs-4" />
        <IoEllipsisVertical className="fs-4" />
      </div>

      <DeleteConfirmationModal
        isOpen={showDeleteModal}
        onClose={handleCloseModal}
        onConfirm={handleConfirmDelete}
        title="Delete Module"
        message="Are you sure you want to delete this module? This action cannot be undone."
      />
    </>
  );
}
