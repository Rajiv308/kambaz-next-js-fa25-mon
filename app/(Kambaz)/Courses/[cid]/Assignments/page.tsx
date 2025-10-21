/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import AssignmentControls from "./AssignmentControls";
import TypeControlButtons from "./TypeControlButtons";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { GiStabbedNote } from "react-icons/gi";
import { MdArrowDropDown } from "react-icons/md";
import * as db from "../../../Database";
export default async function Assignments({
  params,
}: Readonly<{ params: Promise<{ cid: string }> }>) {
  const { cid } = await params;
  const assignments = db.assignments;
  return (
    <div id="wd-assignments">
      <AssignmentControls />
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

                      <AssignmentControlButtons />
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
