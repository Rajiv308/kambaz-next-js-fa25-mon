/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "@/app/(Kambaz)/store";

type AssignmentControlProps = {
  aid: string;
  onDeleteClick: (aid: string) => void; // parent handles modal
};

export default function AssignmentControlButtons({
  aid,
  onDeleteClick,
}: AssignmentControlProps) {
  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const canManageUsers = ["FACULTY", "ADMIN"].includes(
    (currentUser as any)?.role
  );

  return (
    <div className="ms-auto d-flex">
      {canManageUsers && (
        <FaTrash
          className="text-danger me-3 mb-1"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation(); // prevent Link navigation
            onDeleteClick(aid); // signal parent
          }}
          style={{ cursor: "pointer" }}
        />
      )}
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
