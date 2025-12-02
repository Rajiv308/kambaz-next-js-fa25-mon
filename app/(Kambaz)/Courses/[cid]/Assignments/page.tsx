/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useEffect, useState } from "react";
import * as client from "../../client";
import Link from "next/link";
import AssignmentControls from "./AssignmentControls";
import TypeControlButtons from "./TypeControlButtons";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { GiStabbedNote } from "react-icons/gi";
import { MdArrowDropDown } from "react-icons/md";
import { useParams } from "next/navigation";
export default function Assignments() {
  const { cid } = useParams();
  const [assignments, setAssignments] = useState<any[]>([]);
  const [assignmentToDelete, setAssignmentToDelete] = useState<string | null>(
    null
  );

  const fetchAssignments = async () => {
    const data = await client.findAssignmentsForCourse(cid as string);
    setAssignments(data);
  };

  useEffect(() => {
    fetchAssignments();
  }, [cid]);

  const onAddAssignment = async (assignment: any) => {
    const newAssignment = await client.createAssignment(
      cid as string,
      assignment
    );
    setAssignments((prev) => [...prev, newAssignment]);
  };

  const handleDeleteClick = (id: string) => setAssignmentToDelete(id);

  const handleCloseModal = () => setAssignmentToDelete(null);

  const handleConfirmDelete = async () => {
    if (!assignmentToDelete) return;
    await client.deleteAssignment(assignmentToDelete);
    setAssignments((prev) => prev.filter((a) => a._id !== assignmentToDelete));
    setAssignmentToDelete(null);
  };

  return (
    <div id="wd-assignments">
      <AssignmentControls
        addAssignment={(assignment) => onAddAssignment(assignment)}
      />
      <br />
      <br />
      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroupItem className="wd-assignments p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary allign-items-center">
            <BsGripVertical className="me-2 fs-3" />
            <MdArrowDropDown className="me-2 fs-3" />
            Assignments
            <TypeControlButtons value={40} />
          </div>
          <ListGroup className="wd-assignments rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <ListGroupItem
                  key={assignment._id}
                  className="wd-assignment p-3 ps-1"
                  as="div"
                >
                  <Link
                    href={`/Courses/${cid}/Assignments/${assignment._id}`}
                    className="wd-assignment-link text-decoration-none text-dark fw-bold"
                  >
                    <div className="d-flex align-items-center">
                      <BsGripVertical className="me-3 fs-3 text-secondary" />
                      <GiStabbedNote className="me-4 fs-3 text-success" />

                      <div className="me-3">
                        {assignment.title}
                        <div
                          className="text-muted"
                          style={{ fontSize: "0.9rem" }}
                        >
                          <span className="text-danger">Multiple Modules</span>|
                          <b> Not Available until </b>
                          {formatISODate(assignment.availableFrom)} |
                          <br />
                          <b>Due </b> {formatISODate(assignment.dueDate)} |
                          {assignment.points} pts
                        </div>
                      </div>

                      <AssignmentControlButtons
                        aid={assignment._id}
                        onDeleteClick={handleDeleteClick}
                      />
                    </div>
                  </Link>
                </ListGroupItem>
              ))}
          </ListGroup>
        </ListGroupItem>
      </ListGroup>
      <br />
      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroupItem className="wd-assignments p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <MdArrowDropDown className="me-2 fs-3" />
            QUIZZES
            <TypeControlButtons value={10} />
          </div>
        </ListGroupItem>
      </ListGroup>
      <br />
      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroupItem className="wd-assignments p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <MdArrowDropDown className="me-2 fs-3" />
            EXAMS
            <TypeControlButtons value={20} />
          </div>
        </ListGroupItem>
      </ListGroup>
      <br />
      <ListGroup className="rounded-0" id="wd-assignments">
        <ListGroupItem className="wd-assignments p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary">
            <BsGripVertical className="me-2 fs-3" />
            <MdArrowDropDown className="me-2 fs-3" />
            PROJECTS
            <TypeControlButtons value={30} />
          </div>
        </ListGroupItem>
      </ListGroup>
      {assignmentToDelete && (
        <div
          className="modal fade show d-block"
          style={{
            backgroundColor: "rgba(0,0,0,0.5)",
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            zIndex: 1050,
          }}
          onClick={handleCloseModal}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content">
              <div className="modal-header border-0">
                <h5 className="modal-title">Delete Assignment</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                />
              </div>
              <div className="modal-body">
                <p className="text-muted mb-0">
                  Are you sure you want to remove this assignment? This action
                  cannot be undone.
                </p>
              </div>
              <div className="modal-footer border-0">
                <button
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button
                  className="btn btn-danger"
                  onClick={handleConfirmDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function formatISODate(isoDate: string) {
  const date = new Date(isoDate);
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = monthNames[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  let hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const ampm = hours >= 12 ? "PM" : "AM";

  hours = hours % 12;
  hours = hours ? hours : 12; // convert 0 to 12

  return `${month} ${day} ${year} at ${hours}:${minutes}${ampm}`;
}
