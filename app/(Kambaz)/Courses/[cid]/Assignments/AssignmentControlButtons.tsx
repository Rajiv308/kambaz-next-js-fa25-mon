/* eslint-disable @typescript-eslint/no-explicit-any */
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import { FaTrash } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { RootState } from "@/app/(Kambaz)/store";
export default function AssignmentControlButtons({
  deleteAssignment,
  aid,
}: {
  deleteAssignment: (aid: string) => void;
  aid: string;
}) {
  const handleDeleteClick = (event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();

    const confirmed = window.confirm(
      "Are you sure you want to remove this assignment?"
    );

    if (confirmed) {
      deleteAssignment(aid);
    }
  };

  const { currentUser } = useSelector(
    (state: RootState) => state.accountReducer
  );
  const isFaculty = (currentUser as any)?.role === "FACULTY";
  return (
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
  );
}
